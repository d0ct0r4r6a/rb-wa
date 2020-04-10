const wa = require('@open-wa/wa-automate');

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
    if (message.body === 'Hi') {
      client.sendText(message.from, '👋 Hello!');
    }
  });
}

wa.create().then(client => start(client));