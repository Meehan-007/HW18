const router = require('express').Router();
const { getAllThought, getthoughtById, createThought, updateThought, deleteThought, createReactions, deleteReactions} = require('../../controllers/thought-controller'); 

// api route 

router
  .route('/')
  .get(getAllThought)
  .post(createThought); 

  // post needs uers id to link up 
  // path to get data to show in the routes put it there
  router
  .route('/:id')
  .get(getthoughtById)
  .put(updateThought)
  .delete(deleteThought);



  router
  .route("/:id/reactions")
  .post(createReactions); 

  router
  .route("/:id/reactions/:reactionId")
  .delete(deleteReactions);

module.exports = router;