const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const configDefault = (() => {
	const config = getDefaultConfig(__dirname);
	const { transformer, resolver } = config;
	config.transformer.minifierPath = require.resolve("metro-minify-esbuild");
	config.transformer.minifierConfig = {
		compress: {
			// The option below removes all console logs statements in production.
			drop: ["console"],
		},
	};

	config.transformer = {
		...transformer,
		babelTransformerPath: require.resolve("react-native-svg-transformer"),
	};
	config.resolver = {
		...resolver,
		assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
		sourceExts: [...resolver.sourceExts, "svg"],
	};

	return config;
})();

module.exports = withNativeWind(configDefault, {
	input: "./global.css",
	inlineRem: 16,
});
