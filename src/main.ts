const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Scrapes the test logs from the test cases.
 *
 * @returns The plain text of the test logs.
 */
const scrapeLogs = async () => {
    const testCaseEls = Array.from(
        document.querySelectorAll(".csub-test-name"),
    );

    const findTestCaseEl = (content: string) =>
        testCaseEls.find((el) => el.textContent.trim().startsWith(content))!;

    const targets = [
        findTestCaseEl("Forbidden Features"),
        findTestCaseEl("Code Quality"),
        findTestCaseEl("Code Concepts"),
    ];

    for (const el of targets) {
        el.dispatchEvent(
            new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
            }),
        );
    }

    await sleep(500);

    return Array.from(document.querySelectorAll(".csub-test-feedback > span"))
        .filter((el) => el.textContent?.trim().length > 0)
        .map((el) => el.textContent.slice(8))
        .join("\n");
};

/**
 * Inserts text into a rich text editor.
 *
 * @param query The query selector of the rich text editor.
 * @param text The text to insert.
 */
const insertText = async (query: string, text: string) => {
    const inputEl = document.querySelector(query) as HTMLDivElement;
    if (!inputEl) return;

    inputEl.focus();

    const selection = window.getSelection();
    const range = document.createRange();

    const targetNode = inputEl.querySelector("p") || inputEl;

    range.selectNodeContents(targetNode);
    range.collapse(false);

    selection?.removeAllRanges();
    selection?.addRange(range);

    targetNode.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    targetNode.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));

    await sleep(50);

    const success = document.execCommand("insertText", false, text);
    if (success) {
        inputEl.dispatchEvent(new Event("input", { bubbles: true }));
    }
};

(async () => {
    const testLogs = await scrapeLogs();

    console.log(testLogs);

    await insertText(
        'div[contenteditable="true"][role="textbox"]',
        "**bold text**",
    );
})();
