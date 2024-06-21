import express from 'express';
import usersRouter from './routes/user.mjs'
import productsRouter from './routes/products.mjs'


const app=express();
app.use(express.json())



//ROUTE
app.use('/api/users',usersRouter)
app.use('/api/products',productsRouter)



const PORT=process.env.PORT||3000



app.listen(PORT,()=>{
    console.log(`Running on port  ${PORT}`);
})










//PUT
//PATCH
//DELETE 

