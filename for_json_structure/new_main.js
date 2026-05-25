/**
 * main.js
 * 主控台邏輯：處理 DOM 事件與協調資料、結構檔的載入
 */
document.addEventListener("DOMContentLoaded", () => {
    // 預設啟動模式
    let currentMode = "single";

    const groupSelect = document.getElementById("groupSelect");
    const tableBody = document.getElementById("tableBody");
    const val1Header = document.getElementById("val1Header");
    const val2Header = document.getElementById("val2Header");
    const tabCompare = document.getElementById("tabCompare");
    const tabSingle = document.getElementById("tabSingle");
    // 擴充：獲取 Structure 頁籤 DOM 節點
    const tabStructure = document.getElementById("tabStructure");

    const initApp = () => {
        setupTabs();
        updateTabStyles();
        renderDropdown();
    };

    function setupTabs() {
        tabCompare.addEventListener("click", () => {
            currentMode = "compare";
            updateTabStyles();
            renderDropdown();
        });

        tabSingle.addEventListener("click", () => {
            currentMode = "single";
            updateTabStyles();
            renderDropdown();
        });

        // 擴充：監聽 Structure 頁籤點擊事件
        if (tabStructure) {
            tabStructure.addEventListener("click", () => {
                currentMode = "structure";
                updateTabStyles();
                renderDropdown();
            });
        }

        groupSelect.addEventListener("change", () => {
            refreshTableContent();
        });
    }

    // 擴充：配合原本的樣式管理邏輯，統整切換三個頁籤的激活狀態
    function updateTabStyles() {
        const activeClass =
            "px-6 py-2 bg-blue-600 text-white rounded-lg font-bold border border-blue-500 shadow-md transition-colors";
        const inactiveClass =
            "px-6 py-2 bg-slate-800 text-slate-400 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition-colors";

        if (tabCompare)
            tabCompare.className =
                currentMode === "compare" ? activeClass : inactiveClass;
        if (tabSingle)
            tabSingle.className =
                currentMode === "single" ? activeClass : inactiveClass;
        if (tabStructure)
            tabStructure.className =
                currentMode === "structure" ? activeClass : inactiveClass;
    }

    // 擴充：從小組設定與單檔案設定中，自動撈取所有不重複的結構檔版本名稱
    function getUniqueStructureVersions() {
        const versions = new Set();
        if (typeof singleFileDescribe !== "undefined") {
            singleFileDescribe.forEach((f) => {
                if (f.structure_version) versions.add(f.structure_version);
            });
        }
        if (typeof compareGroupDescribe !== "undefined") {
            compareGroupDescribe.forEach((g) => {
                if (g.structure_version) versions.add(g.structure_version);
            });
        }
        if (versions.size === 0) versions.add("json_structure_13.json"); // 防呆保底
        return Array.from(versions).sort();
    }

    function renderDropdown() {
        groupSelect.innerHTML = "";

        // 擴充：當切換為結構模式時，下拉選單呈現不重複的結構版本清單
        if (currentMode === "structure") {
            const versions = getUniqueStructureVersions();
            versions.forEach((ver) => {
                const opt = document.createElement("option");
                opt.value = ver;
                opt.textContent = ver;
                groupSelect.appendChild(opt);
            });
        }
        // 維持原樣：Compare Mode 下拉選單生成邏輯
        else if (currentMode === "compare") {
            if (typeof compareGroupDescribe !== "undefined") {
                compareGroupDescribe.forEach((g) => {
                    if (g.enable) {
                        const opt = document.createElement("option");
                        opt.value = g.groupDisplayName;
                        opt.textContent = g.groupDisplayName;
                        groupSelect.appendChild(opt);
                    }
                });
            }
        }
        // 維持原樣：Single Mode 下拉選單生成邏輯
        else if (currentMode === "single") {
            if (typeof singleFileDescribe !== "undefined") {
                singleFileDescribe.forEach((f) => {
                    const opt = document.createElement("option");
                    opt.value = f.fileName;
                    opt.textContent = f.fileDisplayName;
                    groupSelect.appendChild(opt);
                });
            }
        }

        refreshTableContent();
    }

    function refreshTableContent() {
        const targetKey = groupSelect.value;
        if (!targetKey) return;

        updateVideoLink(targetKey, currentMode);

        // 擴充項目分支：Structure Mode 的自定義獨立渲染
        if (currentMode === "structure") {
            val1Header.classList.remove("hidden");
            val2Header.classList.remove("hidden");

            val1Header.innerHTML = "Data Type";
            val1Header.className =
                "p-4 w-[15%] text-sm font-bold text-blue-400 border-r border-slate-700 text-center";

            val2Header.innerHTML = "Feature Prompt";
            val2Header.className =
                "p-4 w-[51%] text-sm font-bold text-purple-400 text-center rounded-tr-2xl";

            if (
                window.AppStructure &&
                window.AppStructure.renderStructureView
            ) {
                window.AppStructure.renderStructureView(targetKey);
            }
        }
        // 💯 完美原封不動：回歸 Compare Mode 的原廠表頭渲染與呼叫 3 參數機制
        else if (currentMode === "compare") {
            const files = compareGroupDescribe.filter(
                (g) => g.groupDisplayName === targetKey && g.fileName,
            );
            if (files.length >= 2) {
                const conf1 = files[0];
                const conf2 = files[1];

                val1Header.innerHTML = `${conf1.fileDisplayName} ${
                    conf1.video_url
                        ? `<a href="${conf1.video_url}" target="_blank" class="ml-1 text-blue-400 hover:text-blue-300">🔗</a>`
                        : ""
                }`;
                val2Header.classList.remove("hidden");

                // 完美恢復原廠 Compare 欄位寬度比例（33% : 33%）與樣式
                val1Header.className =
                    "p-4 w-[33%] text-sm font-bold text-blue-400 border-r border-slate-700 text-center";
                val2Header.className =
                    "p-4 w-[33%] text-sm font-bold text-purple-400 text-center rounded-tr-2xl";
                val2Header.innerHTML = `${conf2.fileDisplayName} ${
                    conf2.video_url
                        ? `<a href="${conf2.video_url}" target="_blank" class="ml-1 text-purple-400 hover:text-purple-300">🔗</a>`
                        : ""
                }`;

                // 修正：回歸原廠對接簽章，只傳入 3 個引數
                window.AppRenderer.renderTable(
                    conf1.url,
                    conf2.url,
                    conf1.structure_version,
                );
            }
        }
        // 💯 完美原封不動：還原 Single Mode 的原廠表頭渲染與呼叫 3 參數機制
        else {
            val2Header.classList.add("hidden");

            // 完美恢復原廠 Single 欄位寬度比例（L1~L5 佔 34%，實體分析數據值佔 66%）
            val1Header.className =
                "p-4 w-[66%] text-sm font-bold text-blue-400 border-slate-700 text-center rounded-tr-2xl";

            const conf = singleFileDescribe.find(
                (f) => f.fileName === targetKey,
            );
            if (conf) {
                val1Header.innerHTML = `${conf.fileDisplayName} ${
                    conf.video_url
                        ? `<a href="${conf.video_url}" target="_blank" class="ml-1 text-blue-400 hover:text-blue-300">🔗</a>`
                        : ""
                }`;

                // 修正：回歸原廠對接簽章，只傳入 3 個引數
                window.AppRenderer.renderTable(
                    conf.url,
                    null,
                    conf.structure_version,
                );
            }
        }
    }

    // 原有功能與影片連結控制（未變動）
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

        if (videoLinkEl) {
            if (videoUrl) {
                videoLinkEl.href = videoUrl;
                videoLinkEl.classList.remove("hidden");
            } else {
                videoLinkEl.classList.add("hidden");
            }
        }
    }

    initApp();
});
