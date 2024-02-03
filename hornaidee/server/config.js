const BASE_DOMAIN_WITH_PROTOCOL = process.env.BASE_DOMAIN_WITH_PROTOCOL;
const BASE_SERVER_PATH = process.env.BASE_SERVER_PATH || '/api/dorms';
const BASE_WEB_PATH = process.env.BASE_WEB_PATH || '/dorms';
exports.BASE_WEB_PATH = BASE_WEB_PATH;
exports.BASE_SERVER_PATH = BASE_SERVER_PATH;
exports.BASE_API_URL = `${BASE_DOMAIN_WITH_PROTOCOL}${BASE_SERVER_PATH}`;
exports.PORT = process.env.PORT || 5000;
exports.JWT_KEY = process.env.JWT_KEY;
exports.MYSQL_HOST = process.env.MYSQL_HOST;
exports.MYSQL_USER = process.env.MYSQL_USER;
exports.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
exports.MYSQL_DATABASE = process.env.MYSQL_DATABASE;
exports.WEB_URL = `${BASE_DOMAIN_WITH_PROTOCOL}${BASE_WEB_PATH}` || 'http://localhost:3000';