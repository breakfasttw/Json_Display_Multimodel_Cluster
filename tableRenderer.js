/**
 * tableRenderer.js
 * 穩定版 L1~L5 遞迴展開：超過第 5 層的資料，將自動轉換為格式化字串顯示
 */
window.AppRenderer = {
    isObject: (val) =>
        val !== null && typeof val === "object" && !Array.isArray(val),

    formatValue: function (val) {
        if (val === undefined || val === null)
            return `<span class="text-slate-600">—</span>`;
        if (typeof val === "boolean") {
            return val
                ? `<span class="text-emerald-400 font-bold">YES</span>`
                : `<span class="text-rose-400 font-bold">NO</span>`;
        }
        if (Array.isArray(val)) {
            if (val.length === 0)
                return `<span class="text-slate-600">None</span>`;
            return val
                .map(
                    (v) =>
                        `<span class="inline-block bg-slate-800 border border-slate-700 rounded px-2 py-0.5 m-0.5 text-[10px] text-blue-200">${v}</span>`,
                )
                .join("");
        }
        if (typeof val === "object" && val !== null) {
            // 超過 L5 的物件，一律轉為有底色的 Code Block，避免前端解析崩潰
            return `<pre class="text-slate-300 text-[11px] bg-slate-800 p-2 rounded overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-700/50">${JSON.stringify(val, null, 2)}</pre>`;
        }
        return `<div class="text-slate-300">${val}</div>`;
    },

    renderTable: function (json1, json2, tableBody, annotationMap = {}) {
        tableBody.innerHTML = "";
        const isSingle = json2 === null;

        const addRow = (
            l1,
            l2,
            l3,
            l4,
            l5,
            val1,
            val2,
            isFirstInGroup,
            fullPath,
        ) => {
            const tr = document.createElement("tr");
            tr.className =
                "border-b border-slate-800/50 hover:bg-slate-700/50 transition-colors";

            const hint = annotationMap[fullPath] || "";

            // 決定 Tooltip 要綁定在哪一層
            let cellToAnnotate = "l5";
            if (l5 === "-") cellToAnnotate = "l4";
            if (l5 === "-" && l4 === "-") cellToAnnotate = "l3";
            if (l5 === "-" && l4 === "-" && l3 === "-") cellToAnnotate = "l2";
            if (l5 === "-" && l4 === "-" && l3 === "-" && l2 === "-")
                cellToAnnotate = "l1";

            const wrapWithTooltip = (text) => {
                if (!hint || text === "-") return text;
                return `
                <div class="relative group inline-block">
                    <span class="border-b border-dashed border-slate-500 cursor-help hover:text-blue-300 transition-colors">${text}</span>
                    <div class="invisible group-hover:visible absolute left-0 top-full w-72 max-h-60 overflow-y-auto bg-slate-800 text-yellow-200 text-[12px] p-3 rounded-lg border border-slate-600 shadow-2xl z-50 whitespace-pre-line leading-normal">
                        ${hint}
                    </div>
                </div>`;
            };

            tr.innerHTML = `
                <td class="p-4 border-r border-slate-800 font-bold text-blue-300/80 text-[12px] w-[6.8%]">
                    ${isFirstInGroup ? (cellToAnnotate === "l1" ? wrapWithTooltip(l1) : l1) : ""}
                </td>
                <td class="p-4 border-r border-slate-800 text-slate-200 text-[12px] w-[6.8%]">
                    ${cellToAnnotate === "l2" ? wrapWithTooltip(l2) : l2}
                </td>
                <td class="p-4 border-r border-slate-800 text-slate-200 text-[12px] w-[6.8%]">
                    ${cellToAnnotate === "l3" ? wrapWithTooltip(l3) : l3}
                </td>
                <td class="p-4 border-r border-slate-800 text-slate-200 text-[12px] w-[6.8%]">
                    ${cellToAnnotate === "l4" ? wrapWithTooltip(l4) : l4}
                </td>
                <td class="p-4 border-r border-slate-800 text-slate-100 text-[12px] font-semibold w-[6.8%]">
                    ${cellToAnnotate === "l5" ? wrapWithTooltip(l5) : l5}
                </td>
                <td class="p-4 ${isSingle ? "" : "border-r"} border-slate-800 text-sm leading-relaxed ${isSingle ? "w-[66%]" : "w-[33%]"}">
                    ${this.formatValue(val1)}
                </td>
                ${
                    isSingle
                        ? ""
                        : `
                <td class="p-4 text-sm leading-relaxed w-[33%]">
                    ${this.formatValue(val2)}
                </td>
                `
                }
            `;
            tableBody.appendChild(tr);
        };

        const getKeys = (obj1, obj2) => [
            ...new Set([
                ...Object.keys(obj1 || {}),
                ...Object.keys(obj2 || {}),
            ]),
        ];

        // 展開 L1
        getKeys(json1, json2).forEach((l1) => {
            const j1L1 = json1?.[l1];
            const j2L1 = json2?.[l1];

            if (!this.isObject(j1L1) && !this.isObject(j2L1)) {
                addRow(l1, "-", "-", "-", "-", j1L1, j2L1, true, l1);
                return;
            }

            // 展開 L2
            getKeys(j1L1, j2L1).forEach((l2, l2Idx) => {
                const j1L2 = j1L1?.[l2];
                const j2L2 = j2L1?.[l2];

                if (!this.isObject(j1L2) && !this.isObject(j2L2)) {
                    addRow(
                        l1,
                        l2,
                        "-",
                        "-",
                        "-",
                        j1L2,
                        j2L2,
                        l2Idx === 0,
                        `${l1}.${l2}`,
                    );
                    return;
                }

                // 展開 L3
                getKeys(j1L2, j2L2).forEach((l3, l3Idx) => {
                    const j1L3 = j1L2?.[l3];
                    const j2L3 = j2L2?.[l3];

                    if (!this.isObject(j1L3) && !this.isObject(j2L3)) {
                        const isFirst = l2Idx === 0 && l3Idx === 0;
                        addRow(
                            l1,
                            l2,
                            l3,
                            "-",
                            "-",
                            j1L3,
                            j2L3,
                            isFirst,
                            `${l1}.${l2}.${l3}`,
                        );
                        return;
                    }

                    // 展開 L4
                    getKeys(j1L3, j2L3).forEach((l4, l4Idx) => {
                        const j1L4 = j1L3?.[l4];
                        const j2L4 = j2L3?.[l4];

                        if (!this.isObject(j1L4) && !this.isObject(j2L4)) {
                            const isFirst =
                                l2Idx === 0 && l3Idx === 0 && l4Idx === 0;
                            addRow(
                                l1,
                                l2,
                                l3,
                                l4,
                                "-",
                                j1L4,
                                j2L4,
                                isFirst,
                                `${l1}.${l2}.${l3}.${l4}`,
                            );
                            return;
                        }

                        // 展開 L5
                        getKeys(j1L4, j2L4).forEach((l5, l5Idx) => {
                            const j1L5 = j1L4?.[l5];
                            const j2L5 = j2L4?.[l5];
                            const isFirst =
                                l2Idx === 0 &&
                                l3Idx === 0 &&
                                l4Idx === 0 &&
                                l5Idx === 0;
                            addRow(
                                l1,
                                l2,
                                l3,
                                l4,
                                l5,
                                j1L5,
                                j2L5,
                                isFirst,
                                `${l1}.${l2}.${l3}.${l4}.${l5}`,
                            );
                        });
                    });
                });
            });
        });
    },
};
