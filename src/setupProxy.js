const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://fireblight.org/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // URL ^/api -> 공백 변경
      },
    })
  );
};
