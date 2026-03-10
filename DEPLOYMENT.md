# BIAD Drop - Deployment Guide

This guide walks you through deploying the BIAD Drop e-commerce app to Vercel.

## Prerequisites

- Node.js 18+ installed locally
- A Supabase account with your database configured
- A Vercel account (free tier is fine)

## Step 1: Local Development & Testing

### 1.1 Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 1.2 Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
   VITE_SUPABASE_PROJECT_ID=your-project-id
   ```

   You can find these values in your Supabase project:
   - Go to Settings → API
   - Copy the Project URL and Anon Key

### 1.3 Run Local Dev Server
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### 1.4 Test the App
- Visit the home page and verify the product grid loads
- Test the cart functionality
- Test the admin dashboard at `/admin`
- Check the console for any errors

### 1.5 Run Tests
```bash
npm run test
```

### 1.6 Build Locally (Simulate Production)
```bash
npm run build
```

This creates a `dist` folder with optimized production files. Verify the build completes without errors.

### 1.7 Preview Production Build
```bash
npm run preview
```

Open `http://localhost:4173` to test the production build locally.

---

## Step 2: Prepare for Vercel Deployment

### 2.1 Verify Deployment Readiness
```bash
node scripts/verify-deployment.js
```

This script checks that all necessary files and configurations are in place.

### 2.2 Check Git Status
Ensure all changes are committed:
```bash
git status
git add .
git commit -m "Prepare for Vercel deployment"
```

---

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

#### 3A.1 Install Vercel CLI
```bash
npm i -g vercel
```

#### 3A.2 Deploy
```bash
vercel
```

Follow the prompts:
1. Link to your Vercel account
2. Select "Existing Project" or create a new one
3. Confirm the project settings
4. Add environment variables when prompted

#### 3A.3 Add Environment Variables
When Vercel asks about environment variables, add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite and configures the build
5. Add Environment Variables in the Project Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
6. Click "Deploy"

### Option C: Using GitHub (Automatic)

1. Push your code to GitHub
2. Go to vercel.com and import the repository
3. Vercel automatically deploys on every push to `main` branch

---

## Step 4: Verify Live Deployment

After deployment completes:

1. **Visit Your Live Site**
   - The deployment URL will be provided (e.g., `https://biad-drop.vercel.app`)
   - Click the link to open your live site

2. **Test Core Functionality**
   - ✓ Products load correctly
   - ✓ Images display properly
   - ✓ Cart functionality works
   - ✓ Admin panel is accessible at `/admin`
   - ✓ No console errors in browser DevTools

3. **Check Performance**
   - Open DevTools → Network tab
   - Verify images are optimized
   - Check that load times are reasonable

4. **Test on Mobile**
   - Visit your Vercel URL on a mobile device
   - Verify responsive design works correctly

---

## Troubleshooting

### Build Fails on Vercel

**Issue**: Build command fails
- **Solution**: Check the build logs in Vercel Dashboard → Deployments → Failed Deployment
- Common fixes:
  - Ensure all dependencies are in `package.json`
  - Check for TypeScript errors: `npm run build` locally
  - Verify environment variables are set

### Environment Variables Not Working

**Issue**: App shows blank or errors about missing Supabase
- **Solution**:
  - Go to Vercel Project Settings → Environment Variables
  - Verify all three Supabase variables are set correctly
  - Redeploy: In Deployments tab, click a deployment and click "Redeploy"

### App Shows Blank Page

**Issue**: Page loads but nothing renders
- **Solution**:
  - Open browser DevTools → Console tab
  - Look for JavaScript errors
  - Check if Supabase variables are correct
  - Verify Supabase project is running

### Images Not Loading

**Issue**: Product images show broken image icon
- **Solution**:
  - Verify images are in `/public/assets/products/`
  - Check file names match exactly (case-sensitive on Linux)
  - Ensure images are in the correct format (JPG, PNG)

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xyz.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anonymous key | `eyJhbGc...` |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID | `xyz` |

---

## Post-Deployment Checklist

- [ ] Live site is accessible via Vercel URL
- [ ] All products display correctly
- [ ] Cart functionality works
- [ ] Admin dashboard is accessible and functional
- [ ] No console errors
- [ ] Mobile responsive design works
- [ ] Images load properly
- [ ] Database queries complete successfully
- [ ] No 404 errors for assets

---

## Monitoring & Updates

### View Deployment Logs
```bash
vercel logs
```

### Rollback to Previous Deployment
In Vercel Dashboard → Deployments → Select previous version → Click "Redeploy"

### Set Up Auto-Deployments
- Connect your GitHub repository to Vercel
- Vercel automatically deploys on push to `main`
- Set up preview deployments for pull requests

---

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Vite Documentation**: https://vitejs.dev
- **React Documentation**: https://react.dev

For issues, check the deployment logs and error messages carefully. Most problems are environment variable or configuration related.
