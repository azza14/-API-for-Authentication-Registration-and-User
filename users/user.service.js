const config = require('../config.json');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
//const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User= db.User;
module.exports={
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete:_delete
};
async function authenticate ({username,password}){
    const user=await User.findOne({username});
    if(user && bcrypt.compareSync(password,user.hash)){
        const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}
async function getAll(){
    return await User.find(); 
}
async function getById(id){
    return await User.findById(id);
}
async function create (userParm)
{
    //validate 
   if(await User.findOne({username: userParm.username})){
       throw  'Username "'+ userParm.username + '"is already taken';
   }
   const user = new User(userParm);
    if (userParm.password){
        user.hash= bcrypt.hashSync(userParm.password,10);
    }

    console.log("test");
   // console.log("user last" , userParm.username);
    await user.save();
    console.log("test save");
}
 async function update(id, userParm){
      const user= await User.findById(id);
      if(!user) throw 'User Not Found';

      const  getUser = await User.findOne({username: userParm.username})
      if(user.username !== userParm.username && getUser ){
        throw 'Username "' + userParam.username + '" is already taken';
      }
       if(userParm.password){
           userParm.hash=bcrypt.hashSync(userParm.password,10);
        }
            // copy userParam properties to user
          Object.assign(user,userParm);
           await user.save();
 }
  async function _delete(id){
      await User.findByIdAndRemove(id);
  }



  