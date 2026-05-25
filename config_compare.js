// Compare 模式的群組設定
const compareGroupDescribe = [
    // {
    //     groupName: "0_shufen",
    //     groupDisplayName: "0_shufen",
    //     videoUrl: "",
    //     enable: true,
    // },
    // {
    //     groupName: "3ctim",
    //     groupDisplayName: "3ctim-3C有意思",
    //     videoUrl: "",
    //     enable: true,
    // },
    // {
    //     groupName: "2uncle987_v7e",
    //     groupDisplayName: "2uncle987_二伯",
    //     videoUrl: "",
    //     enable: true,
    // },
    // {
    //     groupName: "yga0721",
    //     groupDisplayName: "yga0721",
    //     videoUrl: "",
    //     enable: true,
    // },
    // {
    //     groupName: "achusan0817",
    //     groupDisplayName: "achusan0817-阿啾小劇場",
    //     videoUrl: "",
    //     enable: true,
    // },
    {
        groupName: "悲傷 (有 bgm) vs 興奮 (人群嘈雜，無 bgm)",
        groupDisplayName: "悲傷 (有 bgm) vs 興奮 (人群嘈雜，無 bgm)",
        videoUrl: "",
        enable: true,
    },

    {
        groupName: "語速慢 vs 語速快",
        groupDisplayName: "語速慢 vs 語速快",
        videoUrl: "",
        enable: true,
    },

    {
        groupName: "憂傷 vs 激昂",
        groupDisplayName: "憂傷 vs 激昂",
        videoUrl: "",
        enable: true,
    },

    {
        groupName: "室內純樂器演奏 vs 室外激昂群眾嘶吼",
        groupDisplayName: "室內純樂器演奏 vs 室外激昂群眾嘶吼",
        videoUrl: "",
        enable: true,
    },

    {
        groupName: "Joeman-輕快動感敘述旅遊 vs 吳斐莉-和緩敘述旅遊",
        groupDisplayName: "Joeman-輕快動感敘述旅遊 vs 吳斐莉-和緩敘述旅遊",
        videoUrl: "",
        enable: true,
    },

    {
        groupName: "阿滴-輕快bgm逛校園 vs 肉比頭 - 和緩bgm旅遊",
        groupDisplayName: "阿滴-輕快bgm逛校園 vs 肉比頭 - 和緩bgm旅遊",
        videoUrl: "",
        enable: true,
    },

    {
        groupName: "純 K-POP 舞蹈無人聲 vs 純人聲無BGM 2D 圖文",
        groupDisplayName: "純 K-POP 舞蹈無人聲 vs 純人聲無BGM 2D 圖文",
        videoUrl: "",
        enable: true,
    },

    {
        groupName: "歡樂幫小孩慶生 vs 虔誠媽祖繞境",
        groupDisplayName: "歡樂幫小孩慶生 vs 虔誠媽祖繞境",
        videoUrl: "",
        enable: true,
    },
];

// Compare 模式的檔案設定 (已移除 model 欄位)
const compareFileDescribe = [
    // {
    //     fileName: "0_shufen-20250902190256-1774419209918701.json",
    //     fileDisplayName: "0_shufen1",
    //     groupDisplayName: "0_shufen",
    //     url: "./data/compare/0_shufen-20250902190256-1774419209918701.json",
    //     video_url: "",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "0_shufen-20250903140356-1918596815532232.json",
    //     fileDisplayName: "0_shufen2",
    //     groupDisplayName: "0_shufen",
    //     url: "./data/compare/0_shufen-20250903140356-1918596815532232.json",
    //     video_url: "",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "3ctim-20250218131707-1573856370549552.json",
    //     fileDisplayName: "蘋果紅包",
    //     groupDisplayName: "3ctim-3C有意思",
    //     url: "./data/compare/3ctim-20250218131707-1573856370549552.json",
    //     video_url: "https://www.instagram.com/reels/DFUnpOeTanI/",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "3ctim-20250218131707-1986947205572402.json",
    //     fileDisplayName: "介紹 Dyson 耳機",
    //     groupDisplayName: "3ctim-3C有意思",
    //     url: "./data/compare/3ctim-20250218131707-1986947205572402.json",
    //     video_url: "https://www.instagram.com/reel/DGDDATOv65A/",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "2uncle987-20250324075334-1286548589951164.json",
    //     fileDisplayName: "HaHaBaby新竹巨城",
    //     groupDisplayName: "2uncle987_二伯",
    //     url: "./data/compare/2uncle987-20250324075334-1286548589951164.json",
    //     video_url: "https://www.instagram.com/reel/DHVmP70vZRa/",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "2uncle987-20250628195039-1911215139504147.json",
    //     fileDisplayName: "日本富士山飯店介紹",
    //     groupDisplayName: "2uncle987_二伯",
    //     url: "./data/compare/2uncle987-20250628195039-1911215139504147.json",
    //     video_url: "https://www.youtube.com/shorts/bqF93NIpJqU",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "yga0721-20250913013718-1208344100967893.json",
    //     fileDisplayName: "yga0721 - 檔案1",
    //     groupDisplayName: "yga0721",
    //     url: "./data/compare/yga0721-20250913013718-1208344100967893.json",
    //     video_url: "",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "yga0721-20250731003224-2306346656531665.json",
    //     fileDisplayName: "yga0721 - 檔案2",
    //     groupDisplayName: "yga0721",
    //     url: "./data/compare/yga0721-20250731003224-2306346656531665.json",
    //     video_url: "",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "achusan0817-20250802181312-1930533867546917.json",
    //     fileDisplayName: "Line貼圖上架啦",
    //     groupDisplayName: "achusan0817-阿啾小劇場",
    //     url: "./data/compare/achusan0817-20250802181312-1930533867546917.json",
    //     video_url: "https://www.youtube.com/shorts/A17KAkB0REI",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "achusan0817-20250522071346-1427164119064164.json",
    //     fileDisplayName: "雅婷的生日",
    //     groupDisplayName: "achusan0817-阿啾小劇場",
    //     url: "./data/compare/achusan0817-20250522071346-1427164119064164.json",
    //     video_url: "https://www.instagram.com/reels/DFRcyYNTMct/",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "5inana-20250508064327-1231918062400462.json",
    //     fileDisplayName: "5inana - 檔案1",
    //     groupDisplayName: "5inana",
    //     url: "./data/compare/5inana-20250508064327-1231918062400462.json",
    //     video_url: "",
    //     structure_version: "json_structure_01.json",
    // },
    // {
    //     fileName: "5inana-20250701123040-937232652216330.json",
    //     fileDisplayName: "5inana - 檔案2",
    //     groupDisplayName: "5inana",
    //     url: "./data/compare/5inana-20250701123040-937232652216330.json",
    //     video_url: "",
    //     structure_version: "json_structure_01.json",
    // },
    {
        fileName: "悲傷樂樂-v13.json",
        fileDisplayName: "悲傷樂樂-v13.json",
        groupDisplayName: "悲傷 (有 bgm) vs 興奮 (人群嘈雜，無 bgm)",
        url: "./data/single/悲傷樂樂-v13.json",
        video_url: "https://www.instagram.com/p/DDZQSK8SqBA/",
        structure_version: "json_structure_13.json",
    },

    {
        fileName: "北科大蔡英文尖叫-v13.json",
        fileDisplayName: "北科大蔡英文尖叫-v13.json",
        groupDisplayName: "悲傷 (有 bgm) vs 興奮 (人群嘈雜，無 bgm)",
        url: "./data/single/北科大蔡英文尖叫-v13.json",
        video_url: "https://www.instagram.com/p/DYoU-jeAMy2/",
        structure_version: "json_structure_13.json",
    },

    {
        fileName: "好累沙龍-v13.json",
        fileDisplayName: "好累沙龍-v13.json",
        groupDisplayName: "語速慢 vs 語速快",
        url: "./data/single/好累沙龍-v13.json",
        video_url: "https://www.instagram.com/p/C6iul7mRZOw/",
        structure_version: "json_structure_13.json",
    },

    {
        fileName: "語速快上班族-v13.json",
        fileDisplayName: "語速快上班族-v13.json",
        groupDisplayName: "語速慢 vs 語速快",
        url: "./data/single/語速快上班族-v13.json",
        video_url: "https://www.instagram.com/p/DVgO90wDxWk/",
        structure_version: "json_structure_13.json",
    },

    {
        fileName: "憂傷醫生-v13.json",
        fileDisplayName: "憂傷醫生-v13.json",
        groupDisplayName: "憂傷 vs 激昂",
        url: "./data/single/憂傷醫生-v13.json",
        video_url: "https://www.instagram.com/p/C5ivvOXPhpR/",
        structure_version: "json_structure_13.json",
    },

    {
        fileName: "激昂小粉絲與偶像-v13.json",
        fileDisplayName: "激昂小粉絲與偶像-v13.json",
        groupDisplayName: "憂傷 vs 激昂",
        url: "./data/single/激昂小粉絲與偶像-v13.json",
        video_url: "https://www.instagram.com/p/C2MXl37PWU0/",
        structure_version: "json_structure_13.json",
    },

    {
        fileName: "多種樂器-v13.json",
        fileDisplayName: "多種樂器-v13.json",
        groupDisplayName: "室內純樂器演奏 vs 室外激昂群眾嘶吼",
        url: "./data/single/多種樂器-v13.json",
        video_url: "",
        structure_version: "json_structure_13.json",
    },
    {
        fileName: "中國群眾激昂-v13.json",
        fileDisplayName: "中國群眾激昂-v13.json",
        groupDisplayName: "室內純樂器演奏 vs 室外激昂群眾嘶吼",
        url: "./data/single/中國群眾激昂-v13.json",
        video_url: "https://www.instagram.com/p/DX_aWtPxu9d/",
        structure_version: "json_structure_13.json",
    },

    {
        fileName: "joemanweng-20251128120717-1943369030398032-v14.json",
        fileDisplayName: "joemanweng-20251128120717-1943369030398032-v14.json",
        groupDisplayName: "Joeman-輕快動感敘述旅遊 vs 吳斐莉-和緩敘述旅遊",
        url: "./data/single/joemanweng-20251128120717-1943369030398032-v14.json",
        video_url: "https://www.instagram.com/reel/DRebfF7iVoe",
        structure_version: "json_structure_14.json",
    },
    {
        fileName: "wufeili-20250709125850-26299444203001810-v14.json",
        fileDisplayName: "wufeili-20250709125850-26299444203001810-v14.json",
        groupDisplayName: "Joeman-輕快動感敘述旅遊 vs 吳斐莉-和緩敘述旅遊",
        url: "./data/single/wufeili-20250709125850-26299444203001810-v14.json",
        video_url: "https://www.instagram.com/reel/DLfLXlrykQe",
        structure_version: "json_structure_14.json",
    },

    {
        fileName: "rayduenglish-20250804150549-1559856595225419-v14.json",
        fileDisplayName:
            "rayduenglish-20250804150549-1559856595225419-v14.json",
        groupDisplayName: "阿滴-輕快bgm逛校園 vs 肉比頭 - 和緩bgm旅遊",
        url: "./data/single/rayduenglish-20250804150549-1559856595225419-v14.json",
        video_url: "https://www.instagram.com/reel/DH-GKiygHyU",
        structure_version: "json_structure_14.json",
    },
    {
        fileName: "zoebitalk-20250101212122-1966008960997105-v14.json",
        fileDisplayName: "zoebitalk-20250101212122-1966008960997105-v14.json",
        groupDisplayName: "阿滴-輕快bgm逛校園 vs 肉比頭 - 和緩bgm旅遊",
        url: "./data/single/zoebitalk-20250101212122-1966008960997105-v14.json",
        video_url: "https://www.instagram.com/reel/DER2K4QpHfe",
        structure_version: "json_structure_14.json",
    },

    {
        fileName: "walkerdad1228-20250923040624-25870566612599789-v14.json",
        fileDisplayName:
            "walkerdad1228-20250923040624-25870566612599789-v14.json",
        groupDisplayName: "純 K-POP 舞蹈無人聲 vs 純人聲無BGM 2D 圖文",
        url: "./data/single/walkerdad1228-20250923040624-25870566612599789-v14.json",
        video_url: "https://www.instagram.com/reel/DGKAqzdsl-k",
        structure_version: "json_structure_14.json",
    },
    {
        fileName: "chuchumei__-20250805105548-1276250431031515-v14.json",
        fileDisplayName: "chuchumei__-20250805105548-1276250431031515-v14.json",
        groupDisplayName: "純 K-POP 舞蹈無人聲 vs 純人聲無BGM 2D 圖文",
        url: "./data/single/chuchumei__-20250805105548-1276250431031515-v14.json",
        video_url: "https://www.instagram.com/reel/DGKAqzdsl-k",
        structure_version: "json_structure_14.json",
    },

    {
        fileName: "wia627-20250212084030-1642331380410258-v14.json",
        fileDisplayName: "wia627-20250212084030-1642331380410258-v14.json",
        groupDisplayName: "歡樂幫小孩慶生 vs 虔誠媽祖繞境",
        url: "./data/single/wia627-20250212084030-1642331380410258-v14.json",
        video_url: "https://www.instagram.com/reel/DFQbT3mzwSA",
        structure_version: "json_structure_14.json",
    },
    {
        fileName: "20141010hero-20250730221253-1464377325322334-v14.json",
        fileDisplayName:
            "20141010hero-20250730221253-1464377325322334-v14.json",
        groupDisplayName: "歡樂幫小孩慶生 vs 虔誠媽祖繞境",
        url: "./data/single/20141010hero-20250730221253-1464377325322334-v14.json",
        video_url: "https://www.instagram.com/reel/DJQjELQvXYu",
        structure_version: "json_structure_14.json",
    },
];

// {
//     groupName: "Joeman-輕快動感敘述旅遊 vs 吳斐莉-和緩敘述旅遊",
//     groupDisplayName: "Joeman-輕快動感敘述旅遊 vs 吳斐莉-和緩敘述旅遊",
//     videoUrl: "",
//     enable: true,
// },

// {
//     groupName: "阿滴-輕快無bgm逛校園 vs 肉比頭 - 和緩有bgm旅遊",
//     groupDisplayName: "阿滴-輕快無bgm逛校園 vs 肉比頭 - 和緩有bgm旅遊",
//     videoUrl: "",
//     enable: true,
// },

// {
//     groupName: "純 K-POP 舞蹈無人聲 vs 純人聲無BGM 2D 圖文",
//     groupDisplayName: "純 K-POP 舞蹈無人聲 vs 純人聲無BGM 2D 圖文",
//     videoUrl: "",
//     enable: true,
// },

// {
//     groupName: "歡樂幫小孩慶生 vs 虔誠媽祖繞境",
//     groupDisplayName: "歡樂幫小孩慶生 vs 虔誠媽祖繞境",
//     videoUrl: "",
//     enable: true,
// },
