const less = require('less');

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy({
    'src/redirects': '/',
    'src/files': '/files',
    'src/images': '/images',
    'src/js': '/js',
    'src/.htaccess': '/',
  });
  eleventyConfig.addWatchTarget('./src/redirects');
  eleventyConfig.addWatchTarget('./src/files/');
  eleventyConfig.addWatchTarget('./src/images/');
  eleventyConfig.addWatchTarget('./src/js/');
  eleventyConfig.addWatchTarget("./src/less/");

  // build less - see `src/content/_less.liquid`
  eleventyConfig.addTransform('less', async (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      return await less.render(content).then(result => result.css);
    }
    return content;
  });

  return {
    dir: {
      input: 'src/pages',
      output: '_site'
    }
  };
};
