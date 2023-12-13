module.exports = function (app) {
	//Swagger Configuration
	const swaggerJSDoc = require("swagger-jsdoc");
	const swaggerUi = require("swagger-ui-express");

	const options = {
		definition: {
			openapi: "3.0.0",
			info: {
				title: "Clinica Swagger",
				version: "1.0.0",
				description: "Swagger documentation",
			},
			servers: [
				{
					url: "http://localhost:3001"
				}
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT"
					}
				}
			}
		},
		apis: [
			"./src/controllers/*.js",
		]
	};
	const swaggerSpec = swaggerJSDoc(options);


	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
		swaggerOptions: {
			docExpansion: "list"
		}
	}));
};
