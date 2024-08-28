const express = require('express')
const Boat = require('../models/boat')

const boatRouter = express.Router()

boatRouter.get('/', async (request, response, next) => {
  const boats = await Boat.find({})
  try {
    response.send(boats)
  } catch (error) {
    next(error)
  }
})

boatRouter.get('/:id', async (request, response, next) => {
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

boatRouter.post('/', async (request, response, next) => {
  const { name, licenced } = request.body
  try {
    const boatObject = new Boat({ name, licenced })
    const savedboat = await boatObject.save()
    response.status(201).send(savedboat)
  } catch (error) {
    next(error)
  }
})


boatRouter.put('/', async (request, response, next) => {
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

boatRouter.delete('/:id', async (request,response,next) => {
 
  try {
    await Boat.findByIdAndDelete(request.params.id)
    response.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = boatRouter