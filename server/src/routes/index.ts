import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction, Router } from 'express';
const router = Router();
import userRoute from './user';
import authRoute from './auth';


export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }
   
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
   
      if (!token) {
        throw new Error();
      }
   
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
      (req as CustomRequest).token = decoded;
   
      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
};

router.use(auth, userRoute);
router.use('/auth', authRoute);



export default router;