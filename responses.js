// const wablasToken =
//   "Vg5qPrWTzDmLA7cXiZjnfJegfJFlQsYD5eTwsKeLOxKuMUpaCYibEQw9gZXWKkE2";
const { request } = require("./request");
const googleApiKey = "AIzaSyCg_uKOlJJQcbaFfSv0mvpNVKm-cflu1Rs";
const spreadsheetId = "1LB_yKOJdBq_m7ffc1t1xmeyKDsMfd2dhnzTA-zvhZxY";
const range = "Peminjaman!A1:I";
// var options = {
//   method: "POST",
//   hostname: "wablas.com",
//   path: "/api/send-message",
//   headers: {
//     Authorization: wablasToken,
//     "Content-Type": "application/json"
//   }
// };
// var postData = {
//   phone: "081276763324",
//   message: "Hello"
// };
exports.listCommands = `Hai! Aku Ruba, bot Whatsapp dari Ruangbaca.

Berikut perintah yang kumengerti:

\`\`\`rb deadline\`\`\`
Menampilkan tanggal terakhir peminjaman kamu

\`\`\`rb form \`\`\`
Menampilkan link menuju form peminjaman
`;

exports.formResponse = `Kunjungi _link_ berikut untuk mengisi form peminjaman buku Ruang Baca:

https://ruba.xyz/pinjam`;

exports.getDeadlineResponse = async phone => {
  if (phone) phone = phone.slice(2);
  else phone = "81276763324";
  var options = {
    method: "GET",
    hostname: "sheets.googleapis.com",
    path:
      "/v4/spreadsheets/" +
      spreadsheetId +
      "/values/" +
      range +
      "?key=" +
      googleApiKey,
    headers: {
      "Content-Type": "application/json"
    }
  };
  let response = await request(options);
  let deadline;
  if (response) {
    let values = response.values.reverse();
    for (let i = 0; i < values.length; i++) {
      if (values[i][2].indexOf(phone) > -1) {
        deadline = values[i][7];
        break;
      }
    }
  }
  return (
    deadline ||
    "Maaf, sepertinya terjadi kesalahan, Ruba tidak dapat menemukan peminjaman kamu. Silakan kabari kami judul buku yang sedang kamu pinjam."
  );
};
