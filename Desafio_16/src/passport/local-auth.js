import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

passport.serializeUser((user, done)=>{
    done(null, user.id);
});
passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
});


passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {        
        const userExist = await User.findOne({email: email})
    if (userExist) {
        return done(null, false, req.flash('signupMessage', 'The Email is already taken.'));
    }
    else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        return done(null, newUser)
    }
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    console.log("entro aca")
    
    const userExist = await User.findOne({email: email})
    console.log(userExist)
    if (!userExist) {
        console.log("user desn't exist")
        return done(null, false, req.flash('loginMessage', 'No user found'));
    }
    const passOK = await bcrypt.compare(password, userExist.password)
    console.log(passOK)
    if(!passOK){
        console.log("bad password")
        return done(null, false, req.flash('loginMessage', 'Password Incorrecta'));
    }
    
    return done(null,userExist)
}));