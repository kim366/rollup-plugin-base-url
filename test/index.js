const test = require('ava');
const rollup = require('rollup');
const { baseUrl } = require('../index.js');

function checkOutput(t, plugins, regex) {
  return rollup.rollup({
    input: 'test/bundle/index.js'
  }).then(bundle => bundle.generate({
    plugins
  })).then(({ output }) => {
    t.assert(output
      .filter(o => o.name.startsWith('index'))[0].code
      .match(regex));
  });
}

test('Chunk has relative path without plugin',
  checkOutput,
  [],
  /import\(['"]\.\/chunk-[0-9a-f]+\.js['"]/);

test('Chunk has absolute path with plugin',
  checkOutput,
  [baseUrl()],
  /import\(['"]\/chunk-[0-9a-f]+\.js['"]/);

test('Chunk has custom absolute path with plugin when specified',
  checkOutput,
  [baseUrl({ url: '/mypath' })],
  /import\(['"]\/mypath\/chunk-[0-9a-f]+\.js['"]/);

test('Chunk has custom absolute path with plugin when specified with dollars',
  checkOutput,
  [baseUrl({ url: '/$1my$1path$1' })],
  /import\(['"]\/\$1my\$1path\$1\/chunk-[0-9a-f]+\.js['"]/);

// --

test('Chunk2 has relative path without plugin',
  checkOutput,
  [],
  /import\(['"]\.\/chunk2-[0-9a-f]+\.js['"]/);

test('Chunk2 has absolute path with plugin',
  checkOutput,
  [baseUrl()],
  /import\(['"]\/chunk2-[0-9a-f]+\.js['"]/);

test('Chunk2 has custom absolute path with plugin when specified',
  checkOutput,
  [baseUrl({ url: '/mypath' })],
  /import\(['"]\/mypath\/chunk2-[0-9a-f]+\.js['"]/);

test('Chunk2 has custom absolute path with plugin when specified with dollars',
  checkOutput,
  [baseUrl({ url: '/$1my$1path$1' })],
  /import\(['"]\/\$1my\$1path\$1\/chunk2-[0-9a-f]+\.js['"]/);
