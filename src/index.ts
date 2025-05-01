#!/usr/bin/env node
import { startMcpServer } from "./mcpServer.js";

startMcpServer().catch(err => {
  console.error("Error starting MCP server:", err);
  process.exit(1);
});