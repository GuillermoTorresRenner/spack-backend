import { Router } from 'express'
import { UsersRoutes } from './users.routes'
// Ejemplo de otra ruta

export class Routes {
  public router: Router

  constructor () {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes (): void {
    // Registrar todas las rutas aquí
    this.router.use('/auth', new UsersRoutes().router) // Rutas de usuario
  }
}
