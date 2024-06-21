import express from 'express';
import usersRouter from './routes/user.mjs'
import productsRouter from './routes/products.mjs'
import { requestTime } from './middlewares/middlewares.mjs';

const app=express();
app.use(express.json())
app.use(requestTime)
  


//ROUTE
app.use('/api/users',usersRouter)
app.use('/api/products',productsRouter)




const PORT=process.env.PORT||3000


app.get('/', (req, res) => {
    let responseText = 'Hello World!<br>'
    responseText += `<small>Requested at: ${req.requestTime}</small>`
    res.send(responseText)
  })


app.listen(PORT,()=>{
    console.log(`Running on port  ${PORT}`);
})










//PUT
//PATCH
//DELETE 

