import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    images: `${buildFolder}/img/`,
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    files: `${buildFolder}/files/`,
    html: `${buildFolder}/`,
    fonts: `${buildFolder}/fonts/`
  },
  src: {
    images: `${srcFolder}/img/**/*.{jpg,img,jpeg,gif,webp,png}`,
    js: `${srcFolder}/js/main.js`,
    svg: `${srcFolder}/img/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    files: `${srcFolder}/files/**/*.*`,
    html: `${srcFolder}/*.html`,
    fonts: `${srcFolder}/fonts/*.{ttf,woff,wwf,woff2}`,
    svgIcons: `${srcFolder}/svgicons/*.svg`
  },
  watch: {
    images: `${srcFolder}/img/**/*.{jpg,img,jpeg,gif,webp}`,
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    files: `${srcFolder}/files/**/*.*`,
    html: `${srcFolder}/*.html`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ''
}
