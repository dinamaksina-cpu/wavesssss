import "@cloudflare/workers-types";

declare module "cloudflare:workers" {
  interface Env {
    DB: D1Database;
  }
}
