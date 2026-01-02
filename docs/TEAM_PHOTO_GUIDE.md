# Team Photo Upload Guide

`process-team-photos.js` script does the following:

1. Converts JPG images to WebP format
2. Uploads images to Vercel Blob Storage (CDN)
3. Updates CSV files with the correct image paths
4. No code changes needed!

## Step 1: Prepare Images

1. **Name image correctly**: `firstname_lastname.jpg`
   - Example: `john_doe.jpg` or `mary_jane_smith.jpg`
   - Use underscores (`_`) not spaces or hyphens
   - Must be `.jpg` or `.jpeg` format
2. **Place it in the staging folder**:

   ```bash
   public/team/teamPhotos/staging/firstname_lastname.jpg
   ```

## Step 2: Run Script

Option 1: Using npm script (recommended):

```bash
npm run process-team-photos
```

Option 2: Direct node command:

```bash
node scripts/process-team-photos.js
```

The script will then

- Convert your JPG to WebP (optimized format)
- Upload to blob storage
- Update the CSV files automatically

## Step 3: Review and Commit

1. **Check the output** - The script will show you what was updated
2. **Review CSV files** - Make sure the member's information is correct
3. **Remove processed images** from staging folder (optional, for cleanup)
4. **Commit changes**:

   ```bash
   git add src/app/team/data/*.csv
   git commit -m "Update team photos"
   ```

### Prerequisites

Make sure you have:

- `BLOB_READ_WRITE_TOKEN` in `.env.local` (or environment variables)
- Ask team member if you do not have the token

### What the Script Does

1. **Finds images** in `public/team/teamPhotos/staging/`
2. **Converts to WebP**:
   - Optimizes quality (85%)
   - Resizes to max 800x800px (maintains aspect ratio)
3. **Uploads to Blob Storage**:
   - URL format: `https://<PUBLIC_BLOB_URL_HERE>.public.blob.vercel-storage.com/team/teamPhotos/firstname_lastname.webp`
4. **Updates CSV files**:
   - Searches all CSV files for matching name
   - Updates the `image` column with: `/team/teamPhotos/firstname_lastname.webp`
   - CSV files: `team_leads.csv`, `hardware.csv`, `software.csv`, `business.csv`

## Troubleshooting

### Error: "BLOB_READ_WRITE_TOKEN environment variable is required"

**Solution**: Set up your blob token:

You may need to ask for the token first

```bash
# set manually in .env.local
echo "BLOB_READ_WRITE_TOKEN=your_token_here" >> .env.local
```

### Warning: "Member not found in any CSV file"

**What it means**: The script couldn't find a matching name in the CSV files.

**Solutions**:

1. **Check the name format**:
   - Image: `john_doe.jpg` → Looks for "John Doe" in CSV
   - Make sure the name in CSV matches exactly (case-insensitive)

2. **Add member to CSV first**:
   - Open the appropriate CSV file: `src/app/team/data/[team_leads|hardware|software|business].csv`
   - Add a row with the member's information (name, role, etc.)
   - Leave the `image` column empty or as placeholder
   - Run the script again

3. **Verify naming**:
   - CSV has: `John Doe` → Image should be: `john_doe.jpg`
   - CSV has: `Mary Jane Smith` → Image should be: `mary_jane_smith.jpg`

## 📁 File Structure

```bash
cornellautoboat/
├── public/
│   └── team/
│       └── teamPhotos/
│           └── staging/          ← Place images here
│               └── firstname_lastname.jpg
├── src/
│   └── app/
│       └── team/
│           └── data/
│               ├── team_leads.csv    ← Automatically updated
│               ├── hardware.csv      ← Automatically updated
│               ├── software.csv      ← Automatically updated
│               └── business.csv      ← Automatically updated
└── scripts/
    └── process-team-photos.js    ← Run this script
```

## 🔍 Verifying Results

After running the script, you can verify:

1. **Check blob storage URL**:
   - The script outputs the blob URL
   - Visit it in browser to see the uploaded image

2. **Check CSV file**:
   - Open the relevant CSV file
   - Find the member's row
   - Verify `image` column shows: `/team/teamPhotos/firstname_lastname.webp`

3. **Test locally**:

   ```bash
   npm run dev
   ```

   - Visit `/team` page
   - Check if the member's photo appears correctly

## Other

- **Batch processing**: You can place multiple images in staging and process them all at once
- **Updates**: To update an existing photo, just place a new image with the same name and run the script
- **Backup**: The original JPG files stay in staging folder until you delete them
- **Quality**: Images are automatically optimized (WebP, 85% quality, max 800px)