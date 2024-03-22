import {Router} from 'express';
const userRoute = Router();

userRoute.get('/user', (req, res) => {
    res.json({
      loggedIn: true,
    });
});


export default userRoute;