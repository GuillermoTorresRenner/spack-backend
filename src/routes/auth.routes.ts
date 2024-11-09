import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'
import { ValidationLoginRules, ValidationRegisterRules } from '../validations/auth.validations'
import { validateRequest } from '../middlewares/validateRequest'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { PermissionMiddleware } from '../middlewares/permission.middleware'

export class AuthRoutes {
  public router: Router
  private readonly authController: AuthController

  constructor () {
    this.router = Router()
    this.authController = new AuthController() // Instancia del controlador con inyección de dependencias
    this.initializeRoutes()
  }

  // Método para inicializar las rutas

  private initializeRoutes (): void {
    // Rutas de usuarios
    this.router.post('/register', validateRequest(ValidationRegisterRules),AuthMiddleware,PermissionMiddleware(["ADMIN"]), this.authController.register.bind(this.authController))
    this.router.post('/login', validateRequest(ValidationLoginRules), this.authController.login.bind(this.authController))
    this.router.get('/whoami', AuthMiddleware, this.authController.whoami.bind(this.authController))
    this.router.get('/logout', AuthMiddleware, this.authController.logout.bind(this.authController))
  }
}
