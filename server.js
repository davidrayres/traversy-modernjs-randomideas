import express from 'express'
import ideasRouter from './routes/ideas.js'
const app = express()
const PORT = 5000
0
app.get('/', (req, res) => {
  return res.send({message: 'Welcome to App'})
})

app.use('/api/ideas', ideasRouter)

const ideaRouter = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
