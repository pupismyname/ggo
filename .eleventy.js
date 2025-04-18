import { EleventyRenderPlugin } from '@11ty/eleventy';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);

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
