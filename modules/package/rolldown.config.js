import { defineConfig } from 'rolldown'
import { dts } from 'rolldown-plugin-dts'

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        minify: true,
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime', '@notionhq/client', 'ohash']
  },
  {
    input: 'src/index.ts',
    plugins: [
      dts({
        emitDtsOnly: true
      })
    ],
    output: [
      {
        dir: 'dist',
        format: 'esm'
      }
    ]
  }
])
