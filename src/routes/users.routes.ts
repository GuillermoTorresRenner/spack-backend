import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import { ValidateDeleteUserRules , ValidationNewPasswordRules, ValidateGetUserByIdRules, ValidationUpdateUserRules} from '../validations/auth.validations'
import { validateRequest } from '../middlewares/validateRequest'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { PermissionMiddleware } from '../middlewares/permission.middleware'

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

    this.router.put('/:userIdToUpdate', AuthMiddleware, PermissionMiddleware(["ADMIN"]),validateRequest(ValidationUpdateUserRules),this.userController.updateUserData.bind(this.userController))
    this.router.put('/update-password',validateRequest(ValidationNewPasswordRules), AuthMiddleware, this.userController.updatePassword.bind(this.userController))
    this.router.delete('/:userIDToDelete', AuthMiddleware, validateRequest(ValidateDeleteUserRules),PermissionMiddleware(["ADMIN"]),this.userController.deleteUser.bind(this.userController))
    this.router.get('/', AuthMiddleware,PermissionMiddleware(["ADMIN"]), this.userController.getAllActiveUsers.bind(this.userController))
    this.router.get('/:id', AuthMiddleware,validateRequest(ValidateGetUserByIdRules),PermissionMiddleware(["ADMIN"]) ,this.userController.getUserById.bind(this.userController))
  }
}
