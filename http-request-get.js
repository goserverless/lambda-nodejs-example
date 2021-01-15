// Here we can use http or https module
const https = require('https');

exports.handler = (event, context, callback) => {
// normal way    
//     https.get(process.env.ENDPOINT, (res) => {
//       res.setEncoding('utf8');
//       let rawData = '';
//       res.on('data', (chunk) => { rawData += chunk; });
//       res.on('end', () => {
//         try {
//           console.log(rawData);
//         } catch (e) {
//           console.error(e.message);
//         }
//         callback(null, 'success msg')
//       });
//     }).on('error', (e) => {
//       console.error(`Got error: ${e.message}`);
//       callback(new Error(e.message))
//     });
    
 // async await

    let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get(process.env.ENDPOINT, function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: dataString
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    return response;
};

// We then can use Cloudwatch event to run this function, for example: 0 16 * * ? *
