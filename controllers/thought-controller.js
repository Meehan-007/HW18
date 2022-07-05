const { Thought, User } = require('../models');

const ThoughtController = {
    // get all pizzas
    getAllThought(req, res) {
        Thought.find({})
          .populate({
            path: 'username',
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
getthoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'username',
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
createThought({ params, body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  }, 
   

  // update pizza by id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id }, 
        body, 
        { new: true, runValidators: true })
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
deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  } , 

  createReactions({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.reactionId },
      { $push: { reactions: body } },
      { new: true, runValidators: true  }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },  

  deleteReactions({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.ThoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
    } 


    module.exports = ThoughtController;