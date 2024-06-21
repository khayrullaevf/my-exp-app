import { Router } from "express";
import { validationResult,checkSchema,matchedData } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import {createUserValidationSchema} from '../utils/validation.Schemas.mjs'
import { resolveIndexByUserId } from "../middlewares/middlewares.mjs";


const router=Router()

router.get('/',(req,res)=>{
    const {query:{filter,value }}=req
    if(filter&&value) return res.send(
     mockUsers.filter((user)=>user[filter].includes(value))
    )
    return res.send(mockUsers)
})


router.post('/',
    checkSchema(createUserValidationSchema),
    (req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty()) return res.status(400).send({error:result.array()})
    const data=matchedData(req)
    const newUser={id:mockUsers[mockUsers.length-1].id+1||1,...data}
    mockUsers.push(newUser)
    return res.status(201).send(newUser)
})

router.get('/:id',resolveIndexByUserId,(req,res)=>{
    const {findUserIndex}=req
    const findUser=mockUsers[findUserIndex]
    if (!findUser) return res.status(404).send({msg:'User not found'})
    return res.send(findUser)
})



router.put('/:id',resolveIndexByUserId,(req,res)=>{
    const{body, findUserIndex}=req 
    mockUsers[findUserIndex]={id:mockUsers[findUserIndex].id,...body}
    return res.sendStatus(200)
})


router.patch('/:id',resolveIndexByUserId,(req,res)=>{
const{body, findUserIndex}=req 
mockUsers[findUserIndex]={...mockUsers[findUserIndex], ...body}
return res.sendStatus(200)
})
router.delete('/:id',resolveIndexByUserId,(req,res)=>{
    const{findUserIndex}=req
    mockUsers.splice(findUserIndex,1)
    return res.sendStatus(200)
})

export default router 