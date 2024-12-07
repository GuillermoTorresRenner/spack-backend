import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de ERP SPAK',
      version: '1.0.0',
      description: 'Documentación de los endpoints de la API de ERP SPAK',
      contact: {
        name: 'Guillermmo Torres Renner',
        email: 'torresrennerguillermo@gmail.com',
        phone: '+56931126146'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        UsersDTO: {
          type: 'object',
          properties: {
            userID: {
              type: 'string',
              example: '12345678-9'
            },
            rut: {
              type: 'string',
              example: '12345678-9'
            },
            password: {
              type: 'string',
              example: 'password123'
            },
            lastPassword: {
              type: 'string',
              example: 'password123'
            },
            name: {
              type: 'string',
              example: 'Juan'
            },
            surname: {
              type: 'string',
              example: 'Pérez'
            },
            role: {
              type: 'string',
              example: 'ADMIN'
            },
            lastConnection: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-10T10:00:00Z'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-10T10:00:00Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-10-10T10:00:00Z'
            },
            isActive: {
              type: 'boolean',
              example: true
            },
            nextPasswordChangeDate: {
              type: 'string',
              format: 'date-time',
              example: '2023-12-10T10:00:00Z'
            }
          },
          required: ['rut', 'password', 'lastPassword', 'name', 'surname', 'role']
        },
        UsersWhoamiDTO: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Juan'
            },
            surname: {
              type: 'string',
              example: 'Pérez'
            },
            role: {
              type: 'string',
              example: 'ADMIN'
            }
          },
          required: ['name', 'surname', 'role']
        },
        UsersCreateDTO: {
          type: 'object',
          properties: {
            rut: {
              type: 'string',
              example: '12345678-9'
            },
            password: {
              type: 'string',
              example: 'password123'
            },
            lastPassword: {
              type: 'string',
              example: 'password123'
            },
            name: {
              type: 'string',
              example: 'Juan'
            },
            surname: {
              type: 'string',
              example: 'Pérez'
            },
            role: {
              type: 'string',
              example: 'ADMIN'
            }
          },
          required: ['rut', 'password', 'lastPassword', 'name', 'surname', 'role']
        },
        UsersGet: {
          type: 'object',
          properties: {
            userID: {
              type: 'string',
              example: '12345678-9'
            },
            rut: {
              type: 'string',
              example: '12345678-9'
            },
            name: {
              type: 'string',
              example: 'Juan'
            },
            surname: {
              type: 'string',
              example: 'Pérez'
            },
            role: {
              type: 'string',
              example: 'ADMIN'
            }
          },
          required: ['userID', 'rut', 'name', 'surname', 'role']
        }
      }
    }
  },
  apis: [`${path.join(__dirname, '../controllers/*')}`] // Asegúrate de que esta ruta sea correcta
}

export default swaggerJSDoc(options)
