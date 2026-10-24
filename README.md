# Barbearia Coniutti: site

Site institucional da **Barbearia Coniutti**, barbearia conceito na Av. Papa João XXIII, Cobilândia, Vila Velha – ES.

- Instagram: [@barbearia_coniutti](https://www.instagram.com/barbearia_coniutti)
- Agendamento: [inBarber](https://chat.inbarberapp.com/?id=53e1cbbb-6a3c-4962-9379-295b60906b7e)

É um site estático (HTML, CSS e JavaScript puros, sem framework e sem etapa de build). Para ver no computador, basta abrir o `index.html` no navegador.

## Estrutura

```
index.html              página única com todas as seções
css/styles.css          estilos (cores, tipografia, layout responsivo)
js/main.js              menu do celular, filtros da galeria, foto ampliada
assets/img/
  logo-coniutti.*       logo (provisório, recortado do Instagram)
  favicon-*.png         ícone da aba do navegador
  apple-touch-icon.png  ícone ao salvar o site na tela do celular
  og-image.jpg          imagem que aparece ao compartilhar o link
  trabalhos/            fotos da galeria "Trabalhos"
  espaco/               fotos da seção "O espaço"
```

## Seções

1. **Início**: o título "Na régua." com o efeito de degradê (o disfarçado), botão de agendamento e dados rápidos.
2. **Serviços**: corte, disfarçado, barba, corte + barba, sobrancelha e infantil, cada um com o botão "Agendar".
3. **Trabalhos**: galeria com filtros (Disfarçado, Corte, Barba, Infantil). Clique numa foto para ampliar e use as setas ou deslize o dedo para passar.
4. **O espaço**: a proposta da barbearia conceito e as fotos do salão.
5. **Como agendar**: o passo a passo do agendamento online.
6. **Contato**: endereço, mapa, horários e redes sociais.

## Como trocar as fotos

As imagens atuais com "foto em breve" são provisórias.

1. Salve a foto em `assets/img/trabalhos/` (ou `assets/img/espaco/`). De preferência em `.webp` ou `.jpg`, com uns 1200 px de largura e menos de 300 KB.
2. No `index.html`, procure o item da galeria e troque o caminho **nos dois lugares**: no `href` do link e no `src` da imagem.
3. Atualize o `alt` e o `data-legenda` com uma descrição curta da foto (ex.: "Disfarçado baixo com risco na lateral").
4. A categoria do filtro é o `data-categoria` do `<li>`: `disfarcado`, `corte`, `barba` ou `infantil`.

Use fotos em pé (proporção 4:5, como no Instagram) na galeria. Em "O espaço", a primeira foto é deitada (4:3) e as outras duas são quadradas.

## Publicar o site

O site está no ar no **Cloudflare Pages**: https://barbearia-coniutti.pages.dev

Para publicar uma nova versão depois de alterar os arquivos (precisa estar logado no Cloudflare com `npx wrangler login`):

```sh
mkdir -p dist && cp -r index.html robots.txt sitemap.xml css js assets dist/
npx wrangler pages deploy dist --project-name barbearia-coniutti --branch main
```

Para usar um domínio próprio (ex.: `barbeariaconiutti.com.br`), vá em *Workers & Pages → barbearia-coniutti → Custom domains*. Depois, troque `https://barbearia-coniutti.pages.dev/` pelo novo endereço no `index.html` (canonical, `og:url`, `og:image` e JSON-LD).

## O que ainda falta

- Fotos reais dos cortes, da barba e do espaço.
- Logo original em alta resolução (o atual foi recortado do Instagram).
- Confirmar a lista de serviços e, se quiser, incluir os valores.
- A nota do Google (4,8) está escrita no texto. Atualize de tempos em tempos.
