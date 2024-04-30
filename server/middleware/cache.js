// Import necessary modules
const client = require("../cacheClient/redis-client")

// Middleware function to cache data
const cacheMiddleware = async (req, res, next) => {
  const user = await client.get(req._id);
  console.log('inside of middleware',user); 
  if (user) {
    console.log("returning as found value in cache");
    return res.status(200).json(JSON.parse(user));
  }
  else next()
};

// Export the middleware function
module.exports = cacheMiddleware;
