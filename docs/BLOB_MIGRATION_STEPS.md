# Vercel Blob Storage Migration - Step by Step

## ✅ Step 1: Setup (Already Done!)
- [x] Created Blob Store in Vercel Dashboard
- [x] Installed `@vercel/blob` package
- [x] Blob Storage connected to your project

## 📋 Step 2: Get Environment Variables

You need the `BLOB_READ_WRITE_TOKEN` in your local environment. Choose one method:

### Option A: Using Vercel CLI (Recommended - No Global Install Needed)
```bash
# Use npx (no global install required)
npx vercel link
npx vercel env pull
```

This creates/updates `.env.local` with your token.

**Note**: `npx` runs the latest version without installing globally, avoiding permission issues.

### Option B: Manual Setup
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Copy the `BLOB_READ_WRITE_TOKEN` value
3. Create `.env.local` file in project root:
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx...
   ```

## 🚀 Step 3: Upload Images

Run the migration script:
```bash
node scripts/upload-images-to-blob.js
```

This will:
- Scan all images in `public/` folder
- Upload them to Vercel Blob Storage (preserving folder structure)
- Create `blob-url-mapping.json` with local path → blob URL mappings
- Show progress and results

**Expected time**: 5-10 minutes for 240MB of images

## 📝 Step 4: Update Code to Use Blob URLs

After uploading, you'll need to update your code. The mapping file shows:
- **Old path**: `/team/teamPhotos/john.webp`
- **New URL**: `https://xxx.public.blob.vercel-storage.com/team/teamPhotos/john.webp`

### Update Strategy

1. **Team Photos** (CSV files): Update `src/app/team/data/*.csv` files
2. **Technical Images**: Update `src/app/technical/**/*.tsx` files  
3. **Media Albums**: Update image paths in your code
4. **Other Images**: Update paths as needed

### Example Update

**Before:**
```typescript
const imagePath = '/team/teamPhotos/john.webp';
```

**After:**
```typescript
const imagePath = 'https://xxx.public.blob.vercel-storage.com/team/teamPhotos/john.webp';
```

Or use the mapping file to create a helper function (see `lib/blob-image.ts`).

## ✅ Step 5: Test Locally

```bash
npm run dev
```

Visit pages with images and verify they load correctly.

## 🧹 Step 6: Clean Up (After Testing)

Once everything works:

1. **Remove images from `public/` folder** (keep the folder structure)
2. **Update `.gitignore`** (optional - to ignore public/images)
3. **Commit changes**

## 📊 Monitoring

Check your Blob Storage usage in:
- Vercel Dashboard → Storage → Your Blob Store
- Monitor storage and bandwidth usage

## ⚠️ Important Notes

1. **Server Upload Limit**: 4.5MB per file (should be fine for images)
2. **Backup**: Consider backing up `public/` folder before deletion
3. **Gradual Migration**: You can migrate gradually and keep both paths working
4. **Environment Variables**: Ensure `BLOB_READ_WRITE_TOKEN` is set in Vercel dashboard for all environments (Production, Preview, Development)

## 🆘 Troubleshooting

**"BLOB_READ_WRITE_TOKEN not found"**
- Make sure you ran `npx vercel env pull` or set it in `.env.local`
- Check Vercel Dashboard → Settings → Environment Variables

**Permission errors with npm install -g**
- Use `npx vercel` instead (no global install needed)

**Upload fails**
- Check file size (must be < 4.5MB for server uploads)
- Check network connection
- Verify token is correct

**Images don't load**
- Check blob URLs are correct
- Verify `access: 'public'` was used
- Check browser console for errors

## 📚 Resources

- [Vercel Blob Docs](https://vercel.com/docs/storage/vercel-blob)
- Migration script: `scripts/upload-images-to-blob.js`
- Helper utilities: `lib/blob-image.ts`
