module.exports = {
  jwtSecret: process.env.JWT_SECRET || '43ea2130-98a6-466c-8172-2e8ed5ee63de',
  jwt: {
    expiresIn: "30d",
  }
};