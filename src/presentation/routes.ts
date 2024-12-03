import { Request, Response, Router } from "express";

export class AppRouter {
  static get routes(): Router {
    const router = Router()

    // router.use('/api/tasks', TaskRoutes.routes)
    // router.use('/api/auth', AuthRoutes.routes)
    // router.use('/api/password', ForgotPasswordRoutes.routes)

    return router
  }

}
