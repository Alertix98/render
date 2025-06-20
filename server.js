import express from "express";
import http from "http";
import { createProxyServer } from "http-proxy";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);

const proxy = createProxyServer({
  target: "ws://nitro.blumhost.net:2805",
  ws: true,
  changeOrigin: true,
  secure: false,
});

app.get("/", (req, res) => {
  res.send("WebSocket Proxy is running.");
});

// Handle WebSocket upgrades
server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head);
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
