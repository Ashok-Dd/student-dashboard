import http from 'http'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import router from './routes/AuthRoutes.js'

dotenv.config()

const app = express()
const server = http.createServer(app)


app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))

app.use('/auth' , router)

const PORT = 5000
server.listen(PORT , () => {
    console.log(`Server running at ${PORT}`);
})


mongoose.connect('mongodb://localhost:27017/StudentDB')
.then(() => console.log('Connected to DB'))
.catch(() => console.log("Failed  to connect to DB"))