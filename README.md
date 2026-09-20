# Solvia — Energia Solar Fotovoltaica

Landing page de captação de leads para empresa de energia solar.

- **No ar:** https://solvia-coral.vercel.app
- **Stack:** React 19 + Vite 7 + Tailwind 4 (build single-file, `vite-plugin-singlefile`)
- **Destaques:** simulador de economia em tempo real (slider de conta de luz), FAQ por categorias, depoimentos com selo, hero otimizado (LCP ~2s no mobile).

## Desenvolvimento

```bash
npm install
npm run dev      # ambiente local
npm run build    # gera dist/index.html (arquivo único)
```

## Deploy (Vercel)

O build é copiado para a pasta de publicação e deployado via CLI:

```bash
npm run build
cp dist/index.html ../solvia/index.html
cd ../solvia && vercel deploy --prod --yes
```

O alias `solvia-coral.vercel.app` está travado contra auto-atribuição (deploys novos não roubam o domínio). Para publicar uma nova versão:

```bash
vercel alias set https://<novo-deployment>.vercel.app solvia-coral.vercel.app
```
