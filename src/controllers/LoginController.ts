import { Request, Response } from 'express'
import { userRepository } from '../repositories/userRepository'
import { BadRequestError } from '../helpers/api-erros'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await userRepository.findOneBy({ email })

    if (!user) throw new BadRequestError('E-mail ou senha inválidos')

    const verifyPass = await bcrypt.compare(password, user.password)

    if (!verifyPass) throw new BadRequestError('E-mail ou senha inválidos')

    const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
      expiresIn: '1h'
    })

    const { password: _, ...userLogin } = user

    return res.json({
      user: userLogin,
      token: token
    })
  }
}