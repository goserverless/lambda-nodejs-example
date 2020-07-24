// Here we can use http or https module
const https = require('https');

exports.handler = (event, context, callback) => {
    https.get(process.env.ENDPOINT, (res) => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => { rawData += chunk; });
      res.on('end', () => {
        try {
          console.log(rawData);
        } catch (e) {
          console.error(e.message);
        }
        callback(null, 'success msg')
      });
    }).on('error', (e) => {
      console.error(`Got error: ${e.message}`);
      callback(new Error(e.message))
    });
};
