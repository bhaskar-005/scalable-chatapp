import { Router } from "express";
import loginController from "../controller/login";
import signUpController from "../controller/signup";
import allUsers from "../controller/allUsers";

const route = Router();

route.post('/login', loginController);
route.post('/sign-up', signUpController);
route.get('/users', allUsers);

export default route;