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
    const idea = await Idea.findById(req.params.id)
    console.log(idea.username, req.body.username)
    // Match the usernames
    if (idea.username === req.body.username) {
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
      return res.json({success: true, data: updatedIdea})
    }

    // Usernames do not match
    res.status(403).json({
      success: false,
      error: 'You are not authorized to update this resource',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Something went wrong'})
  }
})

// Delete idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)

    // Match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id)
      return res.json({success: true, data: {}})
    }

    // Usernames do not match
    res.status(403).json({
      success: false,
      error: 'You are not authorized to delete this resource',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, error: 'Something went wrong'})
  }
})

export default router
