const bcrypt = require('bcrypt');

async function run() {
  const pwd = "1234"; // סיסמה להזנה
  console.log("Password entered:", pwd);

  const saltRounds = 10; // רמת קושי ההצפנה
  const hashedPassword = await bcrypt.hash(pwd, saltRounds);

  console.log("Encrypted password (hash):", hashedPassword);
}

run();
