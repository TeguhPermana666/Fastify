import pg from 'pg';
const {Pool} = pg;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "backend",
    password: "1110",
    port: 5432,
});

export default pool;