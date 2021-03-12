import('./chunk.js').then(chunk => {
  chunk.f();
});

import('./chunk2.js').then(chunk => {
  chunk.g();
});
