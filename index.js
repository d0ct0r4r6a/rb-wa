const wa = require('@open-wa/wa-automate');

function start(client) {
  client.onMessage(message => {
    console.log(message);
    if (message.body === 'Ruba') {
      client.sendText(message.from, '👋 Selamat malam!');
    }
  });
  return 0;
}

wa.create().then(client => start(client));