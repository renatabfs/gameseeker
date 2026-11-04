let G = [];
const $ = (id) => document.getElementById(id);
let gen = 'Todos',
  favs = new Set();
try {
  favs = new Set(JSON.parse(localStorage.getItem('zp_fav') || '[]'));
} catch (e) { }

function readURL() {
  const p = new URLSearchParams(location.search);
  gen = p.get('genero') || 'Todos';
  $('pf').value = p.get('plataforma') || '';
  $('q').value = p.get('busca') || '';
}

function writeURL(push) {
  const p = new URLSearchParams();
  if (gen !== 'Todos') p.set('genero', gen);
  if ($('pf').value) p.set('plataforma', $('pf').value);
  if ($('q').value.trim()) p.set('busca', $('q').value.trim());
  const qs = p.toString();
  const url = qs ? '?' + qs : location.pathname;
  push ? history.pushState(null, '', url) : history.replaceState(null, '', url);
}

function syncChips() {
  [...$('chips').children].forEach((x) =>
    x.setAttribute('aria-pressed', x.dataset.tag === gen)
  );
}
function clearFilters() {
  gen = 'Todos';
  $('pf').value = '';
  $('q').value = '';
  syncChips();
  render();
  writeURL(true);
}

let last = -1;
function surprise() {
  if (!G.length) return;
  let i;
  do {
    i = Math.floor(Math.random() * G.length);
  } while (G.length > 1 && i === last);
  last = i;
  open(G[i]);
}

async function init() {
  try {
    const res = await fetch('games.json');
    if (!res.ok) throw new Error(res.status);
    G = await res.json();
    readURL();
    const generos = [...new Set(G.flatMap((g) => g.t))];
    if (gen !== 'Todos' && gen !== 'Favoritos' && !generos.includes(gen)) gen = 'Todos';
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
  $('pf').value = new URLSearchParams(location.search).get('plataforma') || '';
  tags.forEach((t) => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.dataset.tag = t;
    b.textContent = t === 'Favoritos' ? '★ Favoritos' : t;
    b.setAttribute('aria-pressed', t === gen);
    b.onclick = () => {
      gen = t;
      [...$('chips').children].forEach((x) =>
        x.setAttribute('aria-pressed', x === b)
      );
      render();
      writeURL(true);
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
  $('clear').hidden = !(gen !== 'Todos' || pf || q);
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
      '<div class="empty"><p>Nenhum jogo encontrado. Tente outro termo ou limpe os filtros.</p><button class="chip" id="clear2" type="button">Limpar filtros</button></div>';
    $('clear2').onclick = clearFilters;
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
$('q').oninput = () => {
  render();
  writeURL(false);
};
$('pf').onchange = () => {
  render();
  writeURL(true);
};
window.addEventListener('popstate', () => {
  readURL();
  syncChips();
  render();
});
$('clear').onclick = clearFilters;
$('random').onclick = surprise;
init();