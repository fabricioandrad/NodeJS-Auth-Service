const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 3000;

async function waitForDB(retries = 10) {
  while (retries) {
    try {
      await pool.query("SELECT 1");
      console.log("🟢 Banco conectado!");
      return;
    } catch (err) {
      console.log("🔴 Banco não pronto, tentando novamente...");
      retries--;
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  throw new Error("❌ Não conseguiu conectar no banco");
}

async function init() {
  try {
    await waitForDB();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(160) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("INIT ERROR:", error);
    process.exit(1);
  }
}

init();