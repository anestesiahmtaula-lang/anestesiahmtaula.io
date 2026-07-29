# SAHMT - GESTAO

PWA institucional do nucleo de governanca SAHMT, preparado para uso em smartphone e desktop e empacotado para publicacao no GitHub Pages.

## O que este repositorio ja entrega

- shell PWA com `manifest`, `service worker` e tela offline
- navegacao interna entre areas com perfis simulados
- modulos especializados do primeiro incremento ja conectados ao app
- fallback para rotas SPA no GitHub Pages com geracao de `404.html`
- pacote final de `dist/` pronto para Pages com `.nojekyll`

## Publicacao no repositorio de destino

Repositorio previsto: [anestesiahmtaula-lang/anestesiahmtaula.io](https://github.com/anestesiahmtaula-lang/anestesiahmtaula.io)

1. Envie o conteudo deste projeto para a branch `main`.
2. No GitHub, abra `Settings > Pages`.
3. Em `Source`, escolha `GitHub Actions`.
4. A action `Deploy GitHub Pages` fara o build e a publicacao automaticamente.

## Base de publicacao

O workflow foi configurado para publicar por padrao no caminho `/<nome-do-repositorio>/`, que cobre o cenario comum de GitHub Pages em repositorio de projeto.

Se depois voce conectar um dominio proprio e quiser publicar na raiz `/`, ajuste a variavel `VITE_BASE_PATH` do workflow para:

```yaml
env:
  VITE_BASE_PATH: /
```

## Comandos locais

```bash
pnpm install
pnpm build
pnpm preview
```

O comando de build tambem gera `dist/404.html` e `dist/.nojekyll` para o handoff do GitHub Pages.
