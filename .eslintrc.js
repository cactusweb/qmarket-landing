module.exports = {
	root: true,
	plugins: ['import'],
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: ['tsconfig.*?.json', 'e2e/tsconfig.json'],
				createDefaultProgram: true,
			},
			extends: [
				'plugin:@angular-eslint/recommended',
				'plugin:@angular-eslint/template/process-inline-templates',
				'airbnb-typescript/base',
				'prettier',
				'plugin:prettier/recommended',
			],
			rules: {
				'prettier/prettier': [
					'error',
					{
						endOfLine: 'auto',
					},
				],
				'@angular-eslint/component-class-suffix': 'error',
				'@angular-eslint/component-selector': [
					'error',
					{
						type: 'element',
						prefix: 'sfo',
						style: 'kebab-case',
					},
				],
				'@angular-eslint/contextual-lifecycle': 'error',
				'@angular-eslint/directive-class-suffix': 'error',
				'@angular-eslint/directive-selector': [
					'error',
					{
						type: 'attribute',
						prefix: 'camelCase',
					},
				],
				'@angular-eslint/no-input-rename': 'error',
				'@angular-eslint/no-output-on-prefix': 'error',
				'@angular-eslint/no-output-rename': 'error',
				'@angular-eslint/use-pipe-transform-interface': 'error',
				'@typescript-eslint/consistent-type-definitions': 'error',
				'@typescript-eslint/dot-notation': 'off',
				'@typescript-eslint/explicit-member-accessibility': [
					'off',
					{
						accessibility: 'explicit',
					},
				],
				'@typescript-eslint/indent': 'off',
				'@typescript-eslint/member-delimiter-style': [
					'error',
					{
						multiline: {
							delimiter: 'semi',
							requireLast: true,
						},
						singleline: {
							delimiter: 'semi',
							requireLast: false,
						},
					},
				],
				'@typescript-eslint/member-ordering': 'error',
				'@typescript-eslint/naming-convention': [
					'error',
					{ selector: 'enum', format: ['PascalCase'] },
					{ selector: 'enumMember', format: ['UPPER_CASE'] },
				],
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				'@typescript-eslint/no-empty-interface': 'error',
				'@typescript-eslint/no-inferrable-types': [
					'error',
					{
						ignoreParameters: true,
					},
				],
				'@typescript-eslint/no-misused-new': 'error',
				'@typescript-eslint/no-shadow': [
					'error',
					{
						hoist: 'all',
					},
				],
				'@typescript-eslint/no-unused-expressions': 'error',
				'@typescript-eslint/prefer-function-type': 'error',
				'@typescript-eslint/quotes': 'off',
				'@typescript-eslint/semi': ['error', 'always'],
				'@typescript-eslint/type-annotation-spacing': 'error',
				'@typescript-eslint/unified-signatures': 'error',
				'arrow-body-style': 'error',
				'brace-style': 'off',
				'constructor-super': 'error',
				curly: 'error',
				'dot-notation': 'off',
				'eol-last': 'error',
				eqeqeq: ['error', 'smart'],
				'guard-for-in': 'error',
				'id-denylist': 'off',
				'id-match': 'off',
				'import/no-deprecated': 'warn',
				'import/no-extraneous-dependencies': 'off',
				indent: 'off',
				'max-len': 'off',
				'no-bitwise': 'error',
				'no-caller': 'error',
				'no-debugger': 'error',
				'no-empty': 'off',
				'no-empty-function': 'off',
				'no-eval': 'error',
				'no-fallthrough': 'error',
				'no-new-wrappers': 'error',
				'no-restricted-imports': ['error', 'rxjs/Rx', 'rxjs/internal', 'rxjs/internal/operators'],
				'no-shadow': 'off',
				'no-throw-literal': 'error',
				'no-trailing-spaces': 'error',
				'no-undef-init': 'error',
				'no-underscore-dangle': 'off',

				'no-unused-expressions': 'error',
				'no-unused-labels': 'error',
				'no-unused-vars': [
					'error',
					{
						argsIgnorePattern: '^_',
						varsIgnorePattern: '^_',
						caughtErrorsIgnorePattern: '^_',
					},
				],
				'no-var': 'error',
				'prefer-const': 'error',
				'lines-between-class-members': 'off',
				'@typescript-eslint/lines-between-class-members': 'off',
				quotes: 'off',
				radix: 'error',
				semi: 'error',
				'spaced-comment': [
					'error',
					'always',
					{
						markers: ['/'],
					},
				],
			},
			overrides: [
				// {
				// 	files: ['*actions.ts'],
				// 	rules: {
				// 		'@typescript-eslint/no-shadow': 'off',
				// 	},
				// },
				// {
				// 	files: ['*reducer.ts'],
				// 	rules: {
				// 		'@typescript-eslint/default-param-last': 'off',
				// 	},
				// },
				// {
				// 	files: ['*d.ts'],
				// 	rules: {
				// 		'no-unused-vars': 'off',
				// 	},
				// },
			],
		},
		{
			files: ['*.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'max-len': 'off',
			},
		},
		{
			files: ['*.component.ts'],
			extends: ['plugin:@angular-eslint/template/process-inline-templates'],
		},
		{
			files: ['src//*.spec.ts', 'src//*.d.ts'],
			parserOptions: {
				project: './tsconfig.spec.json',
			},
			extends: ['plugin:jasmine/recommended'],
			plugins: ['jasmine'],
			env: { jasmine: true },
		},
		{
			files: ['src/**/*.jest.ts'],
			parserOptions: {
				project: './tsconfig.spec.json',
			},
			extends: ['plugin:jest/recommended'],
			plugins: ['jest'],
		},
	],
};
