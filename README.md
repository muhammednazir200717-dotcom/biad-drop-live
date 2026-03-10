# BIAD Drop - Clothing E-Commerce Platform

A modern, responsive e-commerce platform built for BIAD, an underground Nigerian streetwear brand. Features product browsing, shopping cart functionality, and an admin dashboard for inventory management.

**Live Site**: https://biad-drop.vercel.app

## Project Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Shadcn/ui + Radix UI + Tailwind CSS
- **State Management**: React Query + Context API
- **Backend**: Supabase (PostgreSQL + Auth)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

### Setup

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd biad-drop

# 2. Install dependencies
npm install

# 3. Create .env file with Supabase credentials
cp .env.example .env
# Edit .env with your Supabase URL and API key

# 4. Start development server
npm run dev

# 5. Open http://localhost:8080
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run test         # Run tests with Vitest
npm run test:watch   # Run tests in watch mode
```

## Project Structure

```
src/
├── components/       # Reusable components
│   ├── ui/          # Shadcn UI components
│   ├── admin/       # Admin dashboard components
│   └── *            # Feature components (Header, Footer, etc)
├── pages/           # Page components (Index, Admin, NotFound)
├── integrations/    # External integrations (Supabase)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── assets/          # Images and static files
└── App.tsx          # Main app component

public/
├── images/          # Public images
└── assets/          # Product images
```

## Deployment

### Deploy to Vercel

**Option 1: Using Vercel Dashboard**
1. Go to vercel.com and import your GitHub repository
2. Vercel auto-detects Vite and configures the build
3. Add environment variables (VITE_SUPABASE_*)
4. Click Deploy

**Option 2: Using Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option 3: GitHub Auto-Deploy**
- Push to main branch
- Vercel automatically deploys

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## Environment Variables

Required environment variables (in `.env`):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

Get these from your Supabase project Settings → API.

## Features

- ✓ Product catalog with filtering
- ✓ Shopping cart with local persistence
- ✓ Admin dashboard for order management
- ✓ Product management interface
- ✓ User authentication via Supabase
- ✓ Responsive design (mobile, tablet, desktop)
- ✓ Dark mode support via next-themes
- ✓ Toast notifications
- ✓ Form validation with Zod

## File Guides

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide for Vercel
- **[PERFORMANCE.md](./PERFORMANCE.md)** - Performance optimization tips
- **[.env.example](./.env.example)** - Environment variable template

## Troubleshooting

### App won't start locally
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Environment variables not working
- Ensure `.env` file exists in root directory
- Variables must start with `VITE_` for Vite to expose them
- Restart dev server after changing `.env`

### Build fails on Vercel
- Check build logs: Vercel Dashboard → Deployments → Failed Deployment
- Run `npm run build` locally to test
- Verify all environment variables are set

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Push to GitHub
4. Create a pull request

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
