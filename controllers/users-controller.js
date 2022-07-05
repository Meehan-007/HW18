const { User} = require('../models');

const UserController = {
    // get all pizzas
    getAllUser(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',   // how to get both to run
         //   path: 'friends',    // wehy does it create friend loops within friend loops
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      }, 

        // get one pizza by id
getuserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }, 

    // createPizza
createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  }, 
  

  // update pizza by id
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }, 

  // delete pizza
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  }, 

 
    addFriend({ params}, res) {
         User.findOneAndUpdate(   
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
          ) 
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'im confused!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },  

    deleteFriend( { params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId }},
            { new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
    } 


    module.exports = UserController;