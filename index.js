const wablasToken =
  "Vg5qPrWTzDmLA7cXiZjnfJegfJFlQsYD5eTwsKeLOxKuMUpaCYibEQw9gZXWKkE2";
const { initCommand } = require("./commands");
const { request } = require("./request");
const {
  listCommands,
  formResponse,
  getDeadlineResponse
} = require("./responses");
var options = {
  method: "POST",
  hostname: "wablas.com",
  path: "/api/send-message",
  headers: {
    Authorization: wablasToken,
    "Content-Type": "application/json"
  }
};
var postData = {
  phone: "081276763324",
  message: "Hello"
};
exports.handler = async event => {
  var body = event.body;
  var bodyProperties, message, phone; // see the end of file for sampe bodyProperties
  if (body) {
    bodyProperties = body.split("&");
    phone = bodyProperties[2].split("=")[1];
    message = bodyProperties[3].split("=")[1];
  } else {
    message = event.message;
  }
  var responseMessage;
  if (initCommand(message)) {
    responseMessage = listCommands;
  } else if (message === "rb+form") {
    responseMessage = formResponse;
  } else if (message === "rb+deadline" || message === "rb deadline") {
    // console.log(await request(options, postData));
    responseMessage = await getDeadlineResponse(phone);
  } else if (message === "echo") {
    responseMessage = "echo";
  } else if (message === "I+love+you") {
    responseMessage = "Love you too";
  }

  const response = {
    statusCode: 200,
    body: responseMessage
  };
  return response;
};

/*
Sample bodyProperties
[ 'id=930ACC569BA111D5B18B88BDEF5D06CF',
'fromMe=false',
'phone=6281276763324',
'message=Hd',
'timestamp=1554563255' ]
*/
