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
  eleventyConfig.addWatchTarget('src/redirects');
  eleventyConfig.addWatchTarget('src/files/');
  eleventyConfig.addWatchTarget('src/images/');
  eleventyConfig.addWatchTarget('src/js/');

  // build less - see `src/content/_less.liquid`
  eleventyConfig.addTransform('less', async (content, outputPath) => {
    let output;
    if (outputPath.endsWith('.css')) {
      await less.render(content)
        .then((result) => {
          output = result.css;
        });
      return output;
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
