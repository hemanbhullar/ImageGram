import { fileURLToPath } from 'url'

const pathToRoutesFile = fileURLToPath(new URL('../routers/v1/*.js', import.meta.url));
console.log(pathToRoutesFile);
export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Image gram API',
          version: '1.0.0',
          description: 'This is simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1'
            },
        ]
      },
      apis: [pathToRoutesFile], // files containing annotations as above
}