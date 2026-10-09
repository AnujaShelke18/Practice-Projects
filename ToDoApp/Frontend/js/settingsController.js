import * as taskModel from "./taskModel.js";
import * as taskView from "./taskView.js";

export function initSettingsController() {
    document.getElementById("settingsToggle").addEventListener("click", function (e) {
        e.preventDefault();
        const setting = document.getElementById("settingDropdown");
        setting.style.display = setting.style.display === "none" ? "block" : "none";
    });

    document.getElementById("defaultPriority").addEventListener("change", function () {
        localStorage.setItem("defaultPriority", this.value);
    });
    document.getElementById("defaultPriority").value = localStorage.getItem("defaultPriority") || "High";

    document.getElementById("clearAllTasks").addEventListener("click", async function (e) {
        e.preventDefault();
        if (!confirm("Are you sure you want to clear all tasks?")) return;
        try{
        await taskModel.clearAllTasks();
        taskView.clearTaskListDOM();
        document.getElementById("settingDropdown").style.display = "none";
        }catch(err){
            alert("Could not clear the tasks.");
        }
    });

    document.getElementById("support").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("faqBlock").style.display = "flex";
        document.getElementById("settingDropdown").style.display = "none";
    });

    document.getElementById("closeFaq").addEventListener("click", function () {
        document.getElementById("faqBlock").style.display = "none";
    });
}