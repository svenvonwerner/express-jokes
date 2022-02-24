import express from 'express';
import { nanoid } from 'nanoid';
import Person from '../models/person.js';

const router = express.Router();

/**
 * Exercise 1
 * Create a GET /person route, that returns all people.
 */

router.get('/', async (req, res, next) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    next(error);
  }
});

/**
 * Exercise 2
 * Create a GET /person/:id route, that returns the person for the given id.
 */

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await Person.findById(id);
    res.json(person);
  } catch (error) {
    next(error);
  }
});

/**
 * Exercise 3
 * Create a POST /person route, that adds a new person to the array.
 */

router.post('/', async (req, res, next) => {
  try {
    const person = await Person.create(req.body);
    res.json(person);
  } catch (error) {
    next(error);
  }
});

/**
 * Exercise 4
 * Create a PATCH /person/:id route, that updates the person for the given id.
 */
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await Person.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(person);
  } catch (error) {
    next(error);
  }
});

/**
 * Exercise 5
 * Create a DELETE /person/:id route, that deletes the person for the given id.
 */

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const person = await Person.findByIdAndDelete(id);
    if (person) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
