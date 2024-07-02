const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: "buz3f1gl9nbon3hxsemm-mysql.services.clever-cloud.com",
  user: "ucp4qxxpr7tlvcza",
  password: "0vdff4YPDlLeqeonbMlI",
  database: "buz3f1gl9nbon3hxsemm"
});

export { pool }