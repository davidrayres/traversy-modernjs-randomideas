import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ideasRouter from './routes/ideas.js'
import connectDB from './config/db.js'

const __dirname = path.resolve()
const app = express()
dotenv.config()
connectDB()

//Middleware
app.use(express.static(path.join(__dirname, 'public'))) //static folder
app.use(express.json()) //parse json data
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5000'],
    credentials: true,
  })
)
app.use(express.urlencoded({extended: false})) //parse form data
app.use('/api/ideas', ideasRouter)

app.get('/', (req, res) => {
  return res.send({message: 'Welcome to App'})
})

const PORT = process.env.PORT
const ideaRouter = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
