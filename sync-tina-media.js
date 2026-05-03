// =============================================================================
// Media Verification Script for Deployment
// This script ensures media files are properly available before deployment
//
// Initial Purpose:
// - Originally designed to sync media from TinaCMS directory to public folder
//
// Current Purpose:
// - Verifies that media files exist in the correct location
// - Creates directories if necessary
// - Provides troubleshooting information about media files
//
// Used before deployment to ensure all media is properly accessible
// =============================================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to sync - simplified to match the current TinaCMS config
// Images should now be directly in public/images/posts already
const targetDir = path.join(__dirname, 'public', 'images', 'posts');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

console.log('Checking TinaCMS media directory...');

// Since TinaCMS now stores media directly in public/images/posts
// this script is mostly for verification and creating directories if needed
console.log(`Media directory is: ${targetDir}`);
console.log('Images should now be properly stored in the public folder by TinaCMS');

// List the files in the directory to help troubleshoot
try {
  const files = fs.readdirSync(targetDir);
  console.log('\nFiles in media directory:');
  if (files.length === 0) {
    console.log('(none)');
  } else {
    files.forEach(file => console.log(`- ${file}`));
  }
  console.log('\nMedia directory check completed!');
} catch (error) {
  console.error('Error checking media directory:', error.message);
} 