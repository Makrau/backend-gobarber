import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

// estamos no contexto https://{host}/sessions

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();
    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
