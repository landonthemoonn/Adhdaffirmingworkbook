import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-3dfdce46/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/make-server-3dfdce46/briefing", async (c) => {
  try {
    const body = await c.req.json();
    const { note } = body;
    const today = new Date().toISOString().split('T')[0];
    const key = `briefing_note:${today}`;
    
    await kv.set(key, { 
      note, 
      createdAt: new Date().toISOString(),
      status: 'pending_email' 
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log(error);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);