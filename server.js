import express from 'express'
import dotenv from 'dotenv'
import ideasRouter from './routes/ideas.js'
import connectDB from './config/db.js'

const app = express()
dotenv.config()
connectDB()

app.use(express.json()) //allows express to parse json data
app.use(express.urlencoded({extended: false})) //allows express to parse form data
app.use('/api/ideas', ideasRouter)

app.get('/', (req, res) => {
  return res.send({message: 'Welcome to App'})
})

const PORT = process.env.PORT
const ideaRouter = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
