import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { sql } from "lib/db";
import { verifyPassword } from "lib/auth-utils";

/**
 * Next.js loads auth during `next build` ("Collecting page data") before runtime env
 * is guaranteed. Use a throwaway secret only for that phase; production/runtime must
 * set AUTH_SECRET (e.g. Vercel → Environment Variables).
 */
function getAuthSecret(): string {
  const fromEnv = process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim();
  if (fromEnv) return fromEnv;

  const isProductionBuild =
    process.env.NEXT_PHASE === "phase-production-build";

  if (isProductionBuild) {
    return "build-time-placeholder-not-used-at-runtime-min-32-chars";
  }

  throw new Error(
    "Missing AUTH_SECRET. Add to .env.local: AUTH_SECRET=$(openssl rand -base64 32)"
  );
}

const secret = getAuthSecret();

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        const email = String(credentials.email);
        const password = String(credentials.password);

        const { rows } = await sql`
          SELECT id, email, password_hash, role, super_admin_type, managed_subteams
          FROM admins
          WHERE email = ${email}
          LIMIT 1
        `;

        const admin = rows[0] as
          | { id: string; email: string; password_hash: string; role: string; super_admin_type: string | null; managed_subteams: string[] | null }
          | undefined;

        if (!admin || !(await verifyPassword(password, admin.password_hash))) {
          return null;
        }

        return {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          super_admin_type: admin.super_admin_type,
          managed_subteams:
            admin.role === "super_admin" ? null : (admin.managed_subteams ?? null),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as { role?: string }).role;
        token.super_admin_type = (user as { super_admin_type?: string | null }).super_admin_type;
        token.managed_subteams = (user as { managed_subteams?: string[] | null }).managed_subteams ?? null;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        const currentId = token.id as string | undefined;
        if (currentId) {
          const { rows } = await sql`
            SELECT role, super_admin_type, managed_subteams
            FROM admins
            WHERE id = ${currentId}
            LIMIT 1
          `;
          const current = rows[0] as
            | { role: string; super_admin_type: string | null; managed_subteams: string[] | null }
            | undefined;
          if (current) {
            session.user.role = current.role;
            session.user.super_admin_type = current.super_admin_type;
            session.user.managed_subteams =
              current.role === "super_admin" ? null : (current.managed_subteams ?? null);
            return session;
          }
        }
        session.user.role = token.role as string;
        session.user.super_admin_type = token.super_admin_type as string | null;
        session.user.managed_subteams = (token.managed_subteams as string[] | null) ?? null;
      }
      return session;
    },
  },
});
