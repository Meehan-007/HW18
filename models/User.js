const { Schema, model, Types } = require('mongoose'); 
const dateFormat = require('../utils/dateFormat');


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
     // must match a valid email address
    }, 

    thoughts: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Thought'
        }
    ],
    friends: [UserSchema]
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