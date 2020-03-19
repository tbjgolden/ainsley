const prompt = require("prompt");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const pkgJSON = require("../package.json");

prompt.start();

prompt.get(
  {
    properties: {
      version: {
        pattern: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,
        default: pkgJSON.version
      },
      message: {
        pattern: /^.{20,}$/,
        required: true
      }
    }
  },
  async (err, { version, message }) => {
    if (!err) {
      await fs.writeFile(
        path.join(__dirname, "../package.json"),
        JSON.stringify({ ...pkgJSON, version }, null, 2)
      );
      execSync(`git tag -a "v${version}" -m "${message}"`);
      execSync(`yarn publish --new-version ${version}`);
    }
  }
);
