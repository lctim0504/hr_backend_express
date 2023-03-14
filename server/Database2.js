import dotenv from 'dotenv';
import sql from "mssql"

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
}
sql.connect(config, function (err) {
  if (err) console.log(err)
  else {
    console.log(`✓ connected to ${config.database}`);
  }
})
export default config;
