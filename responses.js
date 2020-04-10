const { request } = require("./request");

exports.listCommandResponse = `Hai! Aku Ruba, bot Whatsapp dari Ruangbaca.

Kamu bisa mendapatkan informasi dariku dengan mengetik:

\`\`\`Rb has <judul>\`\`\` 🆕
Contoh: Rb has Dilan 1990
Mengecek ketersediaan buku dengan judul tertentu

\`\`\`Rb deadline\`\`\`
Mengecek tanggal terakhir peminjaman kamu

\`\`\`Rb form \`\`\`
Menampilkan link menuju form peminjaman

\`\`\`Rb return \`\`\`
Menampilkan alamat pengembalian buku
`;

exports.formResponse = `Kunjungi _link_ berikut untuk mengisi form peminjaman buku Ruang Baca:

https://ruba.xyz/pinjam`;

exports.returnResponse = `Untuk mengembalikan, kamu boleh menggunakan kurir apa saja.
Berikut alamat tujuan pengembaliannya:

PT Bristol Furniture Indonesia,
GAMA TOWER 21st Floor Unit G & H,
Jalan Haji R. Rasuna Said Kav. C22,
RT.2/RW.5, Karet Kuningan
Jakarta Selatan 12940
DKI Jakarta

Atas nama Violeta (Ruang Baca) dengan nomor telepon +62 878-7607-2328

Tolong kirimkan foto / _screenshot_ resi pengirimannya agar memudahkan kami melakukan pelacakan.

Terima kasih, ya :)
`;

exports.getDeadlineResponse = async phone => {
  const range = "Peminjaman!A1:K";
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
      if (values[i][2].indexOf(phone) > -1 && Boolean(values[i][10])) {
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

exports.getHasResponse = async message => {
  let bookTitle = "",
    responseMessage = "";
  if (message.includes("has")) {
    bookTitle = message.slice(message.indexOf("has") + 4);
  } else if (message.includes("ada")) {
    bookTitle = message.slice(message.indexOf("ada") + 4);
  }
  bookTitle = bookTitle.replace(/\+/g, " ");
  const range = "Buku!C1:K";
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
  if (response) {
    let postedBookTitles = response.values
      .filter(row => row[8] === "Ya")
      .map(row => row[0]);
    if (postedBookTitles.includes(bookTitle)) {
      responseMessage = `Ya! Ruba mempunyai buku "${bookTitle}".

Untuk meminjamnya, kamu bisa mengisi form di:

https://ruba.xyz/pinjam`;
    } else {
      responseMessage = `Maaf, Ruba belum punya buku itu.`;
    }
  } else {
    responseMessage =
      "Maaf, sepertinya terjadi kesalahan teknis. Mohon coba beberapa saat lagi.";
  }
  return responseMessage;
};
