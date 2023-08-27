const getHash = require('../../lib/get-hash');

// Generate hashes for assets to use for cache busting
module.exports = async () => {
  return {
    // Generate a hash based on the minified css
    styles: getHash.fromFile('_site/css/ggo.min.css'),
  };
};
