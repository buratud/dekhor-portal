const BASE_DOMAIN_WITH_PROTOCOL = process.env.BASE_DOMAIN_WITH_PROTOCOL;
const BASE_SERVER_PATH = process.env.BASE_SERVER_PATH || '/api/eats';
const BASE_WEB_PATH = process.env.BASE_WEB_PATH || '/eats';
exports.MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
exports.PORT = process.env.PORT || 5000;
exports.BASE_WEB_PATH = BASE_WEB_PATH;
exports.BASE_API_URL = `${BASE_DOMAIN_WITH_PROTOCOL}${BASE_SERVER_PATH}`;