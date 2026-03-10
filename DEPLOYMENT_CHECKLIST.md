# BIAD Drop - Deployment Checklist

Quick reference checklist for deploying to Vercel.

## Pre-Deployment (Do This First)

### Code Quality
- [ ] Run `npm run lint` - Fix any linting errors
- [ ] Run `npm run test` - All tests pass
- [ ] Run `npm run build` locally - Build completes without errors
- [ ] Run `npm run preview` - Preview build works locally
- [ ] Check browser console - No JavaScript errors (F12 → Console)

### Git Repository
- [ ] All changes committed: `git status` shows clean
- [ ] Code pushed to GitHub: `git push origin main`
- [ ] No merge conflicts
- [ ] Main branch is latest

### Environment Setup
- [ ] `.env` file has Supabase credentials
  - [ ] `VITE_SUPABASE_URL` is set
  - [ ] `VITE_SUPABASE_PUBLISHABLE_KEY` is set
  - [ ] `VITE_SUPABASE_PROJECT_ID` is set
- [ ] `.env` is in `.gitignore` (don't commit secrets!)

### File Checks
- [ ] `vercel.json` exists (Vercel configuration)
- [ ] `vite.config.ts` has production optimizations
- [ ] `package.json` has build script
- [ ] `tsconfig.json` is valid
- [ ] `index.html` references correct entry point

---

## Vercel Setup (Do This Once)

### Account & Repository
- [ ] Created Vercel account at vercel.com
- [ ] Connected GitHub repository to Vercel
- [ ] Vercel auto-detected Vite framework
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Environment Variables in Vercel
Go to Project Settings → Environment Variables:

- [ ] Added `VITE_SUPABASE_URL`
  - [ ] Set for Production environment
  - [ ] Set for Preview environment
  - [ ] Set for Development environment

- [ ] Added `VITE_SUPABASE_PUBLISHABLE_KEY`
  - [ ] Set for Production environment
  - [ ] Set for Preview environment
  - [ ] Set for Development environment

- [ ] Added `VITE_SUPABASE_PROJECT_ID`
  - [ ] Set for Production environment
  - [ ] Set for Preview environment
  - [ ] Set for Development environment

---

## Deployment Steps (Do This Each Time)

### Step 1: Push to Main
```bash
git push origin main
```

### Step 2: Monitor Deployment
- [ ] Go to Vercel Dashboard
- [ ] Go to Deployments tab
- [ ] Wait for "Building..." to complete
- [ ] Verify deployment shows "Ready"
- [ ] Check deployment logs for errors

### Step 3: Test Live Site
- [ ] Click deployment preview URL
- [ ] **Visual Check**:
  - [ ] Page loads without errors
  - [ ] Header/footer display correctly
  - [ ] Products load and display
  - [ ] Product images visible
  - [ ] Logo loads correctly

- [ ] **Functionality Check**:
  - [ ] Click products - details appear
  - [ ] Add to cart works
  - [ ] Cart icon updates
  - [ ] Click links - navigation works
  - [ ] Admin page loads at `/admin`

- [ ] **Technical Check**:
  - [ ] Open DevTools (F12)
  - [ ] Go to Console tab - no errors (should be clean)
  - [ ] Go to Network tab - check for failed requests
  - [ ] Check for 404 errors
  - [ ] No red X on images

- [ ] **Performance Check**:
  - [ ] Page loads in < 3 seconds
  - [ ] No lag when scrolling
  - [ ] Buttons respond immediately

### Step 4: Test on Mobile
- [ ] Open site on mobile phone/tablet
- [ ] Verify responsive design
- [ ] Touch interactions work
- [ ] Navigation accessible
- [ ] Images properly sized

---

## Troubleshooting Checklist

### App Shows Blank Page
- [ ] Check browser DevTools → Console for errors
- [ ] Verify environment variables are set in Vercel
- [ ] Check Supabase credentials are correct
- [ ] Verify Supabase database is running
- [ ] Redeploy project with new environment variables

### Build Fails on Vercel
- [ ] Run `npm run build` locally - test build works
- [ ] Check Vercel deployment logs for specific error
- [ ] Verify `package.json` has all dependencies
- [ ] Check for TypeScript compilation errors
- [ ] Ensure no relative import paths are broken

### Environment Variables Not Working
- [ ] Go to Vercel Settings → Environment Variables
- [ ] Verify all three variables are present
- [ ] Check values are copied correctly (no extra spaces)
- [ ] Ensure variables are set for correct environment
- [ ] Redeploy after making changes

### Images Not Loading
- [ ] Verify image files exist in `/public/assets/products/`
- [ ] Check image filenames in code match actual files
- [ ] Ensure filenames are case-sensitive (biad-logo.png vs Biad-Logo.png)
- [ ] Check image file formats (JPG, PNG)
- [ ] Verify images are under 5MB each

### Cart Not Working
- [ ] Check browser localStorage is enabled
- [ ] Open DevTools → Application → Local Storage
- [ ] Verify cart data is stored
- [ ] Clear localStorage and try again
- [ ] Check for JavaScript errors in Console

### Admin Panel Shows 404
- [ ] Verify routing works: `vercel.json` has `cleanUrls: true`
- [ ] Test on local build: `npm run preview`
- [ ] If local works but Vercel doesn't, redeploy
- [ ] Check that `src/pages/Admin.tsx` exists

---

## Post-Deployment (Keep Monitoring)

### First 24 Hours
- [ ] Monitor error logs in Vercel Dashboard
- [ ] Check Vercel Analytics for traffic
- [ ] Monitor Core Web Vitals (if enabled)
- [ ] Check for any reported issues

### Weekly
- [ ] Check Vercel Analytics dashboard
- [ ] Monitor error rate (should be < 1%)
- [ ] Review Core Web Vitals trends
- [ ] Check deployment history for any failed attempts

### Monthly
- [ ] Review performance metrics
- [ ] Check bundle size trends
- [ ] Update dependencies if necessary
- [ ] Review access logs for suspicious activity

---

## Emergency Rollback

If something goes wrong:

### Quick Rollback
1. Go to Vercel Dashboard → Deployments
2. Find last known-good deployment
3. Click the deployment
4. Click "Promote to Production"

This instantly reverts to previous version (takes < 1 minute).

### Detailed Rollback
1. In GitHub, revert to previous commit:
   ```bash
   git revert HEAD
   git push origin main
   ```
2. Vercel automatically redeploys
3. Check deployment status

---

## Important URLs

- **Live Site**: https://biad-drop.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Project Settings**: https://vercel.com/dashboard/biad-drop/settings
- **Supabase Console**: https://app.supabase.com
- **GitHub Repository**: https://github.com/muhammednazir200717-dotcom/biad-drop-live

---

## Quick Command Reference

```bash
# Local Testing
npm run dev              # Start dev server
npm run build           # Create production build
npm run preview         # Preview production build
npm run lint            # Check code quality
npm run test            # Run tests

# Git
git status              # Check changes
git add .               # Stage all changes
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub (triggers Vercel deploy)

# Vercel CLI
npm i -g vercel         # Install Vercel CLI
vercel                  # Deploy from CLI
vercel logs             # View deployment logs
```

---

## Notes

- Deployments usually take 2-5 minutes
- First deployment takes slightly longer
- Preview deployments happen automatically for pull requests
- No downtime deployments - old version stays live until new one is ready
- Can rollback to any previous deployment instantly

**Last Updated**: March 10, 2026
**Version**: 1.0
