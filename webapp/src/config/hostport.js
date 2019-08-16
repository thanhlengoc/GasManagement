let env = 0;
let appenv = '';
env === 0 ? appenv='http://localhost:8082' : appenv='https://gashungloihung.herokuapp.com';

export const HOST_PORT = appenv;
