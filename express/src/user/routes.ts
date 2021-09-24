import { Router } from "express";
import { isEmpty } from 'lodash';
import { BadRequestException } from "../base/exceptions";
import { UsersService } from "./UsersService";

const router = Router();
const usersService = new UsersService()

router.get('/user', async (req, res, next) => {
    usersService.getAllUsers()
        .then(users => res.json(users))
        .catch(reason => next(reason))
})

router.post('/user', async (req, res, next) => {
    if (req.body == undefined || isEmpty(req.body))
        next(new BadRequestException("Body is required"))

    usersService.createUser({ name: req.body.name })
        .then(user => res.status(201).json(user))
        .catch(reason => next(reason))
})

router.put('/user/:userId', async (req, res, next) => {
    if (req.body == undefined || isEmpty(req.body))
        next(new BadRequestException("Body is required"))

    usersService.updateUser(req.params.userId, { name: req.body.name })
        .then(user => res.status(200).json(user))
        .catch(reason => next(reason))
})

router.delete('/user/:userId', async (req, res, next) => {
    usersService.deleteUser(req.params.userId)
        .then(() => res.status(204).json())
        .catch(reason => next(reason))
})

export default router;