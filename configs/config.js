module.exports = {
    NODE_ENV: 'dev',

    APP_PORT: process.env.APP_PORT || 5000,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,

    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,

    HOST_URL: process.env.HOST_URL || 'http://localhost:5000',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/booking',

    MESSAGE_BIRD_ACCESS_KEY: process.env.MESSAGE_BIRD_ACCESS_KEY,

    NO_REPLAY_EMAIL: process.env.NO_REPLAY_EMAIL,
    NO_REPLAY_EMAIL_PASS: process.env.NO_REPLAY_EMAIL_PASS,

    JWT_SECRET_WORD_ACCESS: process.env.JWT_SECRET_WORD_ACCESS,
    JWT_SECRET_WORD_REFRESH: process.env.JWT_SECRET_WORD_REFRESH,
    JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT: process.env.JWT_SECRET_WORD_ACTION_ACTIVATE_ACCOUNT,
    JWT_SECRET_WORD_ACTION_FORGOT_PASSWORD: process.env.JWT_SECRET_WORD_ACTION_FORGOT_PASSWORD,

    USER_ADMIN_EMAIL: process.env.USER_ADMIN_EMAIL,
    USER_ADMIN_PASSWORD: process.env.USER_ADMIN_PASSWORD
};
