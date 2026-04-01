import { defineConfig } from 'father';

export default defineConfig({
    // more father config: https://github.com/umijs/father/blob/master/docs/config.md
    // esm: { output: 'packages/esm' },
    esm: { input: 'src/components', output: 'packages/dist' },
});
