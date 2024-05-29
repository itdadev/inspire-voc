const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: process.env.REACT_APP_DB_URL,
      changeOrigin: true,
    })
  );
};
