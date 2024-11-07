import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import { ValidationLoginRules, ValidationRegisterRules } from '../validations/auth.validations'
import { validateRequest } from '../middlewares/validateRequest'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class UsersRoutes {
  public router: Router
  private readonly userController: UsersController

  constructor () {
    this.router = Router()
    this.userController = new UsersController() // Instancia del controlador con inyección de dependencias
    this.initializeRoutes()
  }

  // Método para inicializar las rutas

  private initializeRoutes (): void {
    // Rutas de usuarios
    this.router.post('/register', validateRequest(ValidationRegisterRules), this.userController.register.bind(this.userController))
    this.router.post('/login', validateRequest(ValidationLoginRules), this.userController.login.bind(this.userController))
    this.router.get('/whoami', AuthMiddleware, this.userController.whoami.bind(this.userController))
    this.router.get('/logout', AuthMiddleware, this.userController.logout.bind(this.userController))
    this.router.put('/', AuthMiddleware, this.userController.update.bind(this.userController))
  }
}
