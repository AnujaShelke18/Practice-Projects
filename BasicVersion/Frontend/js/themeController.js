export function applyTheme(choice) {
    localStorage.setItem("theme", choice);
    document.body.classList.remove("dark", "pink", "light");

    if (choice === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.body.classList.add(prefersDark ? "dark" : "light");
    } else {
        document.body.classList.add(choice);
    }
}

export function initThemeController() {
    document.getElementById("theme").addEventListener("click", function (e) {
        e.preventDefault();
        const themes = document.getElementById("themeDropdown");
        themes.style.display = themes.style.display === "none" ? "block" : "none";
    });

    ["dark", "light", "system", "pink"].forEach(themeId => {
        document.getElementById(themeId).addEventListener("click", function () {
            applyTheme(themeId);
            document.getElementById("themeDropdown").style.display = "none";
        });
    });

    applyTheme(localStorage.getItem("theme") || "system");
}