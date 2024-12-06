import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { ValidationLoginRules, ValidationRegisterRules } from '../validations/auth.validations'
import { validateRequest } from '../middlewares/validateRequest'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { PermissionMiddleware } from '../middlewares/permission.middleware'

const router= Router()
const authController = new AuthController() // Instancia del controlador con inyección de dependencias
    // Rutas de usuarios
    router.post('/register', validateRequest(ValidationRegisterRules),AuthMiddleware,PermissionMiddleware(["ADMIN"]), authController.register.bind(authController))
    router.post('/login', validateRequest(ValidationLoginRules), authController.login.bind(authController))
    router.get('/whoami', AuthMiddleware, authController.whoami.bind(authController))
    router.get('/logout', AuthMiddleware, authController.logout.bind(authController))
    export default router
