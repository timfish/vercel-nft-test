const path = require("path");

function getPath() {
  const parts = [];
  parts.push(__dirname);
  parts.push("..");
  parts.push(`sentry-cli${process.platform === "win32" ? ".exe" : ""}`);
  return path.resolve(...parts);
}

const binaryPath = getPath();

console.log(binaryPath);
