import express from 'express'
import Idea from '../models/idea.js'
const router = express.Router()

// Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find()
    res.json({success: true, data: ideas})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Something went wrong.  Try again later.'})
  }
})

// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    if (!idea) return res.status(404).json({success: false, error: 'Resource not found'})
    res.send({sucess: true, data: idea})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Something went wrong.  Try again later.'})
  }

  res.json({success: true, data: idea})
})

// Add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  })

  try {
    const savedIdea = await idea.save()
    res.json({success: true, data: savedIdea})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Something went wrong.  Try again later.'})
  }
})

// Update idea
router.put('/:id', async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      {new: true}
    )
    res.send({success: true, data: updatedIdea})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Something went wrong.  Try again later.'})
  }
})

// Delete idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id)
    res.send({success: true, data: {}})
  } catch (error) {
    res.status(500).json({success: false, error: 'Something went wrong.  Try again later.'})
  }
})

export default router
