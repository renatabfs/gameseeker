let G = [];
const $ = (id) => document.getElementById(id);
let gen = 'Todos',
  favs = new Set();
try {
  favs = new Set(JSON.parse(localStorage.getItem('zp_fav') || '[]'));
} catch (e) { }
async function init() {
  try {
    const res = await fetch('games.json');
    if (!res.ok) throw new Error(res.status);
    G = await res.json();
  } catch (e) {
    $('count').textContent = 'Não foi possível carregar os jogos.';
    return;
  }

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

  render();
}
function saveFav() {
  try {
    localStorage.setItem('zp_fav', JSON.stringify([...favs]));
  } catch (e) { }
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
    c.innerHTML = `<div class="cover" style="--h:${g.h}">${g.f ? '<span class="free">Grátis</span>' : ''
      }${art(g)}<button class="fav" aria-pressed="${favs.has(
        g.n
      )}" aria-label="Favoritar ${g.n}">${favs.has(g.n) ? '★' : '☆'
      }</button></div>
<div class="body"><h3>${g.n}</h3><div class="meta">${g.y} · ${g.t
        .slice(0, 2)
        .join(' / ')}</div><p class="syn">${g.s.length > 110 ? g.s.slice(0, 107) + '…' : g.s
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
<button class="chip dfav" id="df" aria-pressed="${favs.has(g.n)}">${favs.has(g.n) ? '★ Nos favoritos' : '☆ Adicionar aos favoritos'
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
init();
