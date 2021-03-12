function baseDir(options = {}) {
  options = Object.assign({ url: '' }, options);
  options.url = options.url.replace(/\$/g, '$$$$');
  
  return {
    name: 'base-dir',
    renderChunk: (code, { dynamicImports }) => code.replace(
      new RegExp(`\\(['"]\\.\\/(${dynamicImports.join('|')})['"]\\)`, 'g'),
      `("${options.url}/$1")`)
  };
}

exports.baseDir = baseDir;
