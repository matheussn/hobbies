import { Router } from "express";
import { isEmpty } from 'lodash';
import { BadRequestException } from "../base/exceptions";
import { HobbieService } from "./HobbiesService";

const router = Router();
const hobbieService = new HobbieService()

function validBody(body: any, next: any): any {
    if (body == null)
        next(new BadRequestException("É necessário passar todos os campos no 'body'"))
    if (body.name == null)
        next(new BadRequestException("Campo 'name' é obrigatório!"))
    if (body.experienceLevel == null)
        next(new BadRequestException("Campo 'experienceLevel' é obrigatório!"))
    if (body.year == null)
        next(new BadRequestException("Campo 'year' é obrigatório!"))

    return body
}

router.get('/user/:userId/hobbie', async (req, res, next) => {
    hobbieService.getAllHobbies(req.params.userId)
        .then(hobbies => res.status(200).json(hobbies))
        .catch(reason => next(reason))
})

router.post('/user/:userId/hobbie', async (req, res, next) => {
    if (req.body == undefined || isEmpty(req.body))
        next(new BadRequestException("Body is required"))

    validBody(req.body, next)
    const { name, experienceLevel, year } = req.body

    hobbieService.createHobbie(req.params.userId, { name, experienceLevel, year })
        .then(hobbies => res.status(201).json(hobbies))
        .catch(reason => next(reason))
})

router.put('/user/:userId/hobbie/:hobbieId', async (req, res, next) => {
    if (req.body == undefined || isEmpty(req.body))
        next(new BadRequestException("Body is required"))

    const { name, year, experienceLevel } = req.body

    if (name == null && year == null && experienceLevel == null) {
        next(new BadRequestException(`É necessário enviar pelo menos um dos campos do Hobbie para ser alterado`))
    }
    hobbieService.updatehobbie(req.params.userId, { name, year, experienceLevel })
        .then(hobbie => res.status(200).json(hobbie))
        .catch(reason => next(reason))
})

router.delete('/user/:userId/hobbie/:hobbieId', async (req, res, next) => {
    hobbieService.deleteHobbie(req.params.userId, req.params.hobbieId)
        .then(() => res.status(204).json())
        .catch(reason => next(reason))
})

export default router;