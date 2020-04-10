const fs = require('fs');
const wa = require('@open-wa/wa-automate');

function start(client) {
  client.onMessage(message => {
    console.log(message);
    if (message.body === 'Hi') {
      client.sendText(message.from, '👋 Hello!');
    }
  });
  return 0;
}

wa.create().then(client => start(client));