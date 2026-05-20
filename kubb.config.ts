import { defineConfig, type UserConfig } from "@kubb/core";
import { type Include, pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";

export const config = () => {
	const SwaggerUrls = {
		coreService: "https://safalife-api.achmdndy.dev/core/swagger/doc.json",
	} as const;

	type ServiceKey = keyof typeof SwaggerUrls;

	const serviceConfigs: Record<
		ServiceKey,
		{
			include?: Include[];
			clientImportPath: string;
		}
	> = {
		coreService: {
			clientImportPath: "@/configs/core-service-instance",
		},
	};

	const results: UserConfig[] = (
		Object.entries(SwaggerUrls) as [ServiceKey, string][]
	).map(([key, url]) => {
		const service = serviceConfigs[key];

		return {
			root: ".",
			input: {
				path: url,
			},
			output: {
				path: `./api/${key}`,
				clean: true,
			},
			plugins: [
				pluginOas({
					validate: true,
				}),
				pluginTs({
					output: {
						path: "./types",
					},
					include: service.include,
				}),
				pluginZod({
					output: {
						path: "./zod",
					},
					group: { type: "tag", name: ({ group }) => `${group}Schemas` },
					typed: true,
					dateType: "stringOffset",
					unknownType: "unknown",
					importPath: "zod",
					include: service.include,
				}),
				pluginReactQuery({
					client: {
						importPath: service.clientImportPath,
						dataReturnType: "data",
					},
					transformers: {
						name: (name, type) => {
							if (type === "function" || type === "file") {
								return `${name}Hook`;
							}
							return name;
						},
					},
					output: {
						path: "./hooks",
					},
					group: {
						type: "tag",
					},
					infinite: {
						queryParam: "pageNumber",
					},
					mutation: {
						methods: ["post", "put", "delete"],
					},
					suspense: false,
					include: service.include,
				}),
			],
		};
	});

	return results;
};

export default defineConfig(config());