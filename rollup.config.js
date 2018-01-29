import svelte from 'rollup-plugin-svelte';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/SimpleForm.html',
  output: {
    sourcemap: true,
    format: 'iife',
    file: 'build/SimpleForm.js',
    name: 'SimpleForm',
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: (css) => {
        css.write('build/SimpleForm.css');
      },

      // this results in smaller CSS files
      cascade: false,
    }),

    // If we're building for production (npm run build
    // instead of npm run dev), transpile and minify
    production && buble({ exclude: 'node_modules/**' }),
    production && uglify(),
  ],
};
