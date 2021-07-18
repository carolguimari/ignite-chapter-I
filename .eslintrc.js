module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	rules: {
		'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
		'no-console': 0,
		indent: ['error', 'tab'],
		'no-tabs': [2, { allowIndentationTabs: true }],
		'prettier/prettier': ['error'],
	},
};
