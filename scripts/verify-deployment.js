#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Checks if the project is ready for deployment to Vercel
 */

const fs = require('fs');
const path = require('path');

const checks = [];
let passCount = 0;
let warnCount = 0;
let failCount = 0;

function log(status, message, details = '') {
  const icons = {
    ✓: '✓',
    ⚠: '⚠',
    ✗: '✗'
  };
  
  const colors = {
    '✓': '\x1b[32m', // green
    '⚠': '\x1b[33m', // yellow
    '✗': '\x1b[31m'  // red
  };
  
  const reset = '\x1b[0m';
  const icon = icons[status];
  const color = colors[status];
  
  console.log(`${color}${icon}${reset} ${message}`);
  if (details) console.log(`  ${details}`);
  
  if (status === '✓') passCount++;
  if (status === '⚠') warnCount++;
  if (status === '✗') failCount++;
}

console.log('\n🔍 BIAD Drop - Deployment Verification\n');

// 1. Check package.json exists
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  log('✓', 'package.json found', `Version: ${pkg.version}`);
} catch (e) {
  log('✗', 'package.json not found or invalid');
}

// 2. Check for build script
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  if (pkg.scripts && pkg.scripts.build) {
    log('✓', 'Build script configured', `Command: ${pkg.scripts.build}`);
  } else {
    log('✗', 'No build script found in package.json');
  }
} catch (e) {
  log('✗', 'Could not read package.json');
}

// 3. Check vite.config.ts
if (fs.existsSync(path.join(__dirname, '../vite.config.ts'))) {
  log('✓', 'Vite configuration file found');
} else {
  log('✗', 'vite.config.ts not found');
}

// 4. Check TypeScript config
if (fs.existsSync(path.join(__dirname, '../tsconfig.json'))) {
  log('✓', 'TypeScript configuration found');
} else {
  log('✗', 'tsconfig.json not found');
}

// 5. Check environment variables
if (fs.existsSync(path.join(__dirname, '../.env'))) {
  const envContent = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8');
  const hasSupabaseUrl = envContent.includes('VITE_SUPABASE_URL');
  const hasSupabaseKey = envContent.includes('VITE_SUPABASE_PUBLISHABLE_KEY');
  
  if (hasSupabaseUrl && hasSupabaseKey) {
    log('✓', 'Environment variables configured for Supabase');
  } else {
    log('⚠', '.env file exists but missing some Supabase variables');
  }
} else {
  log('⚠', '.env file not found (will be needed for local development)');
}

// 6. Check src directory
if (fs.existsSync(path.join(__dirname, '../src'))) {
  log('✓', 'Source directory exists');
} else {
  log('✗', 'src directory not found');
}

// 7. Check main entry point
if (fs.existsSync(path.join(__dirname, '../src/main.tsx'))) {
  log('✓', 'React entry point (main.tsx) found');
} else {
  log('✗', 'src/main.tsx not found');
}

// 8. Check index.html
if (fs.existsSync(path.join(__dirname, '../index.html'))) {
  log('✓', 'HTML entry point (index.html) found');
} else {
  log('✗', 'index.html not found');
}

// 9. Check for node_modules
if (fs.existsSync(path.join(__dirname, '../node_modules'))) {
  log('⚠', 'node_modules directory found', 'Make sure dependencies are up to date with npm install or yarn install');
} else {
  log('⚠', 'node_modules not installed', 'Run: npm install (or yarn/pnpm install)');
}

// 10. Check Supabase integration
if (fs.existsSync(path.join(__dirname, '../src/integrations/supabase'))) {
  log('✓', 'Supabase integration found');
} else {
  log('✗', 'Supabase integration directory missing');
}

// 11. Check tailwind config
if (fs.existsSync(path.join(__dirname, '../tailwind.config.ts'))) {
  log('✓', 'Tailwind CSS configuration found');
} else {
  log('✗', 'tailwind.config.ts not found');
}

// 12. Check ESLint config
if (fs.existsSync(path.join(__dirname, '../eslint.config.js'))) {
  log('✓', 'ESLint configuration found');
} else {
  log('⚠', 'ESLint configuration not found');
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✓ Passed: ${passCount} | ⚠ Warnings: ${warnCount} | ✗ Failed: ${failCount}`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

if (failCount > 0) {
  console.log('❌ Deployment check failed. Please fix the issues above.\n');
  process.exit(1);
} else if (warnCount > 0) {
  console.log('⚠️  Deployment check passed with warnings. Review them above.\n');
  process.exit(0);
} else {
  console.log('✅ All checks passed! Project is ready for deployment.\n');
  process.exit(0);
}
