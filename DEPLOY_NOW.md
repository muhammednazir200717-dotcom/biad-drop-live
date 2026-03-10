# Deploy BIAD Drop to Vercel - Quick Start Guide

Get your app live on Vercel in 5 minutes!

## Prerequisites

✓ You should already have:
- GitHub repository set up
- Supabase project with database configured
- Supabase credentials (URL, anon key, project ID)

## 5-Minute Quick Deploy

### Step 1: Prepare Your Code (1 min)

Verify everything is ready:
```bash
# In your project directory
npm run build       # Should complete without errors
npm run preview     # Should load the app at http://localhost:4173
```

If both pass, continue to Step 2.

### Step 2: Push to GitHub (1 min)

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 3: Create Vercel Project (2 min)

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click "Import Git Repository"
3. Paste your GitHub URL: `https://github.com/muhammednazir200717-dotcom/biad-drop-live`
4. Click "Continue"
5. Vercel auto-detects Vite - click "Deploy"

**Vercel is now building your project...**

### Step 4: Add Environment Variables (1 min)

While it's building, go to **Project Settings → Environment Variables**:

Add three variables:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://your-project-id.supabase.co` (from Supabase dashboard)
- Environments: Production, Preview, Development
- Click "Add"

**Variable 2:**
- Name: `VITE_SUPABASE_PUBLISHABLE_KEY`
- Value: Your anon key (from Supabase → Settings → API)
- Environments: Production, Preview, Development
- Click "Add"

**Variable 3:**
- Name: `VITE_SUPABASE_PROJECT_ID`
- Value: Your project ID (from Supabase dashboard)
- Environments: Production, Preview, Development
- Click "Add"

### Step 5: Redeploy and Launch (1 min)

1. Go to **Deployments** tab
2. Click the deployment that just completed
3. Click **"Redeploy"** button (to use new environment variables)
4. Wait for "Ready" status
5. Click the **live URL** to open your site

## Your Site is Live!

You now have a live BIAD Drop site at: `https://biad-drop.vercel.app` (or custom domain)

---

## Testing Your Live Site

Open your Vercel URL and check:

- [ ] Page loads without errors
- [ ] Products display with images
- [ ] Add to cart works
- [ ] Admin page accessible at `/admin`
- [ ] No red errors in DevTools console (F12 → Console)

## Common Issues & Fixes

### Issue: Blank Page or "Cannot read properties"

**Cause**: Missing environment variables
**Fix**:
1. Go to Vercel Settings → Environment Variables
2. Verify all three Supabase variables are set
3. Go to Deployments → Click deployment → "Redeploy"

### Issue: Products Don't Load

**Cause**: Supabase connection failed
**Fix**:
1. Verify Supabase credentials in environment variables
2. Check your Supabase project is running
3. Confirm database tables exist

### Issue: Images Don't Show

**Cause**: Image paths incorrect
**Fix**:
1. Check images are in `/public/assets/products/`
2. Filenames are case-sensitive
3. Verify image format (JPG, PNG)

### Issue: Build Failed

**Cause**: Various build errors
**Fix**:
1. Check Vercel build logs (Deployments → Click failed build)
2. Run `npm run build` locally to test
3. Fix errors locally before pushing again

---

## Next Steps

### Connect a Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain (e.g., `biad.com`)
4. Follow DNS setup instructions
5. Propagation takes 5-48 hours

### Monitor Performance

1. Go to **Analytics** tab
2. Watch Core Web Vitals (Largest Contentful Paint, etc.)
3. Check weekly for trends

### Setup GitHub Auto-Deploy

Already enabled! Just push to `main` branch:
```bash
git push origin main
# Vercel automatically deploys
```

### Add Team Members

1. Go to Project Settings → Team
2. Click "Add Member"
3. Enter their Vercel email
4. Set permissions

---

## Deployment Troubleshooting Reference

| Problem | Likely Cause | Quick Fix |
|---------|-------------|-----------|
| Blank page | Missing env vars | Add in Settings → Environment Variables |
| Products missing | Database not connected | Check Supabase credentials |
| Images broken | Wrong image paths | Verify `/public/assets/products/` |
| Admin 404 error | Routing not configured | Already configured, try redeploying |
| Build fails | Missing dependencies | Run `npm run build` locally to test |
| Performance issues | Large bundle | Check bundle size in build logs |

---

## Deployment Architecture

```
Your GitHub Repository
         ↓
    (you push)
         ↓
    GitHub Webhook
         ↓
    Vercel Build Server
         ↓
    npm install & npm run build
         ↓
    Generate dist/ folder
         ↓
    Deploy to Vercel Edge Network
         ↓
    Your Live Site at vercel.app URL
```

---

## What Happens Next?

### Automatic
- ✅ Every push to `main` auto-deploys
- ✅ Pull requests get preview URLs
- ✅ Rollback to previous version anytime
- ✅ Global CDN caching
- ✅ SSL/HTTPS certificate (free)
- ✅ HTTP/2 and compression enabled

### Manual
- You can manually redeploy from Dashboard
- Update environment variables anytime
- Connect custom domain whenever ready
- Monitor performance in Analytics tab

---

## Keep Vercel Updated

### Auto-Deployments are Enabled

Every time you push:
```bash
git push origin main
```

Vercel automatically:
1. Fetches latest code
2. Runs `npm install`
3. Runs `npm run build`
4. Deploys to live site
5. Keeps old version as rollback

### Zero Downtime

While deploying:
- Old version stays live
- New version builds in background
- Once ready, instantly switches over
- If anything fails, stays on old version

---

## Useful Commands

### Local Development
```bash
npm run dev          # Start dev server (http://localhost:8080)
npm run build        # Test production build
npm run preview      # Preview production build
```

### Git
```bash
git push origin main # Triggers auto-deploy
git log              # View commit history
git status           # Check what changed
```

### Vercel CLI (Optional)
```bash
npm install -g vercel  # Install CLI
vercel login           # Login to Vercel
vercel                 # Deploy from CLI
vercel logs            # View logs
```

---

## Support & Documentation

- **Live Site**: https://biad-drop.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentation**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
- **Checklist**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for pre/post deployment checks
- **Setup Details**: See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for detailed setup instructions

---

## Success Indicators

You'll know it worked when:

✅ **Deployment successful**
- Vercel shows "Ready" status
- Live URL opens without errors

✅ **Site works correctly**
- Products load and display
- Images visible
- Cart functional
- Admin panel accessible

✅ **No errors**
- Browser console clean (no red errors)
- DevTools Network tab shows successful requests
- No 404 or 500 errors

✅ **Performance good**
- Page loads in < 3 seconds
- No lag or slowness
- Analytics show healthy metrics

---

## You're Done!

Your BIAD Drop e-commerce site is now live, globally distributed, and ready for customers.

**Deployment Time**: ~5-10 minutes
**Future Updates**: Just push to GitHub, Vercel handles the rest

---

**Last Updated**: March 10, 2026
**Status**: Ready to Deploy
**Estimated Time**: 5 minutes
