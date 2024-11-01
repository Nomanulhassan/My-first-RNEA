const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const { json } = require('express')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')


dotenv.config()

connectDB();

const app =express()

app.use(cors())
app.use(express. json())
app.use(morgan('dev'))
app.use('/api', userRoutes);

app.use("/api/v1/auth", require("./routes/userRoutes"))
app.use("/api/v1/post", require("./routes/postRouter"))

const PORT =process.env.PORT || 8080


app.listen(PORT, () =>{
    console.log(`Server Running ${PORT}` .bgMagenta.white)
})

