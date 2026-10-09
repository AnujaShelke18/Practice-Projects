import { initTaskController } from "./taskController.js";
import { initThemeController } from "./themeController.js";
import { initSettingsController } from "./settingsController.js";

document.getElementById("sidebarToggle").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("sidebar-hidden");
});

initTaskController();
initThemeController();
initSettingsController();