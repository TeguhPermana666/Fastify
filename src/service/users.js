import userRepository from "../repository/users";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userService = {
    async registerUser(email, username, password){
        return await userRepository.registerUser(email, username, password);
    },
    async loginUser(email, password){
        const user = await userRepository.getUserByEmail(email);
        if(!user){
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({id:user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
        return {user, token};
    },
};

export default userService