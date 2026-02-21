import browser from "webextension-polyfill";

console.log("Popup loaded");

document.getElementById("start-btn")?.addEventListener("click", async () => {
    const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true,
    });

    if (tab?.id) {
        try {
            await browser.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["dist/main.js"],
            });
            console.log("Script injected successfully");
        } catch (err) {
            console.error("Injection failed:", err);
        }
    }
});
