import { Request, Response, NextFunction } from 'express';
declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
const authProtect = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.session;
  if (!user) {
    return res.status(400).json({
      message: 'Fail to perform this action ' + ' : ' + 'Unauthorised access',
    });
  }
  next();
};

module.exports = authProtect;
