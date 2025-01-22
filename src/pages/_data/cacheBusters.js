import GetHash from '../../lib/get-hash.js';

// Generate hashes for assets to use for cache busting
export default async () => {
  const getHash = new GetHash();
  return {
    // Generate a hash based on the minified css
    styles: getHash.fromFile('_site/css/ggo.min.css'),
  };
};
