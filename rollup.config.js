import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import {preserveDirective} from "rollup-preserve-directives";
import {defineConfig} from "rollup";

export default defineConfig([
    {
        input: "src/index.tsx",
        output: [
            {
                file: 'dist/index.js',
                format: "esm",
                sourcemap: true
            }
        ],
        plugins: [
            typescript({tsconfig: "./tsconfig.json"}),
            preserveDirective()
        ],
        external: ["react", "react-dom", 'react/jsx-runtime', 'jotai'],
    },
    {
        input: "src/index.tsx",
        output: [{file: "dist/types.d.ts", format: "es"}],
        plugins: [dts()],
    },
]);