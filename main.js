/**
 * main.js
 * 主控台邏輯：處理 DOM 事件與協調資料、結構檔的載入
 *
 * 整合版本說明：
 * 1. 保留原本 Compare Mode 與 Single Mode 的資料載入與表格渲染流程。
 * 2. 新增 Structure Mode，專門呼叫 new_json_structure.js 的 AppStructure.renderStructureView()。
 * 3. Structure Mode 使用獨立表頭：Data Type / Feature Prompt。
 * 4. 切回 Compare / Single 時，會重新套用原本表頭與欄位寬度，避免吃到 Structure Mode 的樣式。
 * 5. Compare / Single 仍然只使用 AppRenderer.renderTable(json1, json2, tableBody, annotationMap)，不傳 URL 給 renderer。
 */
document.addEventListener("DOMContentLoaded", () => {
    /**
     * currentMode 可用值：
     * - "compare"：比較兩份 JSON
     * - "single"：顯示單一 JSON
     * - "structure"：顯示 JSON structure 欄位定義
     */
    let currentMode = "single";

    /**
     * 取得主要 DOM 節點
     */
    const groupSelect = document.getElementById("groupSelect");
    const tableBody = document.getElementById("tableBody");
    const val1Header = document.getElementById("val1Header");
    const val2Header = document.getElementById("val2Header");
    const tabCompare = document.getElementById("tabCompare");
    const tabSingle = document.getElementById("tabSingle");

    /**
     * Structure Mode 新增頁籤
     * 如果 index.html 尚未加入 tabStructure 按鈕，這裡會是 null。
     */
    const tabStructure = document.getElementById("tabStructure");

    /**
     * 初始化應用程式
     */
    const initApp = () => {
        setupTabs();
        updateTabStyles();
        renderDropdown();
    };

    /**
     * 綁定頁籤與下拉選單事件
     */
    function setupTabs() {
        /**
         * Compare Mode：回到原本比較模式
         */
        tabCompare.addEventListener("click", () => {
            currentMode = "compare";
            updateTabStyles();
            renderDropdown();
        });

        /**
         * Single Mode：回到原本單檔模式
         */
        tabSingle.addEventListener("click", () => {
            currentMode = "single";
            updateTabStyles();
            renderDropdown();
        });

        /**
         * Structure Mode：新增結構檔檢視模式
         */
        if (tabStructure) {
            tabStructure.addEventListener("click", () => {
                currentMode = "structure";
                updateTabStyles();
                renderDropdown();
            });
        }

        /**
         * 下拉選單切換時，依目前模式呼叫對應載入函式
         */
        groupSelect.addEventListener("change", (e) => {
            if (currentMode === "compare") {
                loadCompareData(e.target.value);
            } else if (currentMode === "structure") {
                loadStructureData(e.target.value);
            } else {
                loadSingleData(e.target.value);
            }
        });
    }

    /**
     * 更新三個頁籤的視覺狀態
     */
    function updateTabStyles() {
        const activeClass =
            "px-6 py-2 bg-blue-600 text-white rounded-lg font-bold border border-blue-500 shadow-md transition-colors";
        const inactiveClass =
            "px-6 py-2 bg-slate-800 text-slate-400 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition-colors";

        if (tabCompare) {
            tabCompare.className =
                currentMode === "compare" ? activeClass : inactiveClass;
        }

        if (tabSingle) {
            tabSingle.className =
                currentMode === "single" ? activeClass : inactiveClass;
        }

        if (tabStructure) {
            tabStructure.className =
                currentMode === "structure" ? activeClass : inactiveClass;
        }
    }

    /**
     * 重新產生下拉選單內容
     *
     * Compare Mode：顯示 compareGroupDescribe 中 enable=true 的群組
     * Single Mode：顯示 singleFileDescribe 中所有檔案
     * Structure Mode：顯示所有不重複的 structure_version
     */
    function renderDropdown() {
        groupSelect.innerHTML = "";

        if (currentMode === "compare") {
            const activeGroups = compareGroupDescribe
                .filter((g) => g.enable)
                .slice()
                .reverse();

            activeGroups.forEach((group) => {
                const opt = document.createElement("option");
                opt.value = group.groupDisplayName;
                opt.textContent = group.groupDisplayName;
                groupSelect.appendChild(opt);
            });

            if (activeGroups.length > 0) {
                loadCompareData(activeGroups[0].groupDisplayName);
            } else {
                tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500">沒有可用的 Compare 群組</td></tr>`;
            }
        } else if (currentMode === "structure") {
            const structureVersions = getUniqueStructureVersions()
                .slice()
                .reverse();

            structureVersions.forEach((versionName) => {
                const opt = document.createElement("option");
                opt.value = versionName;
                opt.textContent = versionName;
                groupSelect.appendChild(opt);
            });

            if (structureVersions.length > 0) {
                loadStructureData(structureVersions[0]);
            } else {
                tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500">沒有可用的 Structure 檔案</td></tr>`;
            }
        } else {
            singleFileDescribe
                .slice()
                .reverse()
                .forEach((file) => {
                    const opt = document.createElement("option");
                    opt.value = file.fileName;
                    opt.textContent = file.fileDisplayName;
                    groupSelect.appendChild(opt);
                });

            if (singleFileDescribe.length > 0) {
                loadSingleData(
                    singleFileDescribe[singleFileDescribe.length - 1].fileName,
                );
            } else {
                tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500">沒有可用的 Single 檔案</td></tr>`;
            }
        }
    }

    /**
     * 蒐集所有不重複的結構檔版本名稱
     *
     * 來源包含：
     * - singleFileDescribe[].structure_version
     * - compareFileDescribe[].structure_version
     */
    function getUniqueStructureVersions() {
        const versions = new Set();

        if (typeof singleFileDescribe !== "undefined") {
            singleFileDescribe.forEach((file) => {
                if (file.structure_version) {
                    versions.add(file.structure_version);
                }
            });
        }

        if (typeof compareFileDescribe !== "undefined") {
            compareFileDescribe.forEach((file) => {
                if (file.structure_version) {
                    versions.add(file.structure_version);
                }
            });
        }

        return Array.from(versions).sort();
    }

    /**
     * 載入 Compare Mode 資料
     */
    async function loadCompareData(groupName) {
        updateVideoLink(groupName, "compare");

        const configs = compareFileDescribe.filter(
            (file) => file.groupDisplayName === groupName,
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
                fetch(file1Conf.url).then((response) => response.json()),
                fetch(file2Conf.url).then((response) => response.json()),
            ]);

            window.AppRenderer.renderTable(
                json1,
                json2,
                tableBody,
                annotationMap,
            );
        } catch (err) {
            console.error(`[Compare Mode] 無法解析 JSON，請檢查檔案格式:`, err);
            tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-red-400">無法讀取 JSON 檔案，請開啟 Console 查看錯誤細節</td></tr>`;
        }
    }

    /**
     * 載入 Single Mode 資料
     */
    async function loadSingleData(fileName) {
        const fileConf = singleFileDescribe.find(
            (file) => file.fileName === fileName,
        );

        if (!fileConf) return;

        updateVideoLink(fileName, "single");
        setHeaders(fileConf, null);

        try {
            const schemaVersion = fileConf.structure_version;
            const annotationMap =
                await window.AppSchema.loadSchema(schemaVersion);

            const json1 = await fetch(fileConf.url).then((response) =>
                response.json(),
            );

            window.AppRenderer.renderTable(
                json1,
                null,
                tableBody,
                annotationMap,
            );
        } catch (err) {
            console.error(`[Single Mode] 無法解析 JSON，請檢查檔案格式:`, err);
            tableBody.innerHTML = `<tr><td colspan="6" class="p-8 text-center text-red-400">無法讀取 JSON 檔案，請開啟 Console 查看錯誤細節</td></tr>`;
        }
    }

    /**
     * 載入 Structure Mode 資料
     *
     * 注意：
     * Structure Mode 不使用 AppRenderer.renderTable()。
     * 它只交給 new_json_structure.js 的 AppStructure.renderStructureView()。
     */
    async function loadStructureData(versionName) {
        updateVideoLink(versionName, "structure");
        setStructureHeaders();

        if (
            !window.AppStructure ||
            typeof window.AppStructure.renderStructureView !== "function"
        ) {
            tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-red-400">找不到 AppStructure.renderStructureView，請確認 new_json_structure.js 已正確引入</td></tr>`;
            return;
        }

        await window.AppStructure.renderStructureView(versionName);
    }

    /**
     * 設定 Compare / Single Mode 的表頭
     *
     * conf2 有值：Compare Mode
     * conf2 為 null：Single Mode
     */
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
            val2Header.className =
                "p-4 w-[33%] text-sm font-bold text-purple-400 text-center rounded-tr-2xl";
            val2Header.innerHTML = `${conf2.fileDisplayName} ${
                conf2.video_url
                    ? `<a href="${conf2.video_url}" target="_blank" class="ml-1 text-purple-400 hover:text-purple-300">🔗</a>`
                    : ""
            }`;
        } else {
            val2Header.classList.add("hidden");
            val2Header.innerHTML = "";
            val1Header.className =
                "p-4 w-[66%] text-sm font-bold text-blue-400 border-slate-700 text-center rounded-tr-2xl";
        }
    }

    /**
     * 設定 Structure Mode 的表頭
     *
     * Structure Mode 的資料欄位會變成：
     * - val1Header：Data Type
     * - val2Header：Feature Prompt
     */
    function setStructureHeaders() {
        val1Header.classList.remove("hidden");
        val2Header.classList.remove("hidden");

        val1Header.innerHTML = "Data Type";
        val1Header.className =
            "p-4 w-[5%] text-sm font-bold text-blue-400 border-r border-slate-700 text-center";

        val2Header.innerHTML = "Feature Prompt";
        val2Header.className =
            "p-4 w-[40%] text-sm font-bold text-purple-400 text-center rounded-tr-2xl";
    }

    /**
     * 更新影片連結
     *
     * Compare Mode：
     * - 讀取 compareGroupDescribe[].videoUrl
     *
     * Single Mode：
     * - 讀取 singleFileDescribe[].video_url
     *
     * Structure Mode：
     * - 結構檔沒有影片連結，因此一律隱藏
     */
    function updateVideoLink(targetKey, mode) {
        const videoLinkEl = document.getElementById("videoLink");
        let videoUrl = "";

        if (!videoLinkEl) return;

        if (mode === "compare") {
            const groupInfo = compareGroupDescribe.find(
                (group) => group.groupDisplayName === targetKey,
            );
            if (groupInfo) videoUrl = groupInfo.videoUrl;
        } else if (mode === "single") {
            const fileInfo = singleFileDescribe.find(
                (file) => file.fileName === targetKey,
            );
            if (fileInfo) videoUrl = fileInfo.video_url;
        } else {
            videoUrl = "";
        }

        if (videoUrl && videoUrl.trim() !== "") {
            videoLinkEl.href = videoUrl;
            videoLinkEl.classList.remove("hidden");
        } else {
            videoLinkEl.classList.add("hidden");
            videoLinkEl.removeAttribute("href");
        }
    }

    /**
     * 啟動應用程式
     */
    initApp();
});
