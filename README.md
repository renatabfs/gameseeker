# 🎮 GameSeeker

Catálogo de jogos para descobrir o próximo título: busque por gênero e plataforma, leia a sinopse e salve seus favoritos.

🔗 **[Ver o site](https://renatabfs.github.io/gameseeker/)**

Feito com **HTML, CSS e JavaScript puros**, sem frameworks.

## ✨ Funcionalidades

- **Busca**, filtro por **vários gêneros** ao mesmo tempo e por plataforma, e **ordenação** por nome ou ano
- **Links compartilháveis**: filtros e jogo aberto ficam na URL (`?genero=Indie&plataforma=PC&jogo=Hades`) e o botão voltar funciona
- **Favoritos** salvos no navegador, botão **Surpreenda-me** e **jogos parecidos** no modal de cada jogo
- **Banner com carrossel**, jogos em destaque e botão **Carregar mais**
- **Tema claro e escuro**, que lembra a sua escolha
- **Responsivo** e acessível: navegação por teclado, `aria-label` e suporte a `prefers-reduced-motion`

## 🚀 Como rodar

```bash
git clone https://github.com/renatabfs/gameseeker.git
cd gameseeker
npm install
npm start
```

Os jogos são carregados do `games.json` com `fetch`, então abrir o `index.html` com duplo clique não funciona. Use o `npm start`, a extensão Live Server do VS Code ou `python3 -m http.server`.

## 🗂️ Estrutura

```
├── index.html   # estrutura da página
├── styles.css   # estilos e tema claro/escuro
├── script.js    # busca, filtros, favoritos, modal e banner
├── games.json   # lista de jogos
└── img/         # capas e imagens do banner
```

## ➕ Adicionando jogos

Adicione um objeto ao `games.json`, separado dos outros por vírgula. Os gêneros e as plataformas novos aparecem nos filtros sozinhos.

```json
{
  "n": "Nome do jogo",
  "y": 2024,
  "e": "🎮",
  "h": 200,
  "img": "img/nome-do-jogo.jpg",
  "t": ["Ação", "Indie"],
  "p": ["PC", "PlayStation"],
  "s": "Sinopse curta do jogo."
}
```

- `"f": 1` marca o jogo como gratuito e `"d": 1` coloca ele nos destaques (aparecem até 4)
- `h` é a cor do degradê (0 a 360) e `e` é o emoji que aparece se a imagem não carregar
- Imagens em **16:9** (por exemplo, 640×360), dentro da pasta `img/`
- O JSON não aceita comentários nem vírgula depois do último item

## 📌 Observações

As plataformas podem mudar com o tempo, confira sempre a loja oficial. Nomes de jogos, marcas e imagens pertencem aos seus donos e são usados só para fins ilustrativos.