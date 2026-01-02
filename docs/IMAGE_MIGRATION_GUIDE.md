# Image Storage Migration Guide: Vercel Blob Storage

## Recommendation: Use Vercel Blob Storage

**Why Vercel Blob Storage?**
- ✅ Native Vercel integration (same platform, no extra service)
- ✅ Built-in global CDN (fast delivery worldwide)
- ✅ Removes images from deployment bundle (solves 250MB limit)
- ✅ Scales automatically
- ✅ Simple API for future engineers
- ✅ Free tier: 1GB storage, 100GB bandwidth/month (Pro plan)
- ✅ Works seamlessly with Next.js Image component

**Why NOT GitHub LFS?**
- ❌ Still stores files in git (doesn't solve deployment size)
- ❌ Requires LFS setup for all developers
- ❌ Not optimized for web delivery (no CDN)
- ❌ Adds complexity without performance benefits

---

## Implementation Steps

### 1. Install Vercel Blob SDK

```bash
npm install @vercel/blob
```

### 2. Set up Vercel Blob Storage

1. Go to your Vercel Dashboard → Your Project → Storage
2. Create a new Blob Store (or use default)
3. Get your Blob Store token from Settings → Tokens

### 3. Configure Environment Variables

Add to Vercel Dashboard → Settings → Environment Variables:
- `BLOB_READ_WRITE_TOKEN` (from Vercel Blob Store settings)

For local development, create `.env.local`:
```
BLOB_READ_WRITE_TOKEN=your_token_here
```

### 4. Upload Script (One-time Migration)

Create `scripts/upload-images-to-blob.js` to migrate existing images.

### 5. Update Code to Use Blob URLs

Instead of `/team/teamPhotos/name.webp`, use Blob URLs like:
`https://[your-blob-url].public.blob.vercel-storage.com/team/name.webp`

### 6. Update Next.js Image Config

Add blob domain to `next.config.ts` remotePatterns.

---

## Migration Strategy

### Option A: Gradual Migration (Recommended)
1. Upload new images to Blob Storage
2. Keep existing images in `public/` temporarily
3. Migrate old images gradually
4. Remove `public/` images once all migrated

### Option B: Full Migration (Cleaner)
1. Upload all images to Blob Storage
2. Update all image paths at once
3. Remove images from `public/` folder
4. Commit changes

---

## Benefits for Future Engineers

1. **Simple Setup**: Just install package and set env var
2. **No Git Issues**: Images aren't in repository
3. **Fast Development**: No need to download 240MB of images
4. **Easy Updates**: Upload images via Vercel dashboard or API
5. **Better Performance**: CDN caching, automatic optimization
6. **Clear Separation**: Code vs. assets

---

## Cost Considerations

**Vercel Blob Storage Pricing** (as of 2024):
- Free (Hobby): Not available
- Pro: $0.15/GB/month storage, $0.40/GB bandwidth
- For 240MB: ~$0.036/month storage + bandwidth costs

**Current State**: 
- 240MB in `public/` folder
- Already using Vercel's CDN (free)
- But causing deployment bundle size issues

---

## Next Steps

1. Review this guide with your team
2. Set up Vercel Blob Storage in dashboard
3. Run migration script to upload images
4. Update code to use Blob URLs
5. Test thoroughly
6. Remove images from `public/` folder
7. Update documentation

