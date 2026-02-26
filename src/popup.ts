import browser from "webextension-polyfill";

// inject script when mark button is clicked
document.getElementById("mark")?.addEventListener("click", async () => {
    const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
    });

    if (tab?.id) {
        await browser.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["dist/main.js"],
        });
    }
});
