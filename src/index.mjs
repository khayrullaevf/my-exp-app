import express from 'express';
import {query,validationResult,body,matchedData,checkSchema} from 'express-validator'
import { createUserValidationSchema} from './utils/validation.Schemas.mjs';


const app=express();
app.use(express.json())

const loggingMiddleware=(req,res,next)=>{
    console.log(req.method);
    console.log(req.url);
    next()
}
const resolveIndexByUserId=(req,res,next)=>{
    const{
        params:{id}
        }=req 
      const parsedId=parseInt(id)
      if (isNaN(parsedId)) return res.sendStatus(400)
      const findUserIndex=mockUsers.findIndex((user)=>user.id===parsedId)
      if (findUserIndex===-1) return res.sendStatus(404)
      req.findUserIndex=findUserIndex
      next()
}

app.use(loggingMiddleware,(req,res,next)=>{
    console.log('finished logging..');
    next()
})
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`Running on port  ${PORT}`);
})


const mockUsers=[
    {id:1,name:'Fazliddin'},
    {id:2,name:'Jack'},
    {id:3,name:'Tony'},
]


app.get('/',(req,res)=>{
    res.status(201).send(mockUsers)
})


app.get('/api/users',(req,res)=>{
    const {query:{filter,value }}=req
    if(filter&&value) return res.send(
     mockUsers.filter((user)=>user[filter].includes(value))
    )
    return res.send(mockUsers)
})



app.post('/api/users',
    checkSchema(createUserValidationSchema),
    (req,res)=>{
    const result=validationResult(req)
    if(!result.isEmpty()) return res.status(400).send({error:result.array()})
    const data=matchedData(req)
    const newUser={id:mockUsers[mockUsers.length-1].id+1||1,...data}
    mockUsers.push(newUser)
    return res.status(201).send(newUser)
})


app.get('/api/users/:id',resolveIndexByUserId,(req,res)=>{
    const {findUserIndex}=req
    const findUser=mockUsers[findUserIndex]
    if (!findUser) return res.status(404).send({msg:'User not found'})
    return res.send(findUser)
 
})

app.get('/api/products',(req,res)=>{
    res.send(mockUsers)
})



app.put('/api/users/:id',resolveIndexByUserId,(req,res)=>{
    const{body, findUserIndex}=req 
    mockUsers[findUserIndex]={id:mockUsers[findUserIndex].id,...body}
    return res.sendStatus(200)
})


app.patch('/api/users/:id',resolveIndexByUserId,(req,res)=>{
const{body, findUserIndex}=req 
mockUsers[findUserIndex]={...mockUsers[findUserIndex], ...body}
return res.sendStatus(200)

})
app.delete('/api/users/:id',resolveIndexByUserId,(req,res)=>{
    const{findUserIndex}=req
    mockUsers.splice(findUserIndex,1)
    return res.sendStatus(200)
})




//PUT
//PATCH
//DELETE 

