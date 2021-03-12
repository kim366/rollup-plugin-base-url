function baseUrl(options = {}) {
  options = Object.assign({ url: '' }, options);
  options.url = options.url.replace(/\$/g, '$$$$');

  return {
    name: 'base-url',
    renderChunk: (code, { dynamicImports }) => code.replace(
      new RegExp(`\\(['"]\\.\\/(${dynamicImports.join('|')})['"]\\)`, 'g'),
      `("${options.url}/$1")`)
  };
}

exports.baseUrl = baseUrl;
