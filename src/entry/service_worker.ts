import browser from "webextension-polyfill";

async function set_startup() {
  const man = browser.runtime.getManifest()
  console.info("Setting badge text")
  if (man.version == "1.0.0") {
    browser.action.setBadgeText({text: "d"}).then().catch(() => {
    });
  }

  try {
    let registered = await browser.scripting.getRegisteredContentScripts({ids: ["remoteHandler"],})
    if (registered.length < 1) {
      console.info("Registering click handler")
      await browser.scripting.registerContentScripts([{
        id: "remoteHandler",
        js: ["js/content.js"],
        matches: ["https://*/*"],
        runAt: "document_start"
      }]);
    }
  } catch (err) {
    console.error(`failed to register content scripts: ${err}`);
  }
  // browser.runtime.openOptionsPage().then()
  setTimeout(async ()=> {
    console.log("Going home..")
    let home = browser.runtime.getURL('main.html')
    await browser.tabs.update({url: home})
    await browser.windows.update((await browser.windows.getCurrent()).id!, {state: "fullscreen"})
  },500)
}

async function msg_proc(data: any) {
  switch (data.cmd) {
    case "home": {
      console.log("Going home..")
      let home = browser.runtime.getURL('main.html')
      await browser.tabs.update({url: home})
      await browser.windows.update((await browser.windows.getCurrent()).id!, {state: "fullscreen"})
      break;
    }
    case "report": {
      const ext = browser.runtime.getManifest()
      const browser_name = ('browser_specific_settings' in ext) ? "Firefox" : "Chrome"
      await browser.tabs.create({
        url: 'https://github.com/maoserr/epublifier/issues/new?'
          + 'assignees=maoserr&labels=bug&projects=&template=bug_report.md&'
          + 'title=%5BBUG%5D+New+bug:+' + encodeURIComponent(data.origin) + '&body=**Describe the bug**%0A'
          + 'A clear and concise description of what the bug is.%0A%0A'
          + '**Required info (please complete the following information):**%0A'
          + ' - Url: ' + encodeURIComponent(data.origin) + '%0A'
          + ' - Browser: ' + encodeURIComponent(browser_name) + '%0A'
          + ' - Extension Version: ' + encodeURIComponent(ext.version)
      })
      break;
    }
  }
}
browser.action.onClicked.addListener( (tab) => {
  console.log("Going home..")
  let home = browser.runtime.getURL('main.html')
  browser.tabs.update({url: home}).then()
});
browser.runtime.onStartup.addListener(set_startup)
browser.runtime.onInstalled.addListener(set_startup)
browser.runtime.onMessage.addListener(msg_proc)
