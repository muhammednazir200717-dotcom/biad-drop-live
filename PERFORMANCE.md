# BIAD Drop - Performance & Optimization Guide

This guide covers performance optimization strategies for the BIAD Drop e-commerce app.

## Build Performance

### Code Splitting
The Vite configuration uses manual chunks to split vendor code:
- **vendor.js** - React, React Router, React Query (core dependencies)
- **supabase.js** - Supabase client
- **ui.js** - Radix UI components

This ensures faster initial page load since users only download what they need.

### Minification
Production builds automatically:
- Minify JavaScript using Terser
- Remove console.log statements in production
- Compress and optimize assets

### Build Size Analysis
To analyze bundle size:
```bash
npm run build
# Check the console output for bundle size information
```

---

## Image Optimization

### Current Images
Product images are stored in `/public/assets/products/`:
- Images should be optimized JPG format
- Maximum recommended size: 200KB per image
- Recommended dimensions: 400x400px or larger

### Best Practices
1. **Use Modern Formats**: Prefer WebP with JPEG fallback
2. **Compress Images**: Use tools like TinyPNG or ImageOptim
3. **Lazy Load**: The app uses browser-native lazy loading
4. **Responsive Images**: Serve different sizes based on screen

---

## Runtime Performance

### React Query Caching
The app uses React Query for:
- Automatic request deduplication
- Automatic refetching on window focus
- Background synchronization

Current caching strategy:
- Default staleTime: 5 minutes
- Default cacheTime: 10 minutes

To adjust, modify the QueryClient in `src/App.tsx`:
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});
```

### Component Optimization
- Use React.memo for components that don't need frequent re-renders
- Use useMemo and useCallback for expensive computations
- Avoid creating functions inside render methods

---

## Network Performance

### API Calls
- Batch related queries when possible
- Use pagination for large datasets
- Implement request debouncing for search

### Caching Strategies
1. **Supabase Client**: Uses automatic token caching
2. **React Query**: Handles request deduplication
3. **Browser Cache**: Static assets cached by Vercel's CDN

---

## Monitoring & Analytics

### Vercel Analytics (Recommended)
Add to your Vercel project for free performance monitoring:
1. Go to Vercel Dashboard → Project Settings → Analytics
2. Enable Web Analytics
3. Monitor Core Web Vitals

### Core Web Vitals to Monitor
- **Largest Contentful Paint (LCP)**: < 2.5 seconds (good)
- **First Input Delay (FID)**: < 100ms (good)
- **Cumulative Layout Shift (CLS)**: < 0.1 (good)

---

## Deployment Performance

### Vercel Optimization
Vercel automatically:
- Compresses assets with Brotli and gzip
- Caches static content globally
- Serves from edge locations nearest to users
- Implements HTTP/2 Server Push

### Environment Variables
Ensure environment variables are set:
- ✓ `VITE_SUPABASE_URL`
- ✓ `VITE_SUPABASE_PUBLISHABLE_KEY`
- ✓ `VITE_SUPABASE_PROJECT_ID`

---

## Performance Checklist

### Before Deployment
- [ ] Run `npm run build` and check for warnings
- [ ] Test production build locally: `npm run preview`
- [ ] Check console for errors in browser DevTools
- [ ] Verify all images load correctly
- [ ] Test on slow 3G network (DevTools → Network tab)
- [ ] Run Lighthouse audit (DevTools → Lighthouse)

### After Deployment
- [ ] Monitor Vercel Analytics
- [ ] Check Core Web Vitals weekly
- [ ] Review error logs in Vercel Dashboard
- [ ] Monitor API response times
- [ ] Check for JavaScript errors using error tracking

---

## Common Performance Issues

### Slow Page Load
- **Cause**: Large images or uncompressed assets
- **Fix**: Optimize images, enable caching headers
- **Check**: Vercel Analytics → Core Web Vitals

### High API Latency
- **Cause**: Unoptimized Supabase queries or network issues
- **Fix**: Add database indexes, use pagination, batch queries
- **Check**: Browser DevTools → Network tab

### Large Bundle Size
- **Cause**: Unused dependencies or large libraries
- **Fix**: Code split, tree-shake unused code
- **Check**: `npm run build` output

---

## Optimization Tools

### Lighthouse
Built into Chrome DevTools:
1. Open DevTools → Lighthouse tab
2. Select Desktop/Mobile
3. Run audit
4. Review recommendations

### Vercel Analytics
In Vercel Dashboard:
1. Go to your project
2. Click "Analytics" tab
3. Review Core Web Vitals
4. Check geographic performance

### WebPageTest
Free online tool: https://www.webpagetest.org
- Detailed waterfall charts
- Film strip view
- Video playback

---

## Future Optimizations

### Potential Improvements
1. **Image CDN**: Move to dedicated image CDN (Cloudinary, Imgix)
2. **Caching Headers**: Set aggressive cache headers for static assets
3. **Service Worker**: Implement for offline support
4. **Code Splitting**: Further split route-based code
5. **API Optimization**: Use database-level pagination and filtering

---

## Resources

- **Vercel Performance Guide**: https://vercel.com/docs/concepts/analytics/performance
- **Web Vitals**: https://web.dev/vitals/
- **React Performance**: https://react.dev/learn/render-and-commit
- **Vite Performance**: https://vitejs.dev/guide/performance.html
