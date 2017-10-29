export let defaultConfig = {
    APP_PORT: 3000,
    ENV: 'dev',
    REDIS_STORE:  {
        host: 'localhost',
        //port: 6379
    },
    SESSION: {
        secret: 'user-session-secret',
        cookie: { maxAge: 60000 },
        resave: true,
        saveUninitialized: true
    }
};
