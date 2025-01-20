const { exec } = require("child_process");
const path = require("path");

// Function to run a shell command
function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    const process = exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });

    // Print the command output in real-time
    process.stdout.on("data", (data) => console.log(data.toString()));
    process.stderr.on("data", (data) => console.error(data.toString()));
  });
}

// Run Docker Compose commands
async function runDockerCompose() {
  try {
    const composeFilePath = path.resolve(__dirname, "docker-compose.yml");

    // Check if Docker Compose is available
    console.log("Checking Docker Compose version...");
    await runCommand("docker-compose --version");

    // Run docker compose
    console.log("\nRunning docker compose...");
    await runCommand(`docker-compose --project-name quiz_app  -f ${composeFilePath} up --build -d`); 

    console.log("\nRunning composer install");
    await runCommand(`docker-compose --project-name quiz_app  -f ${composeFilePath} run --rm composer install --no-scripts --ignore-platform-reqs`); 

    console.log("\nGenerate Laravel Key");
    await runCommand(`docker-compose --project-name quiz_app  -f ${composeFilePath} run --rm artisan key:generate`);  

    console.log("\nMigrate database");
    await runCommand(`docker-compose --project-name quiz_app  -f ${composeFilePath} run --rm  artisan migrate:fresh`); 

    console.log("\nDocker Compose services are up and running!");
  } catch (error) {
    console.error("An error occurred:", error.stderr || error.error);
  }
}

// Execute the function
runDockerCompose();