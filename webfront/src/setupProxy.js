const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/service",
    createProxyMiddleware({
      //      target: "http://mapreport.geospace.local/",
      target: "http://localhost:8084/",
      changeOrigin: true,
    })
  );
};
