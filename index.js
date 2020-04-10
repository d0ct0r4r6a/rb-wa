const wa = require('@open-wa/wa-automate');

function start(client) {
  client.onMessage(message => {
    console.log(message);
    if (message.body === 'Ruba') {
      client.sendText(message.from, `Halo, ${message.sender.name}!`);
    }
  });

  client.page.on('error', _ => {
    console.log('ERROR HERE!');
    console.log(_);
  });
  return 0;
}

wa.create().then(client => start(client));