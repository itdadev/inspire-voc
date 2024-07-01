const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/contact/v1',
    createProxyMiddleware({
      target: process.env.REACT_APP_DB_URL,
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: process.env.REACT_APP_WEBSITE_DRUPAL_URL,
      changeOrigin: true,
    })
  );
};
