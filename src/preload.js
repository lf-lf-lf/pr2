// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("cpu", (event, data) => {
  document.getElementById("cpu").innerHTML = data;
  console.log("cpu", data);
});

ipcRenderer.on("mem", (event, data) => {
  document.getElementById("mem").innerHTML = data;
  console.log("mem", data);
});

ipcRenderer.on("total-mem", (event, data) => {
  document.getElementById("total-mem").innerHTML = data;
  console.log("total-mem", data);
});

ipcRenderer.on("platform", (event, data) => {
    document.getElementById("platform").innerHTML = data;
    console.log("platform", data);
});
