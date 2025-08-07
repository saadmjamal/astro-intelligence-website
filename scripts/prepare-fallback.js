#!/usr/bin/env node

// Fallback prepare script for Vercel deployments
console.log('Running prepare fallback script...');

// Check if we're in a git repository
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Check if .git directory exists
  const gitDir = path.join(process.cwd(), '.git');
  if (fs.existsSync(gitDir)) {
    console.log('Git repository detected, running husky...');
    execSync('husky', { stdio: 'inherit' });
  } else {
    console.log('Not in a git repository, skipping husky setup.');
  }
} catch (error) {
  console.log('Husky setup skipped:', error.message);
}

console.log('Prepare script completed.');