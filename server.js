import express from 'express'

const PORT = 5000
const app = express()

const ideas = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]

app.get('/', (req, res) => {
  return res.send({message: 'Welcome to App'})
})

app.get('/api/ideas', (req, res) => {
  return res.send({sucess: true, data: ideas})
})

app.get('/api/ideas/:id', (req, res) => {
  const idea = ideas.find(idea => idea.id === +req.params.id)
  if (!idea) return res.status(404).send({success: false, error: 'Resource not found.'})

  res.send({sucess: true, data: idea})
})

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
