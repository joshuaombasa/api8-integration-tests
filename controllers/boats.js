const express = require('express')
const Boat = require('../models/boat')

const boatsRouter = express.Router()

boatsRouter.get('/', async (request, response, next) => {
  const boats = await Boat.find({})
  try {
    response.send(boats)
  } catch (error) {
    next(error)
  }
})

boatsRouter.get('/:id', async (request, response, next) => {
  try {
    const boat = await Boat.findById(request.params.id)
    if (!boat) {
      return response.status(404).end()
    }
    response.send(boat)
  } catch (error) {
    next(error)
  }
})

boatsRouter.post('/', async (request, response, next) => {
  const { name, licenced } = request.body
  try {
    const boatObject = new Boat({ name, licenced })
    const savedboat = await boatObject.save()
    response.status(201).send(savedboat)
  } catch (error) {
    next(error)
  }
})


boatsRouter.put('/', async (request, response, next) => {
  const { name, licenced } = request.body
  try {
    const updatedboat = await Boat.findByIdAndUpdate(
      request.params.id,
      { name, licenced },
      { new: true }
    )
    response.send(updatedboat)
  } catch (error) {
    next(error)
  }
})

boatsRouter.delete('/:id', async (request,response,next) => {
 
  try {
    await Boat.findByIdAndDelete(request.params.id)
    response.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = boatsRouter