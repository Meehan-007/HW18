const router = require('express').Router();
const { getAllUser, getuserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/users-controller'); 

// api route 

router
  .route('/')
  .get(getAllUser)
  .post(createUser); // [push the created ID to a user array]


  router
  .route('/:id')
  .get(getuserById)
  .put(updateUser)
  .delete(deleteUser);



  router 
  .route('/:id/friends/:friendId') 
  .post(addFriend) 
  .delete(deleteFriend);

module.exports = router;