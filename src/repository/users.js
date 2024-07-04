import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "backend",
    password: "1110",
    port: 5432,
});
const userRepository = {
    async registerUser(email, username, password){
        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 8);
        try{
            const result = await pool.query('INSERT INTO users (id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [userId, email, username, hashedPassword]);
            return result.rows[0];
        }catch(err){
            throw new Error(err);
        }

    },

    async getUserByEmail(email){
        try{
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            return result.rows[0];
        }catch(err){
            throw new Error(err);
        }
    }
};

export default userRepository;