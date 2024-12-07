import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser = require('cookie-parser')
import cors from 'cors'
import { Routes } from './routes'
import swagger from './swagger/swagger'
import swaggerUi from 'swagger-ui-express'

dotenv.config()

const app = express()

// inicialización de variables de entorno
const PORT = process.env.PORT as string
const routes = new Routes().router

// Configuración de CORS
const corsOptions = {
  origin: true, // Reemplaza con la URL de tu frontend
  credentials: true, // Permitir el envío de cookies
  optionsSuccessStatus: 200
}

// Declaración de middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cookieParser())

// Integracion de rutas
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`)
})
