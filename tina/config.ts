import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main"; // Ensure this aligns with your Tina Cloud project's target branch

// ===========================================================================
// CRITICAL ARCHITECTURE DECISION:
// - TinaCMS is used ONLY during local development
// - We deploy a static site without TinaCMS to Firebase
// - Content is edited locally and stored in markdown files
// ===========================================================================

export default defineConfig({
  branch,

  // Get this from tina.io - This will be read from .env.local
  // clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID, // Reverted for local setup
  // Get this from tina.io - This will be read from .env.local
  // token: process.env.TINA_TOKEN, // Reverted for local setup

  build: {
    outputFolder: "admin", // For local dev admin UI
    publicFolder: "public",
  },
  media: {
    // This tells Tina Cloud how to structure media paths in your Git repo
    // For local setup, this primarily defines where Tina looks for media.
    tina: {
      mediaRoot: "images/posts", // Relative to publicFolder
      publicFolder: "public",    // Base for media
    },
  },
  // TinaCMS admin configuration
  admin: {
    // This section can be used for local admin UI tweaks if needed in future
  },
  // Blog content schema
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts", // Tina Cloud will commit to this path
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: 'tags',
            }
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // Create a router that links to our blog post pages
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
    ],
  },
});
