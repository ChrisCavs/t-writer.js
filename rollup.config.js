import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/t-writer.js',
  output: {
    file: 'dist/t-writer.js',
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