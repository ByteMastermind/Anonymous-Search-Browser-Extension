# Anonymous Address-Bar Search (Brave / Chrome)

Type **`a <query>`** in the address bar to search Google in a **logged-out
Private window**. Search anything **without** the `a` keyword and the browser
behaves completely normally — Google with your signed-in account.

## Why a Private window?

A browser profile has **one** Google cookie jar. You cannot be signed in and
signed out on `google.com` at the same time in the same profile. A **Private
window** has its own separate, empty cookie jar — so Google sees you as logged
out there. This extension uses that for the `a` searches only, and never
touches the rest of your browsing.

## How it works

The extension registers `a` as an address-bar keyword:

- Type `a`, a space, then your query (e.g. `a cheap flights to rome`).
- The extension builds the search URL itself and opens it directly in a
  logged-out Private window.
- Because the extension creates the request, your signed-in profile **never
  sends it** — nothing is associated with your account (zero leak).

A single Private window is reused for all anonymous searches so they don't pile
up. Anything you type **without** `a ` is ignored by the extension and works
exactly as before (signed in).

## Install

### Option A — download a release (recommended for users)

1. Open the
   [**Releases**](https://github.com/ByteMastermind/Anonymous-Search-Browser-Extension/releases/latest)
   page.
2. Under **Assets**, download `anonymous-search-extension-<version>.zip`.
3. Unzip it into a folder you'll keep — the extension runs from this folder, so
   don't delete it afterwards.
4. Open `brave://extensions` (or `chrome://extensions`) and enable
   **Developer mode** (top-right).
5. Click **Load unpacked** and select the unzipped folder.

> This extension isn't published on the Chrome Web Store, so it's installed as
> an unpacked extension. To update later, download the newer release zip and
> either replace the folder's contents and click **Reload**, or remove the old
> one and load the new folder.

### Option B — install from source (for development)

1. Clone or download this repository.
2. Open `brave://extensions` and enable **Developer mode**.
3. Click **Load unpacked** and select the `anonymous-search-extension` folder.

## Required setup — allow Private windows

The extension opens results in a Private window, so it must be allowed there:

1. On `brave://extensions`, click **Details** on this extension.
2. Turn on **Allow in Private/Tor windows**.

The toolbar popup shows a green status when this is enabled (and a red warning +
instructions if it isn't). A `!` badge appears if a search couldn't open
because access is still off.

## Usage

- **Anonymous search:** `a your search here` in the address bar → opens
  logged-out in a Private window.
- **Normal search / browsing:** type a query without `a `, open `google.com`,
  Gmail, click links — all stays signed in, unchanged.

## Notes & limitations

- **Don't sign in inside the Private window.** If you log into Google there, it
  stops being anonymous for that session.
- **Closing the Private window** clears its session — expected, and keeps things
  clean.
- **Domain scope:** searches go to `google.com`. To use a regional domain
  (e.g. `google.de`), edit `buildSearchUrl()` in `background.js` and reload.
- **Change the keyword:** edit `"omnibox": { "keyword": "a" }` in
  `manifest.json`, then reload the extension.
- **Icons:** none are bundled (Brave shows a default). Add an `icons` block to
  `manifest.json` if you want a custom one.

## Privacy

The extension collects and sends **nothing**, requests **no permissions**, and
stores nothing. It only opens Private windows when you use the `a` keyword.

## Files

- `manifest.json` — extension manifest (MV3)
- `background.js` — `a` keyword handler + Private-window logic
- `ui.html` / `ui.js` — toolbar popup / options page (Private-access status)
