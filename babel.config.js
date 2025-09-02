module.exports = (api) => {
	api.cache(true);

	const env = process.env.NODE_ENV || "local";
	const envFileMap = {
		production: ".env.production",
		development: ".env.development",
		test: ".env.test",
		local: ".env.local",
	};

	return {
		presets: [
			["babel-preset-expo", { jsxImportSource: "nativewind" }],
			"nativewind/babel",
		],
		plugins: [
			[
				"module:react-native-dotenv",
				{
					moduleName: "@env",
					path: envFileMap[env],
					blacklist: null,
					whitelist: null,
					safe: false,
					allowUndefined: true,
				},
			],
		],
	};
};
