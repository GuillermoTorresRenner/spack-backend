import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import { UserService } from '../services/users.service'
import { UsersRepository } from '../repositories/users.repository'
import { ValidationLoginRules, ValidationRegisterRules } from '../validations/auth.validations'
import { validateRequest } from '../middlewares/validateRequest'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class UsersRoutes {
  public router: Router
  private readonly userController: UsersController

  constructor () {
    this.router = Router()
    const usersRepository = new UsersRepository()
    const userService = new UserService(usersRepository)
    this.userController = new UsersController(userService) // Instancia del controlador con inyección de dependencias
    this.initializeRoutes()
  }

  // Método para inicializar las rutas

  private initializeRoutes (): void {
    this.router.post('/register', validateRequest(ValidationRegisterRules), this.userController.register.bind(this.userController))
    this.router.post('/login', validateRequest(ValidationLoginRules), this.userController.login.bind(this.userController))
    this.router.get('/whoami', AuthMiddleware, this.userController.whoami.bind(this.userController))
    this.router.get('/logout', AuthMiddleware, this.userController.logout.bind(this.userController))
    this.router.put('/', AuthMiddleware, this.userController.update.bind(this.userController))
  }
}
