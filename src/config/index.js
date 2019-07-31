function getConfig() {
  const env = process.env.NODE_ENV;
  let config = require('./dev');
  try {
    config = require(`./${env}`);
  } catch (err) {
    console.log(`failed to load the env config for ${env}`);
  }
  return config;
}

module.exports = getConfig();
