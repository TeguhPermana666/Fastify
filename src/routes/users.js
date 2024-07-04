import fastify from "fastify";
import { userController} from "../controllers/users.js";

const {registerUser, loginUser} = userController;

const postRegister = {
    schema:{
        body:{
            type:'object',
            required:['email', 'username', 'password'],
            properties:{
                email:{type:'string'},
                username:{type:'string'},
                password:{type: 'string'}
            }
        }
    },
    handler: registerUser
};

const postLogin = {
    schema:{
        body:{
            type:'object',
            required:['email', 'password'],
            properties:{
                email:{type:'string'},
                password:{type: 'string'}
            }
        }
    },
    handler:loginUser
};


function usersRoutes(fastify, options, done){
    fastify.post('/register', postRegister);
    fastify.post('/login', postLogin);
    done();
};
export default usersRoutes;