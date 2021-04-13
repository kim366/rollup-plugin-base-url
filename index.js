function baseUrl(options = {}) {
  options = Object.assign({ url: '', staticImports: false }, options);
  options.url = options.url.replace(/\$/g, '$$$$');

  return {
    name: 'base-url',
    renderChunk: (code, { dynamicImports, imports }) => {
      if (options.staticImports) {
        code = code.replace(
          new RegExp(`from \['"]\\.\\/(${imports.join('|')})['"]`, 'g'),
          `from "${options.url}/$1"`)
      }
      return code.replace(
        new RegExp(`\\(['"]\\.\\/(${dynamicImports.join('|')})['"]\\)`, 'g'),
        `("${options.url}/$1")`)
    }
  };
}

exports.baseUrl = baseUrl;
