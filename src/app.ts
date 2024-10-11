import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cookieParser = require('cookie-parser')
import { Routes } from './routes'
dotenv.config()

const app = express()

// inicialización de variables de entorno
const PORT = process.env.PORT as string
const routes = new Routes().router
// Declaración de middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cookieParser())
// Integracion de rutas
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`)
})
