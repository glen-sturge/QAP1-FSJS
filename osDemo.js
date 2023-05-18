// require/enable os module
var os = require("os");

// Displays the hostname of the os
console.log("Hostname: " + os.hostname());
// displays platform
console.log("Platform: " + os.platform());
// displays architecture
console.log("Architecture: " + os.arch());
// displays machine-type
console.log("Machine-type: " + os.machine());
// displays os release version
console.log("OS Release Version: " + os.release());
// displays total memory on system
console.log("Total memory: " + os.totalmem());
// displays total free memory on system
console.log("Free memory: " + os.freemem());
// shows how many concurrent tasks can be completed
// determined by multiple processors or multiple cores in a single processor
console.log("Available Parallelism: " + os.availableParallelism());
// displays current system uptime in seconds
console.log("Uptime (s): " + os.uptime());

// store array of cpus
const cpus = os.cpus();
console.log("\nCPU information:");
//go through the array of cpus and return basic information for each
cpus.forEach((cpu, index) => {
  console.log(`\nCPU ${index + 1}:`);
  console.log(`Model: ${cpu.model}`);
  console.log(`Speed: ${cpu.speed}`);
});
