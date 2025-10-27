const { spawnSync } = require("node:child_process");

const port = process.env.PORT || "4173";
const args = ["vite", "preview", "--host", "0.0.0.0", "--port", port];

const result = spawnSync("npx", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 0);
