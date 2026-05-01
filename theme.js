(function () {
  var storageKey = "theme-preference";
  var root = document.documentElement;
  var button = document.querySelector("[data-theme-toggle]");

  function getPreferredTheme() {
    var savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (button) {
      button.textContent = theme === "dark" ? "Light mode" : "Dark mode";
      button.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
    }
  }

  applyTheme(getPreferredTheme());

  if (!button) {
    return;
  }

  button.addEventListener("click", function () {
    var nextTheme =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });
})();
