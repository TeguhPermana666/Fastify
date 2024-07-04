import userService from "../service/users.js";

export const userController = {
    async registerUser(req, res){
        const {email, username, password} = req.body;
        try{
            const newUser = await userService.registerUser(email, username, password);
            res.status(201).send(newUser);
        }catch(err){
            console.error("Error in userController.registerUser:", err);
            res.status(500).send({error:'Internal server error'});
        }
    },

    async loginUser(req,res){
        const {email, password} = req.body;
        try{
            const {user, token} = await userService.loginUser(email, password);
            res.status(200).send({user, token});
        }catch(err){
            console.error("Error in userController.loginUser:", err);
            res.status(400).send({error:'Invalid credentials'});
        }
    }
};