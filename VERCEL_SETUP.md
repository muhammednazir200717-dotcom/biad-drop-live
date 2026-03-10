# Vercel Setup & Configuration Guide

This guide covers setting up your BIAD Drop project on Vercel with all necessary environment variables and configurations.

## Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose your sign-up method (GitHub recommended)
4. Follow the verification steps

## Step 2: Connect Your Repository

### Option A: Import from GitHub (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select "Import Git Repository"
4. Paste your repository URL: `https://github.com/muhammednazir200717-dotcom/biad-drop-live`
5. Click "Continue"
6. Vercel auto-detects Vite and configures the build

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from your project directory
cd biad-drop-live
vercel

# Follow the prompts to link your project
```

## Step 3: Configure Build Settings

Vercel should auto-detect these settings:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Dev Command**: `npm run dev`

If not, manually configure:
1. Go to Project Settings → General
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`

## Step 4: Add Environment Variables

This is **critical** for your app to work. Without these, Supabase connections will fail.

### Method 1: During Initial Deployment

When you first deploy, Vercel will ask for environment variables. Add:

1. **VITE_SUPABASE_URL**
   - Value: `https://your-project-id.supabase.co`
   - Example: `https://urimxforcugdinjbxqqi.supabase.co`

2. **VITE_SUPABASE_PUBLISHABLE_KEY**
   - Value: Your Supabase anon key (found in Supabase dashboard)
   - Example: `eyJhbGc...` (long JWT-like string)

3. **VITE_SUPABASE_PROJECT_ID**
   - Value: Your Supabase project ID
   - Example: `urimxforcugdinjbxqqi`

### Method 2: Add Later in Dashboard

1. Go to your Vercel Dashboard
2. Click on your project: **biad-drop**
3. Go to Settings tab → Environment Variables
4. Add each variable:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: (paste your Supabase URL)
   - **Environments**: Production, Preview, Development
   - Click "Add"
5. Repeat for the other two variables

### Where to Get Supabase Credentials

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your BIAD project
3. Go to Settings → API (left sidebar)
4. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon public key** → `VITE_SUPABASE_PUBLISHABLE_KEY`
   - **Project ID** → `VITE_SUPABASE_PROJECT_ID` (visible in URL bar)

## Step 5: Configure Domains (Optional)

### Connect a Custom Domain

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain: `yourdomain.com`
4. Follow DNS configuration steps
5. Vercel provides DNS records to add to your registrar

### Example Domain Setup
- If you want `biad.com` to use your Vercel app:
  1. Point your domain's DNS to Vercel's nameservers, OR
  2. Add a CNAME record pointing to `cname.vercel.app`

## Step 6: Configure Git Integration

### Auto-Deploy on Push

By default, Vercel auto-deploys when you push to your main branch.

1. Go to Project Settings → Git
2. Verify your repository is connected
3. Production Branch: `main`
4. Framework: Auto-detected (Vite)

### Preview Deployments for Pull Requests

Vercel automatically creates preview deployments for every PR:
1. Create a pull request on GitHub
2. Vercel creates a preview URL (shown in PR)
3. Review changes before merging
4. Merge PR to deploy to production

## Step 7: Configure Build & Development Settings

### Advanced Build Settings

1. Go to Project Settings → Build & Development Settings
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Install Command**: `npm install` (or your preferred package manager)

### Node.js Version (Optional)

1. Go to Project Settings → Functions
2. Select Node.js version (18+ recommended)
3. Leave as default unless you have specific needs

## Step 8: Enable Monitoring & Analytics

### Vercel Analytics

1. Go to Project Settings → Analytics
2. Click "Enable Web Analytics"
3. This tracks Core Web Vitals for your site

### Error Tracking (Optional)

Vercel automatically tracks deployment errors. To add runtime error tracking:
1. Use Sentry (recommended): https://sentry.io
2. Follow Sentry + Vercel integration docs

## Step 9: Test Your Deployment

### First Deployment
After completing above steps:
1. Push changes to GitHub: `git push origin main`
2. Go to Vercel Dashboard
3. Wait for deployment (usually 2-5 minutes)
4. Click the preview URL when deployment completes

### Test the Live Site
- [ ] Page loads without errors
- [ ] Products display correctly
- [ ] Images load properly
- [ ] Cart functionality works
- [ ] Admin panel accessible at `/admin`
- [ ] Check browser console for errors (F12 → Console)

### Check Deployment Logs
1. Go to Deployments tab
2. Click the completed deployment
3. View "Function Logs" and "Build Logs"
4. Look for any errors or warnings

## Step 10: Configure Redirect & Rewrites (if needed)

For client-side routing to work, Vercel needs to serve `index.html` for all routes.

In `vercel.json`, this is already configured:
```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

This ensures:
- Routes like `/admin` work correctly
- Assets are cached efficiently
- URLs don't have trailing slashes

## Security Best Practices

### 1. Protect Sensitive Variables

Never commit `.env` with real values:
```bash
# .gitignore should include:
.env
.env.local
.env.*.local
```

### 2. Rotate Keys Regularly

Every 3 months:
1. Go to Supabase → Settings → API
2. Click regenerate on anon key
3. Update in Vercel environment variables
4. Redeploy

### 3. Use Different Keys for Different Environments

For production vs staging:
- Create separate Supabase projects
- Use different Vercel environments
- This prevents accidental data loss

### 4. Monitor Environment Variable Access

In Vercel Dashboard:
1. Go to Settings → Security
2. Review who has access to environment variables
3. Set up team members with appropriate permissions

## Troubleshooting

### Deployment Fails with Build Error

**Error**: `ENOENT: no such file or directory`
- **Cause**: Missing dependencies
- **Fix**: Ensure all packages in `package.json` are correct
- **Solution**: Run `npm run build` locally to test

### App Shows Blank Page

**Error**: Page loads but no content appears
- **Cause**: Supabase connection failed
- **Fix**: Check environment variables are set correctly
- **Debug**: Open browser DevTools → Console tab

### Environment Variables Not Loaded

**Error**: `VITE_SUPABASE_URL is undefined`
- **Cause**: Variables not set or wrong format
- **Fix**: Ensure variables start with `VITE_` prefix
- **Solution**: Go to Settings → Environment Variables and verify all three are set
- **Redeploy**: Click a deployment and "Redeploy" to use new variables

### Images Not Loading

**Error**: Product images show broken icon
- **Cause**: Incorrect image paths or missing files
- **Fix**: Check `/public/assets/products/` folder
- **Solution**: Verify image filenames match exactly (case-sensitive)

### Admin Panel Not Accessible

**Error**: `/admin` shows 404
- **Cause**: Routing issue
- **Fix**: Ensure React Router is handling client-side routes
- **Status**: Already configured in `vercel.json` with `cleanUrls: true`

## Performance Monitoring

### View Analytics
1. Go to your Vercel project
2. Click "Analytics" tab
3. Monitor these metrics:
   - **LCP** (Largest Contentful Paint): Target < 2.5s
   - **FID** (First Input Delay): Target < 100ms
   - **CLS** (Cumulative Layout Shift): Target < 0.1

### View Deployment Activity
1. Go to "Deployments" tab
2. See deployment history and status
3. Click individual deployments to view logs

## Next Steps

1. **Deploy**: Push to GitHub or click Deploy button
2. **Monitor**: Watch the Deployments tab
3. **Test**: Click the preview URL to test live
4. **Monitor Performance**: Check Analytics weekly
5. **Configure Domain**: Add custom domain if desired

## Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Settings**: https://vercel.com/dashboard/[project-name]/settings
- **Supabase Console**: https://app.supabase.com
- **Vercel Docs**: https://vercel.com/docs
- **Environment Variables**: https://vercel.com/docs/concepts/projects/environment-variables

## Support

If you encounter issues:
1. Check deployment logs in Vercel Dashboard
2. Review environment variables (Settings → Environment Variables)
3. Run `npm run build` locally to test builds
4. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting
5. Visit [Vercel Support](https://vercel.com/support)
