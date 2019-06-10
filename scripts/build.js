const { resolve } = require('path');
const bundle = require('microbundle');
const del = require('del');
(async function() {
  const cwd = resolve(__dirname, '..');

  try {
    await del(['dist/**/*'], { cwd });
    const output = await bundle({
      entries: [
        './src/decorator.ts',
        './src/register.ts',
        './src/frameworks.ts',
      ],
      format: 'cjs,es',
      output: 'dist',
      cwd,
    });
    console.log(output);
  } catch (err) {
    console.error(err);
  }
})();
