import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import { preserveDirective } from 'rollup-preserve-directives'

export default defineConfig([
  {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' }), preserveDirective()],
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@notionhq/client',
      '@wanner.work/image',
      'ohash'
    ]
  },
  {
    input: 'src/index.tsx',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  },
  {
    input: 'src/helper.tsx',
    output: [
      {
        file: 'helper/index.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' }), preserveDirective()],
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@notionhq/client',
      '@wanner.work/image',
      'ohash'
    ]
  },
  {
    input: 'src/helper.tsx',
    output: [{ file: 'helper/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
])
