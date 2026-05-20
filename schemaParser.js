/**
 * schemaParser.js
 * 支援多版本結構檔：根據傳入的檔名，動態向 ./data/structure/ 請求解析
 */
window.AppSchema = {
    cache: {}, // 利用快取避免重複載入同一個結構檔

    async loadSchema(versionName) {
        if (!versionName) return {};
        // 如果已經載入過該版本，直接回傳快取結果
        if (this.cache[versionName]) return this.cache[versionName];

        try {
            const response = await fetch(`./data/structure/${versionName}`);
            const text = await response.text();
            const lines = text.split("\n");

            let pathStack = [];
            const commentRegex = /\/\/ (.*)/;
            const keyRegex = /"([^"]+)"/;
            let annotationMap = {};

            lines.forEach((line) => {
                const keyMatch = line.match(keyRegex);
                const commentMatch = line.match(commentRegex);

                if (line.includes("{") && keyMatch) {
                    pathStack.push(keyMatch[1]);
                }

                if (keyMatch && commentMatch) {
                    const currentKey = keyMatch[1];
                    const comment = commentMatch[1].trim();

                    let fullPathArray = [...pathStack];
                    if (!line.includes("{")) {
                        fullPathArray.push(currentKey);
                    }

                    const depth = fullPathArray.length;
                    if (depth <= 5) {
                        const keyPath = fullPathArray.join(".");
                        annotationMap[keyPath] = comment;
                    } else {
                        const fifthLevelPath = fullPathArray
                            .slice(0, 5)
                            .join(".");
                        if (!annotationMap[fifthLevelPath]) {
                            annotationMap[fifthLevelPath] = comment;
                        } else {
                            if (
                                !annotationMap[fifthLevelPath].includes(comment)
                            ) {
                                annotationMap[fifthLevelPath] +=
                                    `\n\n${comment}`;
                            }
                        }
                    }
                }

                if (line.includes("}")) {
                    pathStack.pop();
                }
            });

            this.cache[versionName] = annotationMap;
            console.log(`成功載入結構檔: ${versionName}`);
            return annotationMap;
        } catch (err) {
            console.warn(`無法載入結構檔 ./data/structure/${versionName}`, err);
            return {};
        }
    },
};
