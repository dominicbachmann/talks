import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'trusted-types-demo-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/demos/xss-enforced') || req.url?.startsWith('/demos/xss-fixed')) {
            res.setHeader(
              'Content-Security-Policy',
              "require-trusted-types-for 'script'; trusted-types my-policy default dompurify"
            );
          }
          next();
        });
      },
    },
  ],
})
