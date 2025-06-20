import http from "http";
import httpProxy from "http-proxy";

const TARGET = "ws://nitro.blumhost.net:2805";

const proxy = httpProxy.createProxyServer({
  target: TARGET,
  ws: true,
  changeOrigin: true,
  headers: {
    origin: "http://nitro.blumhost.net"
  }
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket proxy is running\n");
});

server.on("upgrade", (req, socket, head) => {
  proxy.ws(req, socket, head);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
