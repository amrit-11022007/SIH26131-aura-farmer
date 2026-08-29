const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const http = require("http");

let nextProcess = null;

const ROOT = path.join(__dirname, "..");

const NEXT_APP = path.join(ROOT, "farmer-frontend");

const NEXT_URL = "http://localhost:3000";

function startNextServer() {
  nextProcess = spawn(process.env.ComSpec || "cmd.exe", ["/c", "pnpm", "dev"], {
    cwd: NEXT_APP,
    env: {
      ...process.env,
      PORT: "3000",
    },
    windowsHide: false,
    stdio: "inherit",
  });

  nextProcess.on("error", (error) => {
    console.error("Failed to start Next.js:", error);
  });

  nextProcess.on("exit", (code) => {
    console.log(`Next.js exited with code ${code}`);
  });
}

function waitForServer(url, timeout = 90000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function check() {
      const request = http.get(url, (response) => {
        response.resume();

        console.log("Next.js is ready.");
        resolve();
      });

      request.on("error", () => {
        if (Date.now() - startTime >= timeout) {
          reject(
            new Error(
              `Next.js did not start within ${timeout / 1000} seconds.`,
            ),
          );
          return;
        }

        setTimeout(check, 500);
      });

      request.setTimeout(1000, () => {
        request.destroy();
      });
    }

    check();
  });
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1400,
    height: 900,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadURL(NEXT_URL);

  window.webContents.openDevTools();
}

function stopProcess(childProcess) {
  if (childProcess && !childProcess.killed) {
    childProcess.kill();
  }
}

function stopServers() {
  console.log("Stopping services...");

  stopProcess(nextProcess);
}

app.whenReady().then(async () => {
  try {
    startNextServer();

    console.log("Waiting for Next.js...");

    await waitForServer(NEXT_URL);

    createWindow();
  } catch (error) {
    console.error(error);
    stopServers();
    app.quit();
  }
});

app.on("before-quit", () => {
  stopServers();
});

app.on("window-all-closed", () => {
  stopServers();

  if (process.platform !== "darwin") {
    app.quit();
  }
});
