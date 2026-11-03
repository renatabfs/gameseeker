const G = [
  {
    n: 'Minecraft',
    y: 2011,
    e: '⛏️',
    h: 140,
    img: 'img/minecraft.jpg',
    t: ['Sandbox', 'Aventura', 'Multiplayer'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Celular'],
    s: 'Um mundo infinito de blocos para explorar, minerar e construir. Sobreviva à noite ou crie o que a imaginação mandar, sozinho ou com amigos.',
  },
  {
    n: 'Celeste',
    y: 2018,
    e: '🏔️',
    h: 320,
    img: 'img/celeste.jpeg',
    t: ['Indie', 'Plataforma'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    s: 'Madeline escala a montanha Celeste enquanto enfrenta seus medos. Plataforma precisa, difícil e com uma história emocionante.',
  },
  {
    n: 'Hollow Knight',
    y: 2017,
    e: '🦋',
    h: 230,
    img: 'img/hollow-knight.jpeg',
    t: ['Indie', 'Aventura', 'Ação'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    s: 'Desça ao reino subterrâneo de Hallownest, um mapa enorme e interligado cheio de insetos, segredos e chefes desafiadores.',
  },
  {
    n: 'Zelda: Tears of the Kingdom',
    y: 2023,
    e: '🗡️',
    h: 150,
    img: 'img/zelda-tok.jpeg',
    t: ['Aventura', 'Mundo aberto'],
    p: ['Switch'],
    s: 'Link explora Hyrule e os céus, com poderes para construir engenhocas e manipular objetos. Liberdade total para resolver cada desafio do seu jeito.',
  },
  {
    n: 'Stardew Valley',
    y: 2016,
    e: '🌾',
    h: 100,
    t: ['Indie', 'Simulação', 'RPG'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Celular'],
    s: 'Herde uma fazenda, plante, crie animais, pesque e faça amizade com a vila. Um jogo relaxante com muito para descobrir.',
  },
  {
    n: 'Hades',
    y: 2020,
    e: '🔥',
    h: 0,
    t: ['Indie', 'Ação', 'RPG'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    s: 'Zagreu tenta fugir do submundo grego em partidas roguelike rápidas e viciantes, com combate fluido e história que avança a cada tentativa.',
  },
  {
    n: 'Elden Ring',
    y: 2022,
    e: '💍',
    h: 40,
    t: ['RPG', 'Ação', 'Mundo aberto'],
    p: ['PC', 'PlayStation', 'Xbox'],
    s: 'Um vasto mundo de fantasia sombria criado pela FromSoftware, com liberdade de exploração e chefes brutais. Prepare-se para morrer (e aprender).',
  },
  {
    n: 'The Witcher 3',
    y: 2015,
    e: '🐺',
    h: 200,
    t: ['RPG', 'Mundo aberto'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    s: 'Geralt de Rívia caça monstros e procura sua filha adotiva em um mundo cheio de escolhas com consequências reais.',
  },
  {
    n: 'Fortnite',
    y: 2017,
    e: '🪂',
    h: 260,
    t: ['Multiplayer', 'Ação', 'Grátis'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    f: 1,
    s: 'Bata-bola com 99 jogadores, construa para ganhar vantagem e seja o último de pé. Eventos e atualizações constantes.',
  },
  {
    n: 'Valorant',
    y: 2020,
    e: '🎯',
    h: 350,
    t: ['Multiplayer', 'Tático', 'Grátis'],
    p: ['PC'],
    f: 1,
    s: 'Shooter tático 5 contra 5 com agentes que têm habilidades únicas. Mira afiada e trabalho em equipe decidem a rodada.',
  },
  {
    n: 'League of Legends',
    y: 2009,
    e: '⚔️',
    h: 215,
    t: ['Multiplayer', 'Estratégia', 'Grátis'],
    p: ['PC'],
    f: 1,
    s: 'O MOBA mais famoso do mundo: dois times de cinco campeões lutam para destruir o Nexus inimigo. Fácil de começar, difícil de dominar.',
  },
  {
    n: 'Rocket League',
    y: 2015,
    e: '🚗',
    h: 25,
    t: ['Multiplayer', 'Esporte', 'Grátis'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    f: 1,
    s: 'Futebol com carros turbinados. Partidas curtas, física divertida e muita jogada maluca no ar.',
  },
  {
    n: 'Among Us',
    y: 2018,
    e: '🚀',
    h: 5,
    t: ['Multiplayer', 'Social', 'Indie'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Celular'],
    s: 'Tripulantes tentam consertar a nave enquanto impostores sabotam tudo. Converse, acuse e descubra quem está mentindo.',
  },
  {
    n: 'Terraria',
    y: 2011,
    e: '💎',
    h: 175,
    t: ['Sandbox', 'Aventura', 'Indie'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch', 'Celular'],
    s: 'Cave, construa, lute contra chefes e explore um mundo 2D cheio de tesouros. Um clássico para jogar sozinho ou em grupo.',
  },
  {
    n: 'Cuphead',
    y: 2017,
    e: '☕',
    h: 45,
    t: ['Indie', 'Ação', 'Plataforma'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    s: 'Run and gun com visual de desenho animado dos anos 1930 e chefes muito difíceis. Cada derrota ensina um pouco mais.',
  },
  {
    n: 'God of War (2018)',
    y: 2018,
    e: '🪓',
    h: 15,
    t: ['Ação', 'Aventura'],
    p: ['PC', 'PlayStation'],
    s: 'Kratos e seu filho Atreus viajam pela mitologia nórdica em uma jornada intensa, com combate pesado e câmera sem cortes.',
  },
  {
    n: 'Red Dead Redemption 2',
    y: 2018,
    e: '🤠',
    h: 30,
    t: ['Aventura', 'Mundo aberto', 'Ação'],
    p: ['PC', 'PlayStation', 'Xbox'],
    s: 'Arthur Morgan e a gangue Van der Linde tentam sobreviver no fim do Velho Oeste. Um mundo vivo e história épica.',
  },
  {
    n: 'Undertale',
    y: 2015,
    e: '💛',
    h: 50,
    t: ['Indie', 'RPG'],
    p: ['PC', 'PlayStation', 'Xbox', 'Switch'],
    s: 'Um RPG em que você pode vencer sem machucar ninguém. Humor, música marcante e escolhas que mudam o final.',
  },
];
const $ = (id) => document.getElementById(id);
let gen = 'Todos',
  favs = new Set();
try {
  favs = new Set(JSON.parse(localStorage.getItem('zp_fav') || '[]'));
} catch (e) {}
const tags = [
  'Todos',
  'Favoritos',
  ...[...new Set(G.flatMap((g) => g.t))].sort(),
];
const plats = [...new Set(G.flatMap((g) => g.p))];
plats.forEach((p) => {
  const o = document.createElement('option');
  o.value = p;
  o.textContent = p;
  $('pf').appendChild(o);
});
tags.forEach((t) => {
  const b = document.createElement('button');
  b.className = 'chip';
  b.textContent = t === 'Favoritos' ? '★ Favoritos' : t;
  b.setAttribute('aria-pressed', t === gen);
  b.onclick = () => {
    gen = t;
    [...$('chips').children].forEach((x) =>
      x.setAttribute('aria-pressed', x === b)
    );
    render();
  };
  $('chips').appendChild(b);
});
function saveFav() {
  try {
    localStorage.setItem('zp_fav', JSON.stringify([...favs]));
  } catch (e) {}
}
function toggleFav(n) {
  favs.has(n) ? favs.delete(n) : favs.add(n);
  saveFav();
  render();
}
const art = (g) =>
  g.img
    ? `<img class="art" src="${g.img}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${g.e}'}))">`
    : `<span aria-hidden="true">${g.e}</span>`;
function render() {
  const q = $('q').value.trim().toLowerCase(),
    pf = $('pf').value;
  const L = G.filter(
    (g) =>
      (gen === 'Todos' ||
        (gen === 'Favoritos' ? favs.has(g.n) : g.t.includes(gen))) &&
      (!pf || g.p.includes(pf)) &&
      (!q ||
        (g.n + ' ' + g.t.join(' ') + ' ' + g.p.join(' ') + ' ' + g.s)
          .toLowerCase()
          .includes(q))
  );
  $('count').textContent =
    L.length + (L.length === 1 ? ' jogo encontrado' : ' jogos encontrados');
  const gr = $('grid');
  gr.innerHTML = '';
  if (!L.length) {
    gr.innerHTML =
      '<p class="empty">Nenhum jogo encontrado. Tente outro termo ou limpe os filtros.</p>';
    return;
  }
  L.forEach((g) => {
    const c = document.createElement('div');
    c.className = 'card';
    c.tabIndex = 0;
    c.setAttribute('role', 'button');
    c.setAttribute('aria-label', 'Ver detalhes de ' + g.n);
    c.innerHTML = `<div class="cover" style="--h:${g.h}">${
      g.f ? '<span class="free">Grátis</span>' : ''
    }${art(g)}<button class="fav" aria-pressed="${favs.has(
      g.n
    )}" aria-label="Favoritar ${g.n}">${
      favs.has(g.n) ? '★' : '☆'
    }</button></div>
<div class="body"><h3>${g.n}</h3><div class="meta">${g.y} · ${g.t
      .slice(0, 2)
      .join(' / ')}</div><p class="syn">${
      g.s.length > 110 ? g.s.slice(0, 107) + '…' : g.s
    }</p><div class="plat">${g.p
      .map((p) => `<span class="pl">${p}</span>`)
      .join('')}</div></div>`;
    c.querySelector('.fav').onclick = (e) => {
      e.stopPropagation();
      toggleFav(g.n);
    };
    c.onclick = () => open(g);
    c.onkeydown = (e) => {
      if (e.target === c && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        open(g);
      }
    };
    gr.appendChild(c);
  });
}
function open(g) {
  $('dc').innerHTML = `<div class="cover" style="--h:${g.h}">${art(
    g
  )}<button class="close" aria-label="Fechar">✕</button></div>
<div class="dbody"><h2>${g.n}</h2><div class="meta">${g.y} · ${g.t.join(
    ' / '
  )}${g.f ? ' · Grátis para jogar' : ''}</div>
<div><h4>Sinopse</h4><p class="syn">${g.s}</p></div>
<div><h4>Onde jogar</h4><div class="plat">${g.p
    .map((p) => `<span class="pl">${p}</span>`)
    .join('')}</div></div>
<button class="chip dfav" id="df" aria-pressed="${favs.has(g.n)}">${
    favs.has(g.n) ? '★ Nos favoritos' : '☆ Adicionar aos favoritos'
  }</button></div>`;
  $('dc').querySelector('.close').onclick = () => $('dlg').close();
  $('df').onclick = () => {
    toggleFav(g.n);
    open(g);
  };
  if (!$('dlg').open) $('dlg').showModal();
}
$('dlg').addEventListener('click', (e) => {
  if (e.target === $('dlg')) $('dlg').close();
});
$('q').oninput = render;
$('pf').onchange = render;
render();
