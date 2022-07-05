const { Schema, model, Types } = require('mongoose'); 
const dateFormat = require('../utils/dateFormat');

// look into what types wre in pizza hunt 
const UserSchema = new Schema(
  {
    username: {
      type: String, 
      unique: true, 
      required: true,
      trim: true
    },
     email: {
      type: String, 
      unique: true, 
      required: true,
      trim: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 

      // learn this syntax
    }, 

    thoughts: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Thought'
        }
    ], 
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
   // friends: [UserSchema] why doesnt this code work?? but works for replyschema on tohughts
  },
  {
    toJSON: {
     virtuals: true,
      getters: true
    },
    id: false
  }
); 

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', UserSchema);

module.exports = User;