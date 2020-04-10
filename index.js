const wa = require('@open-wa/wa-automate');
const fs = require('fs');

wa.ev.on('qr.**', async qrcode => {
  //qrcode is base64 encoded qr code image
  //now you can do whatever you want with it
  console.log('first line qr listener');
  const imageBuffer = Buffer.from(
    qrcode.replace('data:image/png;base64,', ''),
    'base64'
  );
  console.log(imageBuffer.toString('base64'));
  fs.writeFileSync('qr_code.png', imageBuffer);
});

function start(client) {
  console.log('First line of start function');
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

wa.create().then(client => {
  console.log('creating client...');
  return start(client)
});