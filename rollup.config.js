import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/type-write.js',
  output: {
    file: 'dist/type-write.js',
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