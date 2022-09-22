// const exec = require('child_process').exec;
import { exec } from "child_process";

// We will wrap all of our shell (gcloud) commands in this async function to ensure they always return before we continue
async function shell_cmd(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

export default shell_cmd;
