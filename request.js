const https = require("https");

function request(options, postData = {}) {
  return new Promise((resolve, reject) => {
    const request = https.request(options, response => {
      response.setEncoding("utf8");
      let returnData = "";
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(
          new Error(
            `${response.statusCode}: ${response.req.getHeader("host")} ${
              response.req.path
            }`
          )
        );
      }

      response.on("data", chunk => {
        returnData += chunk;
      });

      response.on("end", () => {
        resolve(JSON.parse(returnData));
      });

      response.on("error", error => {
        reject(error);
      });
    });
    request.write(JSON.stringify(postData));
    request.end();
  });
}

exports.request = request;
