const withSerwist = require("@serwist/next").default({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

module.exports = withSerwist({
  // Your Next.js config
});