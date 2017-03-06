const pug = require('pug');
const fs = require('fs');
const path = require('path');
const rmdir = require('rimraf');
const mkdirp = require('mkdirp');
const ncp = require('ncp').ncp;
const _ = require('lodash');
const less = require('less');

const buildDir = path.join(__dirname, 'build');
const staticDir = path.join(__dirname, 'static');

function init() {
  cleanBuild();
}

function cleanBuild() {
  // remove build folder and everything in it
  rmdir(buildDir, () => {
    // create the build folder
    fs.mkdir(buildDir, () => {
      // copy static files to build folder
      ncp(staticDir, buildDir, () => {
        console.log('static files built');
        build();
      });
    });
  });
}

function build() {

  const lessSource = path.join(__dirname, 'styles/ggo.less');
  const lessTarget = path.join(buildDir, 'styles/ggo.css');
  fs.readFile(lessSource, (e, data) => {
    const lessString = data.toString();
    less.render(lessString, {}, (error, output) => {
      if (error) {
        console.log(error);
        return;
      }
      if (output) {
        mkdirp(path.dirname(lessTarget), (error) => {
          if (error) {
            console.log(error);
            return;
          }
          fs.writeFile(lessTarget, output.css, 'utf8', () => {
            console.log('less built');
          });
        });
      }
    });
  });

  // build pages

  const globals = {
    copyright: new Date().getFullYear(),
    type: 'interior'
  }

  const pages = [
    {
      filename: 'index',
      name: 'Home',
      type: 'home',
    },
    {
      filename: 'participate',
      name: 'Participate',
    },
    {
      filename: 'volunteer',
      name: 'Volunteer',
    },
    {
      filename: 'sponsor',
      name: 'Sponsor',
    },
    {
      filename: 'about',
      name: 'About',
    },
  ];

  pages.forEach((page) => {
    const current = _.clone(globals);
    _.merge(current, page);
    const compiledFunction = pug.compileFile(`templates/${current.filename}.pug`, { pretty: true, });
    const file = path.join(buildDir, `${current.filename}.html`)
    const compiledPage = compiledFunction(current);
    fs.writeFile(file, compiledPage);
  });

  console.log('pages built');
}

init();
