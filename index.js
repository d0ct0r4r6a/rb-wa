const wa = require('@open-wa/wa-automate');
const fs = require('fs');

wa.ev.on('qr.**', async qrcode => {
  //qrcode is base64 encoded qr code image
  //now you can do whatever you want with it
  const imageBuffer = Buffer.from(
    qrcode.replace('data:image/png;base64,', ''),
    'base64'
  );
  fs.writeFileSync('public/qr_code.png', imageBuffer);
});

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