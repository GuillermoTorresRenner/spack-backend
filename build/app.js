'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const app = (0, express_1.default)()
// Declaración de middleware
app.use(express_1.default.json())
app.use(express_1.default.urlencoded({ extended: true }))
app.get('/ping', (_req, res) => {
  res.send('pong')
})
// inicialización del server
app.listen(3000, () => {
  console.log('Server running on port 3000')
})
