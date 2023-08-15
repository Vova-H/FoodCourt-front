module.exports = {
    expo: {
        name: "foodcourt",
        slug: "foodcourt",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        assetBundlePatterns: [
            "**/*"
        ],
        ios: {
            supportsTablet: true,
            bundleIdentifier: "FoodCourt"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            package: "foodCourt.apk"
        },
        web: {
            favicon: "./assets/favicon.png"
        },
        plugins: [
            "expo-localization"
        ],
        extra: {
            eas: {
                projectId: "f7dba921-1ea2-4e49-a0fa-7e577414f571"
            }
        }
    }
};
