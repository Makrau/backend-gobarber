import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ServiceResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: RequestDTO): Promise<ServiceResponse> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, '0044aae3a3f536794a839d3fda1a73eb', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
