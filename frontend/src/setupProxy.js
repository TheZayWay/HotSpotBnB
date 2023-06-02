const {createProxyMiddleware} = require('pre');

module.exports = function (app) {
    console.log('running proxy setup')
    // if (process.env.NODE_ENV === 'development') {
        app.use('/api', createProxyMiddleware({
            target: "http://localhost:8000",
            changeOrigin: true
        }))
    // }
    
}
