import globals from "globals";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import estlingPluginSecurity from "eslint-plugin-security";

export default [
	{
		ignores: [
			'__tests__',
			'dist',
			'docs',
			'lib',
			// Files
			'**/*.md',
		],
	},
	js.configs.all,
	estlingPluginSecurity.configs.recommended,
	eslintConfigPrettier.rules,
	{
		rules: {
			'array-callback-return': ['error'],
			'block-scoped-var': ['error'],
			'curly': ['error'],
			'dot-notation': ['error'],
			'eqeqeq': ['error'],
			'no-implicit-coercion': ['error', { boolean: false }],
			'no-implicit-globals': ['error'],
			'no-loop-func': ['error'],
			'no-return-assign': ['error'],
			'no-template-curly-in-string': ['error'],
			'no-unneeded-ternary': ['error'],
			'no-unused-vars': ['error', { args: 'none' }],
			'no-useless-computed-key': ['error'],
			'no-useless-return': ['error'],
			'no-var': ['error'],
			'prefer-const': [
				'error',
				{
					destructuring: 'all',
				},
			],
		},
	},
	{
		languageOptions: { globals: globals.node },
	},
];