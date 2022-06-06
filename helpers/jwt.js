<<<<<<< HEAD

const jwt = require('jsonwebtoken');

const generarJWT = (uid) =>{

    return new Promise((resolve, reject) =>{


        const payload = {
            uid,
        };
    
        jwt.sign( payload,  process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token)=> {
            if (err) {
                console.log(err);
                reject(err);
            }else{
                resolve(token);
            }
        });

    }) ;
   
}


module.exports = {
    generarJWT
}
=======
const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generarJWT,
};
>>>>>>> 13058902fe5fde991086b562dd679fde823b1b4e
