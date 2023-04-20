export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Toolbox Test Api',
      version: '1.0.0',
      description:
        'API documentation using Swagger for Test Toolbox to software developer.',
      contact: {
        name: 'Angel Morante',
        url: 'https://www.linkedin.com/in/angel-jes%C3%BAs-morante-3a815b125/'
      }
    },
    basePath: '/'
  },
  apis: ['./src/routes/*.js'] // Specify the path to your route files
}
