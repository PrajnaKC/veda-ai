import { spawn } from "node:child_process";
import dotenv from "dotenv";

// Load local environment variables so spawned backend process inherits them
dotenv.config({ path: ".env.local" });

function start(command, args, label) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: true,
    env: process.env
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`${label} exited with code ${code}`);
      process.exit(code);
    }
  });

  return child;
}

const nextDev = start("npm", ["run", "dev:frontend"], "frontend");
const backendDev = start("node", ["--experimental-strip-types", "backend/src/server.ts"], "backend");

function shutdown() {
  nextDev.kill();
  backendDev.kill();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
