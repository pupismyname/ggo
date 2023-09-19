const yaml = require('js-yaml');

module.exports = function(eleventyConfig) {

  eleventyConfig.setServerOptions({
    port: 8873,
    domDiff: false,
    watch: [
      '_site/css/**/*',
      // '_site/js/**/*',
    ],
  });

  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy({
    'src/redirects': '/',
    'src/files': '/files',
    'src/images': '/images',
    'src/.htaccess': '/',
  });
  eleventyConfig.addWatchTarget('./src/redirects');
  eleventyConfig.addWatchTarget('./src/files/');
  eleventyConfig.addWatchTarget('./src/images/');

  eleventyConfig.addDataExtension('yml, yaml', (contents) => yaml.load(contents));

  eleventyConfig.addFilter('debug', async (param) => {
    console.log(param);
    return param;
  });

  return {
    dir: {
      input: 'src/pages',
      output: '_site'
    }
  };
};
