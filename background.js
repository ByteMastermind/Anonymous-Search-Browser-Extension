// Anonymous Address-Bar Search — MV3 service worker.
//
// Type "a <query>" in the address bar to run that Google search in a
// logged-out Private window. The extension builds the URL itself and opens it
// in Private, so your signed-in profile never sends the request and the search
// is not tied to your account.
//
// Anything WITHOUT the "a" keyword is left completely untouched — normal
// Google use stays signed in.

let warnedAboutIncognito = false;

function buildSearchUrl(query) {
  // pws=0 asks Google not to personalize results.
  return "https://www.google.com/search?pws=0&q=" + encodeURIComponent(query);
}

// Open a Google search in a logged-out Private window, reusing an existing
// Private window when one is already open so they don't pile up.
async function openAnonSearch(url) {
  const windows = await chrome.windows.getAll({ populate: false });
  const priv = windows.find((w) => w.incognito);
  if (priv) {
    await chrome.tabs.create({ windowId: priv.id, url, active: true });
    await chrome.windows.update(priv.id, { focused: true });
  } else {
    await chrome.windows.create({ url, incognito: true, focused: true });
  }
}

// Shown when we cannot open a Private window (extension not yet allowed in
// Private/Tor windows).
function notifyIncognitoNeeded() {
  chrome.action.setBadgeText({ text: "!" });
  chrome.action.setBadgeBackgroundColor({ color: "#d33" });
  if (!warnedAboutIncognito) {
    warnedAboutIncognito = true;
    chrome.runtime.openOptionsPage();
  }
}

chrome.omnibox.setDefaultSuggestion({
  description: "Search Google anonymously in a logged-out Private window",
});

chrome.omnibox.onInputEntered.addListener(async (text) => {
  const query = (text || "").trim();
  if (!query) return;
  try {
    await openAnonSearch(buildSearchUrl(query));
  } catch (e) {
    console.error("[anon-search] could not open Private window:", e);
    notifyIncognitoNeeded();
  }
});
