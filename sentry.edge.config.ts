// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://4eee13a429c3404b52252f5e666823cd@o4506485106016256.ingest.sentry.io/4506485107261440",
  tracesSampleRate: 1,
  debug: false,
});
