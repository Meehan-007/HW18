const { Schema, model, Types } = require('mongoose'); 
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,  
      required: true, 
      maxlength: 280
      
    },
     CreatedAt: {
        type: Date,
        default: Date.now, 
        get: (createdAtVal) => dateFormat(createdAtVal)
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