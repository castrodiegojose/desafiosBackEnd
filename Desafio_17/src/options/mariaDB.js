import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MYSQL_HOST);

export const mysqlOptions = {
    client: "mysql",
        connection: {
            host: process.env.MYSQL_HOST || "localhost",
            port: process.env.MYSQL_PORT,   
            user: process.env.MYSQL_USER,
            password:process.env.MYSQL_PASS,
            database: process.env.MYSQL_DB
        }
}



