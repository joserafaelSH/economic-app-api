import os from "node:os";
import cluster from "node:cluster";

const main = () => {
  const processesCount = Number(process.env.CPUS) || os.cpus().length;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking Server with ${processesCount} processes \n`);

  for (let index = 0; index < processesCount; index++) cluster.fork();

  cluster.on("exit", (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(
        `Worker ${worker.process.pid} died... scheduling another one!`
      );
      cluster.fork();
    }
  });
};

const workers = async () => {
  await import("./server.js");
};

cluster.isPrimary ? main() : workers();
