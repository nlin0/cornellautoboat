import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      super_admin_type: string | null;
      managed_subteams: string[] | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    super_admin_type?: string | null;
    managed_subteams?: string[] | null;
  }
}
