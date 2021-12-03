const mongoose=require("mongoose");
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const UserSchema=new mongoose.Schema(
    {
        username:{ type: String ,required:[true,'Please enter a username'], unique: true},//the first parameter is the value, the second paramter is the error
        email:
        { 
            type: String ,
            required:[true,'Please enter an email'], 
            unique: true,
            lowercase:true,
            validate:[isEmail, 'Please enter a valid email'] //it takes the value of email(val) and apply the function on it, if it's true then it store it,if it's false then it returns the error value
         }, //the validation we will use a third party validator calls 
        password:
        { 
            type: String ,
            required:[true,'Please enter a passowrd'],
            minlength:[6,'please enter longer password']
        },
        isAdmin:{type: Boolean,default:false},
        //market:{type:Array} //convert to 2D array 
        //refreshToken:{type:Array}
    },
    {
        timestamps:true
    }
);


//fire a function before doc saved to db

UserSchema.pre('save',async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});



//static method to login user
UserSchema.statics.login = async function(username,password){
    const user = await this.findOne({username:username});
    if (user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error ('incorrect password');
    }
    throw Error ('incorrect username');
};


module.exports = mongoose.model("User",UserSchema); //mongoose take that name "User" and pluralize it



