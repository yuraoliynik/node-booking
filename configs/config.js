module.exports = {
    NODE_ENV: 'dev',

    APP_PORT: process.env.APP_PORT || 5000,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,

    HOST_URL: process.env.HOST_URL || 'http://localhost:5000',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/booking',

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASS: process.env.NO_REPLAY_EMAIL_PASS,

    JWT_SECRET_WORD_ACCESS: process.env.JWT_SECRET_WORD_ACCESS,
    JWT_SECRET_WORD_REFRESH: process.env.JWT_SECRET_WORD_REFRESH
};
