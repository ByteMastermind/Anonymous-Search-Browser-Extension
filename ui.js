const incStatus = document.getElementById("incStatus");
const incHelp = document.getElementById("incHelp");

chrome.extension.isAllowedIncognitoAccess((allowed) => {
  if (allowed) {
    incStatus.textContent =
      "Private access is on — anonymous searches will open logged-out.";
    incStatus.className = "status ok";
    incHelp.style.display = "none";
  } else {
    incStatus.textContent =
      "Private access is OFF — anonymous searches can't open yet.";
    incStatus.className = "status warn";
    incHelp.style.display = "block";
  }
  // Clear any "!" warning badge now that the user has seen the UI.
  chrome.action.setBadgeText({ text: "" });
});
