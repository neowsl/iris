const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

(async () => {
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

    const testLogs = Array.from(
        document.querySelectorAll(".csub-test-feedback > span"),
    )
        .filter((el) => el.textContent?.trim().length > 0)
        .map((el) => el.textContent.slice(8))
        .join("\n");

    console.log(testLogs);
})();
