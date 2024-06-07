const requireField = fieldName => {
	return value => {
		if (String(value).length === 0) {
			return fieldName + " is required"
		}
		return true
	}
}

module.exports = plop => {
	plop.setGenerator("component", {
		description: "Create a reusable component",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is your component name?",
				validate: requireField("name"),
			},
		],
		actions: [
			{
				type: "add",
				path: "plop-templates/{{pascalCase name}}/{{pascalCase name}}.tsx",
				templateFile: "plop-templates/Component/Component.tsx.hbs",
			},
			{
				type: "add",
				path: "plop-templates/{{pascalCase name}}/{{pascalCase name}}.module.scss",
				templateFile:
					"plop-templates/Component/Component.module.scss.hbs",
			},
		],
	})
	plop.setGenerator("slice", {
		description: "Create a reusable slice",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is your slice name?",
				validate: requireField("name"),
			},
		],
		actions: [
			{
				type: "add",
				path: "plop-templates/{{camelCase name}}.slice.ts",
				templateFile: "plop-templates/slice.ts.hbs",
			},
		],
	})
	plop.setGenerator("module", {
		description: "Create a module",
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is your module name?",
				validate: requireField("name"),
			},
		],
		actions: [
			{
				type: "add",
				path: "plop-templates/{{pascalCase name}}/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
				templateFile: "plop-templates/Component/Component.tsx.hbs",
			},
			{
				type: "add",
				path: "plop-templates/{{pascalCase name}}/components/{{pascalCase name}}/{{pascalCase name}}.module.scss",
				templateFile:
					"plop-templates/Component/Component.module.scss.hbs",
			},
			{
				type: "add",
				path: "plop-templates/{{pascalCase name}}/constraints/.empty",
			},
			{
				type: "add",
				path: "plop-templates/{{pascalCase name}}/helpers/.empty",
			},
			{
				type: "add",
				path: "plop-templates/{{pascalCase name}}/store/.empty",
			},
			{
				type: "add",
				path: "plop-templates/{{pascalCase name}}/index.ts",
				templateFile:
					"plop-templates/index.ts.hbs"
			},
		],
	})
}
