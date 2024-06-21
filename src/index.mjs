import express from 'express';
import usersRouter from './routes/user.mjs'


const app=express();
app.use(express.json())



//ROUTE
app.use('/api/users',usersRouter)



const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
    console.log(`Running on port  ${PORT}`);
})










//PUT
//PATCH
//DELETE 

