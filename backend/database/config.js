let config;

if(process.env.NODE_ENV === "production"){
    config = {
        host: process.env.database_url,
        user: process.env.database_user,
        password: process.env.database_password,
        port: '3306',
        database: process.env.database_main,
    };
}else {
    config = {
        host: process.env.DB_HOST || 'localhost',
        user: 'root',
        // password: 'root',
        database: 'all_rise',
    };
}

module.exports = config;
