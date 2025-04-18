import fs from 'fs';
import path from 'path';
import atImport from 'postcss-import';
import cssnano from 'cssnano';
import less from 'less';
import postcss from 'postcss';

// Build the css and its map, write them to the 11ty output folder

export default async () => {
  const start = Date.now();
  console.log('Processing styles');
  const srcFile = 'src/less/ggo.less';
  const minFile = '_site/css/ggo.min.css';
  const mapFile = '_site/css/ggo.min.css.map';
  try {
    // process read, process, and write css
    const srcString = (await fs.promises.readFile(srcFile)).toString();
    const compiled = (await less.render(srcString, {
      // devtools doesn't do well with less source maps, so don't generate them for this step
      sourceMap: false,
    }));
    const mkdir = fs.promises.mkdir(path.dirname(minFile), { recursive: true });
    const processed = postcss([ atImport, cssnano ]).process(compiled.css, {
      from: srcFile, to: minFile, map: { inline: false },
    });
    // wait for mkdir and postcss to finish
    await Promise.all([ mkdir, processed ]);
    // write out the minified css and the source map
    const minWrite = fs.promises.writeFile(minFile, processed.css);
    const mapWrite = fs.promises.writeFile(mapFile, processed.map.toString());
    // wait for the writes to finish
    await Promise.all([ minWrite, mapWrite ]);
    console.log(`Finished processing styles (${Date.now() - start}ms)`);
    return processed.css; // return the css
  } catch (e) {
    console.error('There was a problem processing styles.');
    console.error(e);
    return Promise.reject();
  }
};
