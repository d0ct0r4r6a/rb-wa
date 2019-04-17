const {
  initCommand,
  deadlineCommand,
  formCommand,
  returnCommand
} = require("./commands");
const {
  listCommandResponse,
  formResponse,
  returnResponse,
  getDeadlineResponse
} = require("./responses");

exports.handler = async event => {
  var body = event.body;
  var bodyProperties, message, phone; // see the end of file for sample bodyProperties
  if (body) {
    bodyProperties = body.split("&");
    phone = bodyProperties[2].split("=")[1];
    message = bodyProperties[3].split("=")[1];
  } else {
    phone = event.phone;
    message = event.message;
  }
  var responseMessage;
  if (initCommand(message)) {
    responseMessage = listCommandResponse;
  } else if (formCommand(message)) {
    responseMessage = formResponse;
  } else if (returnCommand(message)) {
    responseMessage = returnResponse;
  } else if (deadlineCommand(message)) {
    responseMessage = await getDeadlineResponse(phone);
  } else if (message === "echo") {
    responseMessage = "echo";
  } else if (message === "I+love+you") {
    responseMessage = "Love you too";
  }

  console.log(
    `From: ${phone}, Message: ${message}, Response: ${responseMessage}`
  );
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
