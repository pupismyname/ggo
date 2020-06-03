module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPassthroughCopy({
    'src/redirects': '/',
    'src/files': '/files',
    'src/images': '/images',
    'src/js': '/js',
    'src/less-build': '/css',
  });
  eleventyConfig.addWatchTarget('src/redirects');
  eleventyConfig.addWatchTarget('src/files/');
  eleventyConfig.addWatchTarget('src/images/');
  eleventyConfig.addWatchTarget('src/js/');
  eleventyConfig.addWatchTarget('src/less-build/');
  return {
    dir: {
      input: 'src/pages',
      output: '_site'
    }
  };
};
