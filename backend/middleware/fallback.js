constpath = require('path') 
constwebroot = path.join(__dirname, '../../frontend/dist') // send always index.html for non-API requests 
functionfallback(req, res, next) {​​​​​​​​
if (req.path.indexOf('/api') === 0){​​​​​​​​
next(); // do nothing
  }​​​​​​​​ else {​​​​​​​​
if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {​​​​​​​​
res.sendFile(`${​​​​​​​​webroot}​​​​​​​​/index.html`)
    }​​​​​​​​ else {​​​​​​​​
res.json('No handler for this request type defined')
    }​​​​​​​​
  }​​​​​​​​
}​​​​​​​​;
module.exports = fallback

