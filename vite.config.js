import ViteGlsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    ViteGlsl(),
  ],
  assetsInclude: /\.(png|jpg|jpeg|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf|glb)$/,
});

