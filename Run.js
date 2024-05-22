const { spawn } = require("child_process");
function start(message) {
  if (message) console.log(message, "[ Starting ]");

  const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "Dos.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  });

  child.on("close", codeExit => {
    if (codeExit !== 0 || (global.countRestart && global.countRestart < 5)) {
      global.countRestart = (global.countRestart || 0) + 1;
      start("Restarting system...");
    }
  });

  child.on("error", error => console.log("An error occurred: " + JSON.stringify(error), "[ Starting ]"));
}

start();
