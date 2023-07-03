import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import ErrorUtil from '../Utilities/Error/create,error';
import config from 'config';

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const secretKey = config.get<string>('secretKey');
  const token = req.cookies.access_token;
  if (!token) return next(ErrorUtil.createError(401, 'You are not authenticated!'));

  jwt.verify(
    token,
    secretKey,
    { algorithms: ['HS256'] },
    (err: VerifyErrors | null, user: any) => {
      console.log(token, secretKey, err);
      if (err) return next(ErrorUtil.createError(403, 'Token is not valid!'));
      (req as any).user = user;
      next();
    }
  );
};

export default deserializeUser;