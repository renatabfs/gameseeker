let G = [];
const $ = (id) => document.getElementById(id);
let gens = new Set(),
  favs = new Set();
try {
  favs = new Set(JSON.parse(localStorage.getItem("zp_fav") || "[]"));
} catch (e) { }

function readURL() {
  const p = new URLSearchParams(location.search);
  const g = p.get("genero");
  gens = new Set(g ? g.split(",").filter(Boolean) : []);
  $("pf").value = p.get("plataforma") || "";
  $("q").value = p.get("busca") || "";
  $("sort").value = p.get("ordem") || "";
}

function writeURL(push) {
  const p = new URLSearchParams();
  if (gens.size) p.set("genero", [...gens].join(","));
  if ($("pf").value) p.set("plataforma", $("pf").value);
  if ($("q").value.trim()) p.set("busca", $("q").value.trim());
  if ($("sort").value) p.set("ordem", $("sort").value);
  if (current) p.set("jogo", current.n);
  const qs = p.toString();
  const url = qs ? "?" + qs : location.pathname;
  push ? history.pushState(null, "", url) : history.replaceState(null, "", url);
}

function syncChips() {
  [...$("chips").children].forEach((x) => {
    const t = x.dataset.tag;
    x.setAttribute(
      "aria-pressed",
      t === "Todos" ? gens.size === 0 : gens.has(t)
    );
  });
}
function clearFilters() {
  gens.clear();
  $("pf").value = "";
  $("q").value = "";
  syncChips();
  render();
  writeURL(true);
}
let current = null;
let last = -1;
const PAGE = 12;
let shown = PAGE;
let lastKey = "";
function surprise() {
  if (!G.length) return;
  let i;
  do {
    i = Math.floor(Math.random() * G.length);
  } while (G.length > 1 && i === last);
  last = i;
  open(G[i]);
}

const ICONS = {
  Todos: "grid",
  Favoritos: "heart",
  Aventura: "compass",
  Ação: "crosshair",
  FPS: "target",
  RPG: "shield",
  Estratégia: "pawn",
  Indie: "gamepad",
  Multiplayer: "users",
  Grátis: "gift",
  "Mundo aberto": "globe",
  Social: "chat",
  Sandbox: "box",
  "Battle Royale": "flame",
  Corrida: "car",
  Drama: "drama",
  Esporte: "trophy",
  "Hack and Slash": "sword",
  Interativo: "pointer",
  Plataforma: "stairs",
  Simulação: "building",
  Tático: "clipboard",
};

const icon = (n) =>
  `<svg class="ic" aria-hidden="true"><use href="#i-${n}"/></svg>`;

const SLIDES = [
  {
    a: "Encontre, explore e jogue ",
    b: "sem limites!",
    t: "Descubra os melhores jogos, e encontre sua próxima aventura.",
    img: "img/hero.jpeg"
  },
  {
    a: "Não sabe o que jogar? ",
    b: "Surpreenda-se!",
    t: "Use o botão Surpreenda-me e deixe o acaso escolher por você.",
    img: "img/hero2.jpeg"
  },
  {
    a: "Guarde seus ",
    b: "favoritos",
    t: "Marque com o coração os jogos que você quer jogar depois.",
    img: "img/hero3.jpeg"
  },
  {
    a: "Filtre por ",
    b: "gênero e plataforma",
    t: "Ache rápido o que combina com o seu console ou PC.",
    img: "img/hero4.jpeg"
  },
];

function initHero() {
  const hero = document.querySelector(".hero");
  const title = document.getElementById("hero-title");
  const text = document.getElementById("hero-text");
  const dots = document.getElementById("hero-dots");
  let cur = 0;

  function show(i) {
    cur = (i + SLIDES.length) % SLIDES.length;
    const s = SLIDES[cur];
    const span = document.createElement("span");
    span.textContent = s.b;
    title.replaceChildren(s.a, span);
    text.textContent = s.t;
    hero.style.setProperty("--hero-img", `url("${s.img}")`);
    [...dots.children].forEach((d, n) =>
      d.setAttribute("aria-current", n === cur ? "true" : "false")
    );
  }

  SLIDES.forEach((_, n) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "hero-dot";
    d.setAttribute("aria-label", "Slide " + (n + 1));
    d.onclick = () => show(n);
    dots.append(d);
  });

  document.getElementById("hero-prev").onclick = () => show(cur - 1);
  document.getElementById("hero-next").onclick = () => show(cur + 1);
  show(0);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer;

  function stop() {
    clearInterval(timer);
  }

  function start() {
    if (reduce) return;
    stop();
    timer = setInterval(() => show(cur + 1), 4000);
  }

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);
  start();
}

async function init() {
  try {
    const res = await fetch("games.json");
    if (!res.ok) throw new Error(res.status);
    G = await res.json();
    $("total").textContent = G.length;
    readURL();
    const generos = [...new Set(G.flatMap((g) => g.t))];
    const validos = new Set([...generos, "Favoritos"]);
    gens = new Set([...gens].filter((t) => validos.has(t)));
  } catch (e) {
    $("count").textContent = "Não foi possível carregar os jogos.";
    return;
  }

  const PRIORITY = ["Aventura", "Ação", "RPG", "Estratégia", "FPS", "Indie", "Multiplayer"];
  const rest = [...new Set(G.flatMap((g) => g.t))].sort();
  const tags = [
    "Todos",
    "Favoritos",
    ...PRIORITY.filter((t) => rest.includes(t)),
    ...rest.filter((t) => !PRIORITY.includes(t)),
  ];
  const plats = [...new Set(G.flatMap((g) => g.p))];
  plats.forEach((p) => {
    const o = document.createElement("option");
    o.value = p;
    o.textContent = p;
    $("pf").appendChild(o);
  });
  $("pf").value = new URLSearchParams(location.search).get("plataforma") || "";
  tags.forEach((t) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.dataset.tag = t;
    const ic = document.createElement("span");
    ic.setAttribute("aria-hidden", "true");
    ic.innerHTML = icon(ICONS[t] || "gamepad");
    b.append(ic, " " + t);
    b.setAttribute(
      "aria-pressed",
      t === "Todos" ? gens.size === 0 : gens.has(t)
    );
    b.onclick = () => {
      if (t === "Todos") gens.clear();
      else if (gens.has(t)) gens.delete(t);
      else gens.add(t);
      syncChips();
      render();
      writeURL(true);
    };
    $("chips").appendChild(b);
  });

  render();
  const j = new URLSearchParams(location.search).get("jogo");
  const g = G.find((x) => x.n === j);
  if (g) open(g, true);
}
function saveFav() {
  try {
    localStorage.setItem("zp_fav", JSON.stringify([...favs]));
  } catch (e) { }
}
function toggleFav(n) {
  favs.has(n) ? favs.delete(n) : favs.add(n);
  saveFav();
  render();
}
const art = (g) =>
  g.img
    ? `<img class="art" src="${g.img}" alt="" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{textContent:'${g.e || "🎮"}'}))">`
    : `<span aria-hidden="true">${g.e || "🎮"}</span>`;

const sorters = {
  nome: (a, b) => a.n.localeCompare(b.n, "pt-BR"),
  novos: (a, b) => b.y - a.y || a.n.localeCompare(b.n, "pt-BR"),
  antigos: (a, b) => a.y - b.y || a.n.localeCompare(b.n, "pt-BR"),
};

function makeCard(g) {
  const c = document.createElement("div");
  c.className = "card";
  c.tabIndex = 0;
  c.setAttribute("role", "button");
  c.setAttribute("aria-label", "Ver detalhes de " + g.n);
  c.innerHTML = `<div class="cover" style="--h:${g.h}">${g.f ? '<span class="free">Grátis</span>' : ""
    }${art(g)}<button class="fav" aria-pressed="${favs.has(
      g.n
    )}" aria-label="Favoritar ${g.n}">${favs.has(g.n) ? "♥" : "♡"}</button></div>
<div class="body"><h3>${g.n}</h3><div class="meta">${g.y} · ${g.t
      .slice(0, 2)
      .join(" / ")}</div><p class="syn">${g.s.length > 110 ? g.s.slice(0, 107) + "…" : g.s
    }</p><div class="plat">${g.p
      .slice(0, 4)
      .map((p) => `<span class="pl">${p}</span>`)
      .join("")}${g.p.length > 4 ? `<span class="pl">+${g.p.length - 4}</span>` : ""
    }</div></div>`;
  c.querySelector(".fav").onclick = (e) => {
    e.stopPropagation();
    toggleFav(g.n);
  };
  c.onclick = () => open(g);
  c.onkeydown = (e) => {
    if (e.target === c && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      open(g);
    }
  };
  return c;
}

function renderFeatured() {
  const feat = G.filter((g) => g.d).slice(0, 4);
  const noFilters = !(gens.size || $("pf").value || $("q").value.trim());
  $("featured").hidden = !(noFilters && feat.length);
  const row = $("feat-row");
  row.replaceChildren();
  feat.forEach((g) => row.append(makeCard(g)));
}

function render() {
  const q = $("q").value.trim().toLowerCase(),
    pf = $("pf").value;
  $("clear").hidden = !(gens.size || pf || q);
  renderFeatured();
  const onlyFav = gens.size === 1 && gens.has("Favoritos");
  $("nav-home").setAttribute("aria-current", !onlyFav);
  $("nav-fav").setAttribute("aria-current", onlyFav);
  const L = G.filter(
    (g) =>
      [...gens].every((t) =>
        t === "Favoritos" ? favs.has(g.n) : g.t.includes(t)
      ) &&
      (!pf || g.p.includes(pf)) &&
      (!q ||
        (g.n + " " + g.t.join(" ") + " " + g.p.join(" ") + " " + g.s)
          .toLowerCase()
          .includes(q))
  );
  const so = $("sort").value;
  if (sorters[so]) L.sort(sorters[so]);
  const key = [...gens].join(",") + "|" + pf + "|" + q + "|" + so;
  if (key !== lastKey) {
    shown = PAGE;
    lastKey = key;
  }
  $("count").textContent =
    L.length + (L.length === 1 ? " jogo encontrado" : " jogos encontrados");
  const gr = $("grid");
  gr.innerHTML = "";
  $("more").hidden = true;
  if (!L.length) {
    gr.innerHTML =
      '<div class="empty"><p>Nenhum jogo encontrado. Tente outro termo ou limpe os filtros.</p><button class="chip" id="clear2" type="button">Limpar filtros</button></div>';
    $("clear2").onclick = clearFilters;
    return;
  }
  L.slice(0, shown).forEach((g) => gr.appendChild(makeCard(g)));
  $("more").hidden = L.length <= shown;
  $("more").textContent = `Carregar mais (${L.length - shown} restantes)`;
}

function related(g) {
  return G.filter((x) => x.n !== g.n)
    .map((x) => ({ x, score: x.t.filter((t) => g.t.includes(t)).length }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || b.x.y - a.x.y)
    .slice(0, 3)
    .map((r) => r.x);
}

function relatedHTML(g) {
  const list = related(g);
  if (!list.length) return "";
  return `<div><h4>Jogos parecidos</h4><div class="rel">${list
    .map(
      (r) =>
        `<button class="chip" type="button" data-i="${G.indexOf(r)}">${r.n}</button>`
    )
    .join("")}</div></div>`;
}

function open(g, silent) {
  const wasOpen = $("dlg").open;
  current = g;
  $("dc").innerHTML = `<div class="cover" style="--h:${g.h}">${art(
    g
  )}<button class="close" aria-label="Fechar">✕</button></div>
<div class="dbody"><h2>${g.n}</h2><div class="meta">${g.y} · ${g.t.join(
    " / "
  )}${g.f ? " · Grátis para jogar" : ""}</div>
<div><h4>Sinopse</h4><p class="syn">${g.s}</p></div>
<div><h4>Onde jogar</h4><div class="plat">${g.p
      .map((p) => `<span class="pl">${p}</span>`)
      .join("")}</div></div>
      ${relatedHTML(g)}
<button class="chip dfav" id="df" aria-pressed="${favs.has(g.n)}">${favs.has(g.n) ? "♥ Nos favoritos" : "♡ Adicionar aos favoritos"
    }</button></div>`;
  $("dc").querySelector(".close").onclick = () => $("dlg").close();
  $("dc").querySelectorAll(".rel .chip").forEach((b) => {
    b.onclick = () => open(G[b.dataset.i]);
  });
  $("df").onclick = () => {
    toggleFav(g.n);
    open(g);
  };
  if (!wasOpen) $("dlg").showModal();
  if (!silent) writeURL(!wasOpen);
}
$("dlg").addEventListener("click", (e) => {
  if (e.target === $("dlg")) $("dlg").close();
});
$("dlg").addEventListener("close", () => {
  current = null;
  writeURL(false);
});
$("q").oninput = () => {
  render();
  writeURL(false);
};
$("pf").onchange = () => {
  render();
  writeURL(true);
};
$("sort").onchange = () => {
  render();
  writeURL(true);
};
window.addEventListener("popstate", () => {
  readURL();
  syncChips();
  render();
  const j = new URLSearchParams(location.search).get("jogo");
  const g = G.find((x) => x.n === j);
  if (g) open(g, true);
  else if ($("dlg").open) $("dlg").close();
});
$("clear").onclick = clearFilters;
$("more").onclick = () => {
  shown += PAGE;
  render();
};
$("random").onclick = surprise;
$("nav-home").onclick = clearFilters;
$("nav-fav").onclick = () => {
  gens = new Set(["Favoritos"]);
  syncChips();
  render();
  writeURL(true);
};

function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  $("theme").innerHTML = icon(t === "dark" ? "sun" : "moon");
  $("theme").setAttribute(
    "aria-label",
    t === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro"
  );
}

$("theme").onclick = () => {
  const t =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(t);
  try {
    localStorage.setItem("zp_theme", t);
  } catch (e) { }
};

$("chips-more").onclick = () => {
  const closed = $("chips").classList.toggle("collapsed");
  $("chips-more").textContent = closed ? "Ver mais gêneros ▾" : "Ver menos ▴";
  $("chips-more").setAttribute("aria-expanded", !closed);
};

applyTheme(document.documentElement.dataset.theme || "dark");
init();
initHero();
