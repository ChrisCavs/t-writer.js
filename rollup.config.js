import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/type-right.js',
  output: {
    file: 'dist/type-right.js',
    format: 'umd',
    name: 'headsup'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}