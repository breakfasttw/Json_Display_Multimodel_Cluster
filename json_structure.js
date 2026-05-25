/**
 * json_structure.js
 * 擴充功能：解析並展示 JSON 結構的 L1~L5 階層、資料型態與欄位說明註解
 * 修正項目：優化路徑堆疊管理，完美實作父類別 L1~L5 100% 全量填充
 */
window.AppStructure = {
    async renderStructureView(versionName) {
        const tableBody = document.getElementById("tableBody");
        if (!tableBody) return;

        tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500 animate-pulse">結構檔載入中...</td></tr>`;

        if (!versionName) {
            tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500">未指定結構檔版本</td></tr>`;
            return;
        }

        try {
            const response = await fetch(`./data/structure/${versionName}`);
            if (!response.ok) throw new Error(`無法讀取檔案: ${versionName}`);
            const text = await response.text();
            const lines = text.split("\n");

            let pathStack = [];
            const commentRegex = /\/\/ (.*)/;
            const keyRegex = /"([^"]+)"/;
            let rowsToRender = [];

            lines.forEach((line) => {
                const keyMatch = line.match(keyRegex);
                const commentMatch = commentRegex.test(line)
                    ? line.match(commentRegex)
                    : null;

                // 1. 遇到開頭大括號，代表進入更深一層的父結構層級
                if (line.includes("{") && keyMatch) {
                    pathStack.push(keyMatch[1]);
                }

                // 2. 如果是葉子特徵節點 (不包含開頭大括號，且有真實欄位鍵值)
                if (keyMatch && !line.includes("{")) {
                    const currentKey = keyMatch[1];
                    const comment = commentMatch ? commentMatch[1].trim() : "";

                    // 核心修正：動態補全當前節點的完整路徑鏈結
                    let fullPathArray = [...pathStack, currentKey];

                    // 精準指派至 L1 ~ L5 的獨立位置
                    const l1 = fullPathArray[0] || "";
                    const l2 = fullPathArray[1] || "";
                    const l3 = fullPathArray[2] || "";
                    const l4 = fullPathArray[3] || "";
                    const l5 = fullPathArray[4] || "";

                    // 精確截取冒號後方的真實內容來判定資料型別
                    const colonIndex = line.indexOf(":");
                    let dataType = "String"; // 預設型態

                    if (colonIndex !== -1) {
                        const afterColon = line.substring(colonIndex + 1);
                        const valuePart = afterColon
                            .split("//")[0]
                            .trim()
                            .toLowerCase();

                        if (
                            valuePart.includes("boolean") ||
                            valuePart.startsWith("true") ||
                            valuePart.startsWith("false")
                        ) {
                            dataType = "Boolean";
                        } else if (
                            valuePart.includes("number") ||
                            valuePart.includes("int") ||
                            /^[0-9]/.test(valuePart)
                        ) {
                            dataType = "Number";
                        } else if (
                            valuePart.startsWith("[") ||
                            valuePart.includes("array") ||
                            valuePart.includes("list")
                        ) {
                            dataType = "Array";
                        } else if (valuePart.includes("string")) {
                            dataType = "String";
                        }
                    }

                    rowsToRender.push({
                        l1,
                        l2,
                        l3,
                        l4,
                        l5,
                        dataType,
                        featurePrompt: comment,
                    });
                }

                // 3. 遇到結尾大括號，回退退出一層父結構
                if (line.includes("}")) {
                    pathStack.pop();
                }
            });

            // 開始渲染表格
            tableBody.innerHTML = "";
            if (rowsToRender.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-slate-500">無可展示的結構欄位</td></tr>`;
                return;
            }

            let prevL1 = "",
                prevL2 = "",
                prevL3 = "",
                prevL4 = "",
                prevL5 = "";

            rowsToRender.forEach((row, index) => {
                // 鏈式從屬判定邏輯
                const isL1Same = row.l1 === prevL1;
                const isL2Same = isL1Same && row.l2 === prevL2;
                const isL3Same = isL2Same && row.l3 === prevL3;
                const isL4Same = isL3Same && row.l4 === prevL4;
                const isL5Same = isL4Same && row.l5 === prevL5;

                prevL1 = row.l1;
                prevL2 = row.l2;
                prevL3 = row.l3;
                prevL4 = row.l4;
                prevL5 = row.l5;

                // 填充樣式：保證欄位名稱全部看得到，但重複的父分類會被轉為細字淡化
                const classL1 = isL1Same
                    ? "text-slate-300/70 font-normal select-none"
                    : "text-amber-500 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]";
                const classL2 = isL2Same
                    ? "text-slate-300/70 font-normal select-none"
                    : "text-sky-400 font-bold";
                const classL3 = isL3Same
                    ? "text-slate-300/70 font-normal select-none"
                    : "text-indigo-400 font-bold";
                const classL4 = isL4Same
                    ? "text-slate-300/70 font-normal select-none"
                    : "text-purple-400 font-bold";
                const classL5 = isL5Same
                    ? "text-slate-300/70 font-normal select-none"
                    : "text-pink-400 font-bold";

                // 大模態區塊線切分樣式
                let trBorderClass = "border-b border-slate-800/60";
                if (index > 0) {
                    if (!isL1Same) {
                        trBorderClass +=
                            " border-t-2 border-slate-600 bg-slate-900/20";
                    } else if (!isL2Same) {
                        trBorderClass +=
                            " border-t border-slate-700/80 bg-slate-900/5";
                    }
                }

                let typeColor = "text-blue-400";
                if (row.dataType === "Number") typeColor = "text-amber-400";
                if (row.dataType === "Boolean") typeColor = "text-emerald-400";
                if (row.dataType === "Array") typeColor = "text-purple-400";

                const tr = document.createElement("tr");
                tr.className = `${trBorderClass} hover:bg-slate-800/40 transition-colors`;
                tr.innerHTML = `
                    <td class="p-3 w-[6.8%] text-[11px] text-center border-r border-slate-800/40 ${classL1}">${row.l1}</td>
                    <td class="p-3 w-[6.8%] text-[11px] text-center border-r border-slate-800/40 ${classL2}">${row.l2 || '<span class="text-slate-700">—</span>'}</td>
                    <td class="p-3 w-[6.8%] text-[12x] text-center border-r border-slate-800/40 ${classL3}">${row.l3 || '<span class="text-slate-700">—</span>'}</td>
                    <td class="p-3 w-[6.8%] text-[12x] text-center border-r border-slate-800/40 ${classL4}">${row.l4 || '<span class="text-slate-700">—</span>'}</td>
                    <td class="p-3 w-[6.8%] text-[12px] text-center border-r border-slate-800/40 ${classL5}">${row.l5 || '<span class="text-slate-700">—</span>'}</td>
                    <td class="p-3 w-[15%] text-xs font-bold text-center border-r border-slate-800/40 ${typeColor}">${row.dataType}</td>
                    <td class="p-3 w-[51%] text-sm text-slate-300 font-normal whitespace-pre-wrap leading-relaxed text-left">${row.featurePrompt || '<span class="text-slate-700">—</span>'}</td>
                `;
                tableBody.appendChild(tr);
            });
        } catch (err) {
            console.warn("結構檔渲染出錯:", err);
            tableBody.innerHTML = `<tr><td colspan="7" class="p-8 text-center text-rose-400">結構檔載入失敗: ${err.message}</td></tr>`;
        }
    },
};
