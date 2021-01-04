const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length - 1; i++) {
    const worker = cluster.fork();

    worker.on("exit", () => {
      cluster.fork();
    });
  }
} else if (cluster.isWorker) {
  require("./worker");

  console.log(process.pid);
}
