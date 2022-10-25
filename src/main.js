const path = require("path");

const binaryPath = path.resolve(
  __dirname,
  "..",
  `sentry-cli${process.platform === "win32" ? ".exe" : ""}`
);

console.log(binaryPath);
