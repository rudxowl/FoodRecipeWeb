import express from 'express';
import * as controller from './recipes.controller';

let router = express.Router();


// GET methods
router.get('/', controller.index);
router.get('/reviews', controller.indexReview);
router.get('/:recipeid', controller.show);
router.get('/:recipeid/reviews/:reviewid', controller.showReview);

// POST methods
router.post('/', controller.create);
router.post('/:recipeid', controller.createReview);

// PUT method
router.put('/:recipeid', controller.update);
router.put('/:recipeid/reviews/:reviewid', controller.updateReview);

// DELETE method
router.delete('/:recipeid', controller.destroy);
router.delete('/:recipeid/reviews/:reviewid', controller.destroyReview);

export { router };
