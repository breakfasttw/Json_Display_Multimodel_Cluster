/**
 * main.js
 * 主控台邏輯：處理 DOM 事件與協調資料、結構檔的載入
 */
document.addEventListener("DOMContentLoaded", () => {
    let currentMode = "single";

    const groupSelect = document.getElementById("groupSelect");
    const tableBody = document.getElementById("tableBody");
    const val1Header = document.getElementById("val1Header");
    const val2Header = document.getElementById("val2Header");
    const tabCompare = document.getElementById("tabCompare");
    const tabSingle = document.getElementById("tabSingle");

    const initApp = () => {
        setupTabs();
        updateTabStyles(); // 添加這一行
        renderDropdown();
    };

    function setupTabs() {
        tabCompare.addEventListener("click", () => {
            currentMode = "compare";
            tabCompare.className =
                "px-6 py-2 bg-blue-600 text-white rounded-lg font-bold border border-blue-500 shadow-md transition-colors";
            tabSingle.className =
                "px-6 py-2 bg-slate-800 text-slate-400 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition-colors";
            renderDropdown();
        });

        tabSingle.addEventListener("click", () => {
            currentMode = "single";
            tabSingle.className =
                "px-6 py-2 bg-blue-600 text-white rounded-lg font-bold border border-blue-500 shadow-md transition-colors";
            tabCompare.className =
                "px-6 py-2 bg-slate-800 text-slate-400 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition-colors";
            renderDropdown();
        });

        groupSelect.addEventListener("change", (e) => {
            if (currentMode === "compare") {
                loadCompareData(e.target.value);
            } else {
                loadSingleData(e.target.value);
            }
        });
    }

    function updateTabStyles() {
        if (currentMode === "compare") {
            tabCompare.className =
                "px-6 py-2 bg-blue-600 text-white rounded-lg font-bold border border-blue-500 shadow-md transition-colors";
            tabSingle.className =
                "px-6 py-2 bg-slate-800 text-slate-400 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition-colors";
        } else {
            tabSingle.className =
                "px-6 py-2 bg-blue-600 text-white rounded-lg font-bold border border-blue-500 shadow-md transition-colors";
            tabCompare.className =
                "px-6 py-2 bg-slate-800 text-slate-400 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition-colors";
        }
    }

    function renderDropdown() {
        groupSelect.innerHTML = "";

        if (currentMode === "compare") {
            const activeGroups = compareGroupDescribe.filter((g) => g.enable);
            activeGroups.forEach((group) => {
                const opt = document.createElement("option");
                opt.value = group.groupDisplayName;
                opt.textContent = group.groupDisplayName;
                groupSelect.appendChild(opt);
            });
            if (activeGroups.length > 0)
                loadCompareData(activeGroups[0].groupDisplayName);
        } else {
            singleFileDescribe.forEach((file) => {
                const opt = document.createElement("option");
                opt.value = file.fileName;
                opt.textContent = file.fileDisplayName;
                groupSelect.appendChild(opt);
            });
            if (singleFileDescribe.length > 0)
                loadSingleData(singleFileDescribe[0].fileName);
        }
    }

    async function loadCompareData(groupName) {
        updateVideoLink(groupName, "compare");
        const configs = compareFileDescribe.filter(
            (f) => f.groupDisplayName === groupName,
        );

        if (configs.length < 2) {
            tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-red-400">此群組缺乏兩份檔案供比較</td></tr>`;
            return;
        }

        const [file1Conf, file2Conf] = configs;
        setHeaders(file1Conf, file2Conf);

        try {
            const schemaVersion = file1Conf.structure_version;
            const annotationMap =
                await window.AppSchema.loadSchema(schemaVersion);

            const [json1, json2] = await Promise.all([
                fetch(file1Conf.url).then((r) => r.json()),
                fetch(file2Conf.url).then((r) => r.json()),
            ]);
            window.AppRenderer.renderTable(
                json1,
                json2,
                tableBody,
                annotationMap,
            );
        } catch (err) {
            // 加入 Console 錯誤日誌
            console.error(`[Compare Mode] 無法解析 JSON，請檢查檔案格式:`, err);
            tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-red-400">無法讀取 JSON 檔案，請開啟 Console 查看錯誤細節</td></tr>`;
        }
    }

    async function loadSingleData(fileName) {
        const fileConf = singleFileDescribe.find(
            (f) => f.fileName === fileName,
        );
        if (!fileConf) return;

        updateVideoLink(fileName, "single");
        setHeaders(fileConf, null);

        try {
            const schemaVersion = fileConf.structure_version;
            const annotationMap =
                await window.AppSchema.loadSchema(schemaVersion);

            const json1 = await fetch(fileConf.url).then((r) => r.json());
            window.AppRenderer.renderTable(
                json1,
                null,
                tableBody,
                annotationMap,
            );
        } catch (err) {
            // 加入 Console 錯誤日誌
            console.error(`[Single Mode] 無法解析 JSON，請檢查檔案格式:`, err);
            tableBody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-red-400">無法讀取 JSON 檔案，請開啟 Console 查看錯誤細節</td></tr>`;
        }
    }

    function setHeaders(conf1, conf2) {
        val1Header.innerHTML = `${conf1.fileDisplayName} ${
            conf1.video_url
                ? `<a href="${conf1.video_url}" target="_blank" class="ml-1 text-blue-400 hover:text-blue-300">🔗</a>`
                : ""
        }`;

        if (conf2) {
            val2Header.classList.remove("hidden");
            val1Header.className =
                "p-4 w-[33%] text-sm font-bold text-blue-400 border-r border-slate-700 text-center";
            val2Header.innerHTML = `${conf2.fileDisplayName} ${
                conf2.video_url
                    ? `<a href="${conf2.video_url}" target="_blank" class="ml-1 text-purple-400 hover:text-purple-300">🔗</a>`
                    : ""
            }`;
        } else {
            val2Header.classList.add("hidden");
            val1Header.className =
                "p-4 w-[66%] text-sm font-bold text-blue-400 border-slate-700 text-center rounded-tr-2xl";
        }
    }

    function updateVideoLink(targetKey, mode) {
        const videoLinkEl = document.getElementById("videoLink");
        let videoUrl = "";

        if (mode === "compare") {
            const groupInfo = compareGroupDescribe.find(
                (g) => g.groupDisplayName === targetKey,
            );
            if (groupInfo) videoUrl = groupInfo.videoUrl;
        } else {
            const fileInfo = singleFileDescribe.find(
                (f) => f.fileName === targetKey,
            );
            if (fileInfo) videoUrl = fileInfo.video_url;
        }

        if (videoUrl && videoUrl.trim() !== "") {
            videoLinkEl.href = videoUrl;
            videoLinkEl.classList.remove("hidden");
        } else {
            videoLinkEl.classList.add("hidden");
        }
    }

    initApp();
});
