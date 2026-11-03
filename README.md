# 🎮 GameSeeker
 
Catálogo de jogos para você descobrir o próximo título: leia a sinopse, veja em quais plataformas ele roda e salve seus favoritos.
 
Feito com **HTML, CSS e JavaScript puros**, sem frameworks e sem etapa de build.
 
## ✨ Funcionalidades
 
- **Busca** por nome, gênero, plataforma ou trecho da sinopse
- **Filtro por gênero** (chips roláveis) e **por plataforma** (lista suspensa)
- **Favoritos** salvos no navegador (`localStorage`), com filtro próprio
- **Detalhes do jogo** em um modal com sinopse, ano, gêneros e plataformas
- Selo **Grátis** para jogos gratuitos
- **Imagens de capa** com fallback automático para emoji quando a imagem não existe
- **Responsivo** e com foco em acessibilidade: navegação por teclado, `aria-label`, `aria-live` na contagem de resultados e suporte a `prefers-reduced-motion`
## 🗂️ Estrutura do projeto
 
```
GameSeeker/
├── index.html    # estrutura da página
├── style.css     # todos os estilos
├── script.js     # lista de jogos e lógica (busca, filtros, favoritos, modal)
└── img/          # imagens de capa dos jogos
```
 
## 🚀 Como rodar
 
Não precisa instalar nada.
 
1. Clone o repositório ou baixe os arquivos:
```bash
   git clone https://github.com/SEU-USUARIO/GameSeeker.git
```
2. Abra o `index.html` no navegador.
Se preferir um servidor local (por exemplo, com a extensão Live Server do VS Code ou `python3 -m http.server`), também funciona.
 
## ➕ Como adicionar um jogo
 
Abra o `script.js` e adicione um objeto na lista `G`:
 
```js
{
  n: 'Nome do jogo',
  y: 2024,                          // ano de lançamento
  e: '🎮',                          // emoji de fallback
  h: 200,                           // matiz (0–360) do gradiente da capa
  t: ['Ação', 'Indie'],             // gêneros
  p: ['PC', 'PlayStation'],         // plataformas
  f: 1,                             // opcional: use apenas se o jogo for grátis
  s: 'Sinopse curta do jogo.'
}
```
 
Os gêneros e as plataformas novos aparecem nos filtros automaticamente.
 
## 🖼️ Como adicionar imagens
 
As imagens ficam na pasta `img/` e o nome do arquivo é gerado a partir do nome do jogo: tudo em minúsculas, sem acentos e com hífens no lugar de espaços e símbolos.
 
| Jogo | Arquivo |
|---|---|
| Minecraft | `img/minecraft.jpg` |
| Hollow Knight | `img/hollow-knight.jpg` |
| God of War (2018) | `img/god-of-war-2018.jpg` |
 
Recomendações:
 
- Use a mesma extensão em todos os arquivos (`.jpg` por padrão)
- Prefira imagens horizontais, em proporção próxima de 2:1
- Jogos sem imagem continuam exibindo o emoji
## 🛠️ Tecnologias
 
- HTML5
- CSS3 (variáveis, grid, flexbox, `<dialog>`)
- JavaScript (ES6+)
- [Google Fonts](https://fonts.google.com/): Orbitron e Rubik
## 📌 Observações
 
- As plataformas listadas podem mudar com o tempo. Confira sempre a loja oficial antes de comprar.
- Nomes de jogos, marcas e imagens pertencem aos seus respectivos donos e são usados apenas para fins ilustrativos.
 