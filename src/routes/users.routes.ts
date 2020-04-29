import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// estamos no contexto https://{host}/users

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, password, email });
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
