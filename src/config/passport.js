const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const Usuario = require('../models/usuario_models');

// Serialización y deserialización de usuario para la sesión
// Esto permite que Passport guarde el ID del usuario en la sesión y lo recupere en cada solicitud
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Usuario.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await Usuario.findOne({ correo: profile.emails[0].value });
        if (!user) {
            user = await Usuario.create({
                nombre_apellido: profile.displayName,
                correo: profile.emails[0].value,
                password: 'google_oauth', // Contraseña temporal para usuarios de Google
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@facebook.com`;
        let user = await Usuario.findOne({ correo: email });
        if (!user) {
            user = await Usuario.create({
                nombre_apellido: profile.displayName,
                correo: email,
                password: 'facebook_oauth', // Contraseña temporal para usuarios de Facebook
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`;
        let user = await Usuario.findOne({ correo: email });
        if (!user) {
            user = await Usuario.create({
                nombre_apellido: profile.displayName || profile.username,
                correo: email,
                password: 'github_oauth', // Contraseña temporal para usuarios de GitHub
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;