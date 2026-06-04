/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the tracing root to this project (silences the multi-lockfile warning).
  outputFileTracingRoot: __dirname,
  // The app reads public/screens/<key>/ from disk at request time to discover
  // local screenshots. Trace those files into the server functions so the
  // reads work on Vercel, not just at build.
  outputFileTracingIncludes: {
    "/": ["./public/screens/**/*"],
    "/[app]": ["./public/screens/**/*"],
    "/[app]/privacy-policy": ["./public/screens/**/*"],
    "/privacy-policy/[app]": ["./public/screens/**/*"],
    // The icon/apple-icon routes read public/profile.jpg at runtime.
    "/icon": ["./public/profile.jpg"],
    "/apple-icon": ["./public/profile.jpg"],
  },
};

module.exports = nextConfig;
