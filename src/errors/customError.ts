import logger from './logger'

export abstract class CustomError extends Error {
  statusCode: number

  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, CustomError.prototype)

    this.logError(`${new Date().toLocaleDateString()} | Error Type: ${this.name} | Status Code: ${this.statusCode} | Message: ${this.message} | Stack: ${this.stack}`)
  }

  logError (logData: string): void {
    logger.error(logData)
  };
}

export class NotFoundError extends CustomError {
  constructor (message: string = 'Recurso no encontrado') {
    super(message, 404)
  }
}

export class BadRequestError extends CustomError {
  constructor (message = 'Bad Request') {
    super(message, 400)
  }
}

export class UnauthorizedError extends CustomError {
  constructor (message = 'Unauthorized') {
    super(message, 401)
  }
}

export class ForbiddenError extends CustomError {
  constructor (message = 'Forbidden') {
    super(message, 403)
  }
}

export class InternalServerError extends CustomError {
  constructor (message = 'Internal Server Error') {
    super(message, 500)
  }
}

export class UserCreatedError extends CustomError {
  constructor (message = 'User already registered') {
    super(message, 409) // Cambiado a 409 Conflict
  }
}
