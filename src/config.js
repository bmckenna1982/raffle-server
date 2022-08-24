module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_BASE_URL:
    process.env.API_BASE_URL || "http://localhost:3000/api",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://dunder_mifflin:office@localhost/raffletickets",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://dunder_mifflin:office@localhost/raffletickets_test",
  JWT_SECRET: process.env.JWT_SECRET || "this-secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "5m"
};