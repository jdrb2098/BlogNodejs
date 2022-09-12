const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: "academlo", // debe estar en una variable de entorno
  };
  passport.use(
    new JwtStrategy(opts, (decoded, done) => {
      return done(null, decoded); // decoded sera el que retornaremos cuando se ejecute exitosamente la autenticacion
    })
  );
};