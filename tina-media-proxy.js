// =============================================================================
// CRITICAL COMPONENT: TinaCMS Media Proxy Server
// This server exists to solve Windows absolute path issues with TinaCMS
// 
// The Problem:
// - TinaCMS generates absolute file paths (C:\path\to\file) when referencing media
// - These paths don't work in the browser and break image display
// 
// The Solution:
// - This proxy server intercepts requests with Windows paths
// - It transforms them into relative paths that work in the browser
// - It serves files directly from the public directory
//
// DO NOT REMOVE THIS SERVER - it's essential for media handling on Windows
// =============================================================================

const express = require('express');
const path = require('path');
const cors = require('cors');

// Check if cors module is available, if not inform user to install it
try {
  require.resolve('cors');
} catch (e) {
  console.error('The "cors" package is required. Please install it with "npm install cors"');
  process.exit(1);
}

const app = express();
const PORT = 5001;

// Enable CORS for TinaCMS
app.use(cors());

// Serve static files from the public directory
// Note: We serve from root to simplify path resolution
app.use('/', express.static(path.join(__dirname, 'public')));

// Special route to handle absolute path references from TinaCMS
// This is the core functionality that fixes Windows path issues
app.get('/C:*', (req, res) => {
  // Extract the path after C:
  const requestPath = req.path;
  
  console.log('Received Windows path request:', requestPath);
  
  // Remove windows drive prefix and normalize to forward slashes
  const normalizedPath = requestPath
    .replace(/^\/C:/, '')
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/'); // Replace multiple slashes with a single one
  
  console.log('Normalized path:', normalizedPath);
  
  // If path contains '/public/', extract everything after it
  if (normalizedPath.includes('/public/')) {
    const publicPath = normalizedPath.split('/public/')[1];
    console.log('Redirecting to:', `/${publicPath}`);
    return res.redirect(`/${publicPath}`);
  }
  
  // If we get here, serve from root
  console.log('Serving from root:', normalizedPath);
  return res.redirect(normalizedPath);
});

// Log all requests for debugging
app.use((req, res, next) => {
  console.log('Request:', req.method, req.url);
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Media proxy server running at http://localhost:${PORT}`);
  console.log(`Images can be accessed at http://localhost:${PORT}/images/posts/`);
  console.log(`This helps fix Windows path issues with TinaCMS media`);
}); 