import { Request, Response } from 'express'
import { userRepository } from '../repositories/userRepository'
import { BadRequestError } from '../helpers/api-erros'
import bcrypt from 'bcrypt'

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body

    
  }
}