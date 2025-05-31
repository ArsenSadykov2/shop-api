import express from "express";
import {Error} from 'mongoose';
import User from "../models/User";
import bcrypt from "bcrypt";
import auth, {RequestWithUser} from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try{
        const user = new User({
            username : req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();
        res.send({user: user, message: 'User registered successfully.'});
    } catch (e){
        if(e instanceof Error.ValidationError){
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {

    if(!req.body.username || !req.body.password){
        res.status(400).send("Username and password must be in req");
        return;
    }

    const user = await User.findOne({username: req.body.username});

    if(!user){
        res.status(404).send({error:"User not found"});
        return;
    }

    const isMath = await user.checkPassword(req.body.password);

    if(!isMath){
        res.status(400).send({error:"Password is incorrect"});
        return;
    }

    user.generateToken();
    await user.save();

    res.send({message: "Username and password is correct", user});
});

usersRouter.post('/secret',auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;

    res.send({
        message: 'Secret message',
        user: user,
    })
});


export default usersRouter;