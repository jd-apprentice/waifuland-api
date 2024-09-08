import globals from "globals";
import pluginJs from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import eslintConfigPrettier from "eslint-config-prettier";
import estlingPluginSecurity from "eslint-plugin-security";

export default [
	{
		languageOptions: { globals: globals.node },
	},
	{
		"plugins": {
			sonarjs,
			pluginJs,
			eslintConfigPrettier,
			estlingPluginSecurity
		}
	}
];