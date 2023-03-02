import express from 'express'
const router = express.Router()

const ideas = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]

//get all ideas
router.get('/', (req, res) => {
  return res.send({sucess: true, data: ideas})
})

//get single idea
router.get('/:id', (req, res) => {
  const idea = ideas.find(idea => idea.id === +req.params.id)
  if (!idea) return res.status(404).send({success: false, error: 'Resource not found.'})

  res.send({sucess: true, data: idea})
})

export default router
