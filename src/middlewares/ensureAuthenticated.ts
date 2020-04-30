import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated: RequestHandler = (request, response, next): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT Token is missing');
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = { id: sub };
    return next();
  } catch (error) {
    response.status(401).json({ error: 'Invalid JWT token' });
  }
};

export default ensureAuthenticated;
