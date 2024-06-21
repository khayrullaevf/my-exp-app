import express from 'express';


const app=express();
app.use(express.json())

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
    console.log(req.query);
    const {query:{filter,value }}=req


    
    if(filter&&value) return res.send(
     mockUsers.filter((user)=>user[filter].includes(value))
    )
    return res.send(mockUsers)

})

app.post('/api/users',(req,res)=>{
    console.log(req.body);
    const {body}=req
    const newUser={id:mockUsers[mockUsers.length-1].id+1,...body}
    mockUsers.push(newUser)
    return res.status(201).send(newUser)

   
})


app.get('/api/users/:id',(req,res)=>{
 const parsedId=parseInt(req.params.id)
 console.log(parsedId);
 if (isNaN(parsedId)) {
    return res.status(400).send({msg:"Bad request"})
 }else{
    const findUser=mockUsers.find((user)=>user.id===parsedId)
    if (!findUser) return res.status(404).send({msg:'User not found'})
    return res.send(findUser)
 }
})

app.get('/api/products',(req,res)=>{
    res.send(mockUsers)
})



app.put('/api/users/:id',(req,res)=>{
    const{
    body,
    params:{id}
    }=req
    
  const parsedId=parseInt(id)

  if (isNaN(parsedId)) return res.sendStatus(400)

  const findUserIndex=mockUsers.findIndex((user)=>user.id===parsedId)

  if (findUserIndex===-1) return res.sendStatus(404)
   mockUsers[findUserIndex]={id:parsedId,...body}
   return res.sendStatus(200)

  







})








//PUT
//PATCH
//DELETE 

