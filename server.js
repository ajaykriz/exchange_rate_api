const express =require('express')
const app =express()
const dotenv=require('dotenv')
const exchangeRoute = require('./routes/exhangeRoute')
app.use(express.json())
const port = process.env.PORT || 5000
app.use("/api", exchangeRoute);

app.listen(port,console.log(`server running on port ${port}`))
