import browser, {Tabs} from "webextension-polyfill";

async function set_badge() {
  const man = browser.runtime.getManifest()
  console.info("Setting badge text")
  if (man.version == "1.0.0") {
    browser.action.setBadgeText({text: "d"}).then().catch(() => {
    });
  }

  console.info("Registering click handler")
  browser.action.onClicked.addListener(async (tab) => {
    browser.runtime.openOptionsPage().then()
    await browser.windows.update((await browser.windows.getCurrent()).id!, {state: "fullscreen"})
  });

  try {
    await browser.scripting.registerContentScripts([{
      id: "remoteHandler",
      js: ["js/content.js"],
      matches: ["https://*/*"],
    }]);
  } catch (err) {
    console.error(`failed to register content scripts: ${err}`);
  }
  browser.runtime.openOptionsPage().then()
  setTimeout(async ()=> {
    await browser.windows.update((await browser.windows.getCurrent()).id!, {state: "fullscreen"})
  },500)
}

browser.runtime.onStartup.addListener(set_badge)
browser.runtime.onInstalled.addListener(set_badge)
