import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String
});

userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function() {
    return bcrypt.compareSync(password, bcrypt.genSaltSync(password, this.password))
}
export default mongoose.model('User', userSchema);