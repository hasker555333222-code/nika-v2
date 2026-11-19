/* ============================================================
   НИКА — логика макета v2 (vanilla JS, без зависимостей)
   ============================================================ */
(() => {
'use strict';

/* ---------- данные ---------- */
// Базовый путь к медиа. Для продакшена положите папку media рядом с index.html и замените на 'media'.
const MEDIA = 'https://selena28lena.github.io/nika/media';

const TYPES = { straight:'Прямой', corner:'Угловой', u:'П-образный' };
const PLURAL = { straight:'Прямые', corner:'Угловые', u:'П-образные' };

const PRODUCTS = [
  { id:'nika-grand', name:'Модель 01', type:'u', tag:'Визуализация', isNew:true, dir:'nika-grand-concept', ext:'jpg', photos:[3,13,1,2,9,10,11,12,4,5,6,7,8],
    desc:'П-образный диван с двумя оттоманками и стёганым сиденьем. Собирается модулями, поэтому длину каждой стороны считаем под вашу комнату. В разложенном виде — спальное место размером с двуспальную кровать.',
    specs:[['Размеры','По вашим размерам'],['Форма','П-образная, модульная'],['Хранение','Ящики в оттоманках'],['Ткань','На выбор, есть «антикоготь»']], recolor:true },
  { id:'model-02', name:'Модель 02', type:'corner', isNew:true },
  { id:'model-03', name:'Модель 03', type:'straight' },
  { id:'model-04', name:'Модель 04', type:'u', isNew:true },
  { id:'model-05', name:'Модель 05', type:'straight' },
  { id:'model-06', name:'Модель 06', type:'corner' },
  { id:'model-07', name:'Модель 07', type:'straight' },
  { id:'model-08', name:'Модель 08', type:'corner' },
  { id:'model-09', name:'Модель 09', type:'straight' },
  { id:'model-10', name:'Модель 10', type:'corner' },
  { id:'model-11', name:'Модель 11', type:'straight' },
  { id:'model-12', name:'Модель 12', type:'corner' },
  { id:'model-13', name:'Модель 13', type:'straight' },
  { id:'model-14', name:'Модель 14', type:'corner' },
  { id:'model-15', name:'Модель 15', type:'straight' },
  { id:'model-16', name:'Модель 16', type:'straight' },
  { id:'model-17', name:'Модель 17', type:'straight' },
  { id:'model-18', name:'Модель 18', type:'straight' },
  { id:'model-19', name:'Модель 19', type:'straight' },
  { id:'model-20', name:'Модель 20', type:'straight' },
  { id:'model-21', name:'Модель 21', type:'straight' },
];
PRODUCTS.forEach(p => {
  p.dir = p.dir || p.id; p.ext = p.ext || 'webp'; p.photos = p.photos || [1];
  p.typeName = TYPES[p.type];
  p.img = (n, size) => `${MEDIA}/products/${p.dir}/${n}${size ? '-' + size : ''}.${p.ext}`;
  p.cover = p.img(p.photos[0], 'm');
  if (!p.desc) p.desc = `${p.typeName} диван, который мы шьём по вашим размерам: ширину, глубину сиденья и высоту подлокотников подбираем под комнату. Механизм, наполнение и ткань — на выбор, в том числе «антикоготь».`;
  if (!p.specs) p.specs = p.type === 'corner'
    ? [['Размеры','По вашим размерам'],['Угол','Левый или правый'],['Механизм','На выбор'],['Ткань','На выбор, есть «антикоготь»']]
    : p.type === 'u'
    ? [['Размеры','По вашей комнате'],['Форма','П-образная, модульная'],['Хранение','Ящики в оттоманках'],['Ткань','На выбор, есть «антикоготь»']]
    : [['Размеры','По вашим размерам'],['Механизм','На выбор'],['Спальное место','Ровное, без стыка'],['Ткань','На выбор, есть «антикоготь»']];
});
const byId = id => PRODUCTS.find(p => p.id === id);

const FABRICS = [
  { id:'bezh', name:'Беж', kind:'Велюр', color:null },
  { id:'mokko', name:'Мокко', kind:'Велюр', color:'#6f4e3a' },
  { id:'karamel', name:'Карамель', kind:'Велюр', color:'#b9803f' },
  { id:'molochnyy', name:'Молочный', kind:'Велюр', color:'#efe4d0' },
  { id:'pudra', name:'Пудра', kind:'Рогожка', color:'#d9a9a0' },
  { id:'svetlo-seryy', name:'Светло-серый', kind:'Рогожка', color:'#b9b5ad' },
  { id:'grafit', name:'Графит', kind:'Рогожка', color:'#5a5a5c' },
  { id:'olivka', name:'Олива', kind:'Антикоготь', color:'#7e8a62' },
];
FABRICS.forEach(f => f.img = `${MEDIA}/fabrics/${f.id}.webp`);

const REVIEWS = [
  { text:'Всё быстро и качественно! Диван отличного качества. Обговорили все детали, и уже через неделю всё было готово, привезли раньше обещанного срока. Спасибо Павлу!', name:'Иляна Чернова', meta:'июль 2025 · 2ГИС' },
  { text:'Заказывали диван, обговорили при заказе все детали. Всё чётко, быстро, качественно! Доставка по договорённости — привезли, собрали. Мы довольны!', name:'Ирина Н.', meta:'декабрь 2024 · 2ГИС' },
  { text:'Заказывали диван для мамы. Ткань на высшем уровне — антикоготь. Огромное ровное спальное место в разложенном виде, а сам диван выглядит очень компактно. Два бельевых ящика — это здорово! Всё сделали даже быстрее срока.', name:'Татьяна', meta:'апрель 2020 · 2ГИС' },
];

const FAQ = [
  ['Сколько стоит диван?', 'Цена зависит от размеров, ткани, механизма и наполнения. Ориентир можно получить в калькуляторе на этой странице, а точную сумму назовём после того, как согласуем размеры и ткань — обычно в день обращения.'],
  ['Какой срок изготовления?', 'Обычно около 14 дней с момента, когда согласовали размеры и ткань. Срок называем до оформления заказа и фиксируем его.'],

  ['Есть ли ткань «антикоготь»?', 'Есть. Это плотная ткань, за которую не цепляются когти, она легко чистится. Подойдёт, если дома кошка или собака. Также есть экокожа, велюр и рогожка — покажем образцы.'],
  ['Доставляете ли в другие города?', 'Доставляем по Екатеринбургу и Свердловской области, отправляем транспортными компаниями в другие регионы. Стоимость зависит от адреса — рассчитаем при заказе.'],
  ['Как проходит сборка?', 'Привезём, занесём и соберём у вас дома. Перед производством проверим проходы: дверные проёмы, лестницы, лифт — чтобы диван точно прошёл.'],
  ['Какая гарантия?', 'На каркас и механизм даём гарантию фабрики. Если что-то потребует внимания — приедем и поправим.'],
];

const CALC = {
  kinds: [
    { id:'straight', name:'Прямой', base:36000, model:'model-03', svg:'<rect x="4" y="9" width="44" height="14" rx="3"/><path d="M4 23v4M48 23v4"/>' },
    { id:'corner', name:'Угловой', base:52000, model:'model-02', svg:'<path d="M4 9h44v8H18v10H4z"/>' },
    { id:'u', name:'П-образный', base:84000, model:'nika-grand', svg:'<path d="M4 4h12v18h20V4h12v24H4z"/>' },
  ],
  mech: [ ['none','Без механизма',0], ['book','Книжка',0], ['euro','Еврокнижка',4500], ['acc','Аккордеон',7500], ['puma','Пума',9500] ],
  fab: [ ['rogozhka','Рогожка',0], ['velour','Велюр',3500], ['anticlaw','Антикоготь',6500], ['ecoleather','Экокожа',8500] ],
  opts: [ ['box','Бельевой ящик',2500], ['ottoman','Оттоманка',9000], ['cover','Съёмный чехол',4000], ['pillows','Декоративные подушки',1500], ['quilt','Стёганое сиденье',3000], ['hr','Наполнение HR-пена',5000] ],
};

/* ---------- утилиты ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => n.toLocaleString('ru-RU');
const plural = (n, f) => { const m = n % 10, h = n % 100; return f[(m === 1 && h !== 11) ? 0 : (m >= 2 && m <= 4 && (h < 10 || h >= 20)) ? 1 : 2]; };
let toastT; const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('is-on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('is-on'), 2400); };
const lock = on => document.documentElement.classList.toggle('is-locked', on);

/* ---------- избранное ---------- */
const FAV_KEY = 'nika_fav';
let favs = []; try { favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch (e) {}
const isFav = id => favs.includes(id);
function toggleFav(id) {
  favs = isFav(id) ? favs.filter(x => x !== id) : [...favs, id];
  try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) {}
  $$(`.pcard__fav[data-fav="${id}"]`).forEach(b => b.classList.toggle('is-on', isFav(id)));
  renderFavCount(); renderDrawer();
  toast(isFav(id) ? 'Добавили в избранное' : 'Убрали из избранного');
}
function renderFavCount() { const b = $('#favBtn'); $('#favCount').textContent = favs.length; b.classList.toggle('has-items', favs.length > 0); }
function renderDrawer() {
  const list = $('#drawerList');
  if (!favs.length) { list.innerHTML = '<div class="drawer__empty">Пока пусто. Нажмите ♥ на карточке модели, чтобы вернуться к ней позже или запросить расчёт сразу по нескольким.</div>'; $('#drawerQuote').disabled = true; return; }
  $('#drawerQuote').disabled = false;
  list.innerHTML = favs.map(byId).filter(Boolean).map(p => `
    <div class="drawer__item"><a href="#/product/${p.id}"><img src="${p.cover}" alt=""></a><div><b>${p.name}</b><span>${p.typeName} · по вашим размерам</span></div><button class="icon-btn" data-unfav="${p.id}" aria-label="Убрать"><svg><use href="#i-close"/></svg></button></div>`).join('');
}
function openDrawer(on) { $('#drawer').classList.toggle('is-open', on); $('#drawerBackdrop').classList.toggle('is-open', on); lock(on); }
$('#favBtn').addEventListener('click', () => { renderDrawer(); openDrawer(true); });
$('#drawerClose').addEventListener('click', () => openDrawer(false));
$('#drawerBackdrop').addEventListener('click', () => openDrawer(false));
$('#drawerList').addEventListener('click', e => { const b = e.target.closest('[data-unfav]'); if (b) toggleFav(b.dataset.unfav); const a = e.target.closest('a'); if (a) openDrawer(false); });
$('#drawerQuote').addEventListener('click', () => { openDrawer(false); openQuote({ msg: 'Интересуют модели: ' + favs.map(id => byId(id)?.name).filter(Boolean).join(', ') }); });
renderFavCount();

/* ---------- карточка товара ---------- */
function cardHTML(p, i = 0) {
  return `<article class="pcard" style="animation-delay:${Math.min(i, 12) * 40}ms">
    <div class="pcard__media">
      <img class="pcard__img" src="${p.cover}" alt="${p.name} — ${p.typeName.toLowerCase()} диван" loading="lazy" decoding="async">
      ${p.tag ? `<span class="pcard__tag">${p.tag}</span>` : p.isNew ? '<span class="pcard__tag">Новинка</span>' : ''}
      <span class="pcard__type">${p.typeName}</span>
      <button class="pcard__fav ${isFav(p.id) ? 'is-on' : ''}" data-fav="${p.id}" aria-label="В избранное"><svg><use href="#i-heart"/></svg></button>
      <a class="pcard__link" href="#/product/${p.id}" aria-label="${p.name}"></a>
      <button class="pcard__go" data-qv="${p.id}" aria-label="Быстрый просмотр"><svg><use href="#i-zoom"/></svg></button>
    </div>
    <div class="pcard__body"><span class="pcard__name">${p.name}</span><span class="pcard__price">Цена по запросу</span></div>
  </article>`;
}
document.addEventListener('click', e => {
  const f = e.target.closest('[data-fav]'); if (f) { e.preventDefault(); toggleFav(f.dataset.fav); return; }
  const q = e.target.closest('[data-qv]'); if (q) { e.preventDefault(); const p = byId(q.dataset.qv); if (p) openLightbox(p.photos.map(n => p.img(n)), 0, p.name); }
});

/* ---------- главная: превью каталога ---------- */
let homeFilter = 'all';
function renderHome() {
  const chips = [['all','Все'], ...Object.entries(TYPES).map(([k, v]) => [k, PLURAL[k]])];
  $('#homeFilters').innerHTML = chips.map(([k, v]) => `<button class="chip ${homeFilter === k ? 'is-on' : ''}" data-hf="${k}">${v}</button>`).join('');
  const list = PRODUCTS.filter(p => homeFilter === 'all' || p.type === homeFilter).slice(0, 6);
  $('#homeGrid').innerHTML = list.map(cardHTML).join('');
}
$('#homeFilters').addEventListener('click', e => { const b = e.target.closest('[data-hf]'); if (!b) return; homeFilter = b.dataset.hf; renderHome(); });
renderHome();

/* ---------- бегущая строка ---------- */
(() => {
  const items = ['Собственная фабрика с 2013 года', 'Диваны по вашим размерам', 'Ткань «антикоготь»', 'Срок около 14 дней', 'Доставка и сборка', 'Бесплатный расчёт'];
  $('#marquee').innerHTML = [...items, ...items].map(t => `<span class="marquee__item">${t}</span>`).join('');
})();

/* ---------- лента моделей (едет сама, можно тянуть) ---------- */
(() => {
  const rail = $('#rail');
  const shots = PRODUCTS.map(p => `<a class="rail__shot" href="#/product/${p.id}" draggable="false"><img src="${p.img(p.photos[0], 'm')}" alt="${p.name}" loading="lazy" draggable="false"><span class="rail__name">${p.name}</span></a>`).join('');
  rail.innerHTML = shots + shots;
  $('#railCount').textContent = `${PRODUCTS.length} ${plural(PRODUCTS.length, ['модель', 'модели', 'моделей'])}`;
  let down = false, sx = 0, sl = 0, moved = false, hover = false, pos = 0, last = performance.now();
  const half = () => rail.scrollWidth / 2;
  const tick = t => {
    const dt = Math.min(64, t - last); last = t;
    if (!down && !hover && currentView === 'home') {
      pos += dt * 0.04;
      if (pos >= half()) pos -= half();
      rail.scrollLeft = pos;
    } else pos = rail.scrollLeft;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  rail.addEventListener('mouseenter', () => hover = true);
  rail.addEventListener('mouseleave', () => hover = false);
  rail.addEventListener('pointerdown', e => { down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add('is-drag'); });
  window.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 4) moved = true; let v = sl - dx; if (v < 0) v += half(); if (v >= half()) v -= half(); rail.scrollLeft = v; });
  window.addEventListener('pointerup', () => { down = false; rail.classList.remove('is-drag'); });
  rail.addEventListener('touchstart', () => { hover = true; }, { passive: true });
  rail.addEventListener('touchend', () => { setTimeout(() => { hover = false; }, 1500); }, { passive: true });
  rail.addEventListener('click', e => { if (moved) e.preventDefault(); });
})();

/* ---------- примерка ткани ---------- */
function swatchesHTML(sel = 'bezh') { return FABRICS.map(f => `<button class="swatch ${f.id === sel ? 'is-on' : ''}" data-fabric="${f.id}" role="radio" aria-checked="${f.id === sel}" title="${f.name} · ${f.kind}"><img src="${f.img}" alt="${f.name}"></button>`).join(''); }
// Перекраска: цветной слой с luminance-маской самого фото (ткань тонируется, фон остаётся чистым)
function applyFabric(layer, fabric, src) {
  if (!layer) return;
  layer._fabric = fabric;
  if (!fabric || !fabric.color) { layer.classList.remove('is-on'); return; }
  src = src || layer.parentElement.querySelector('img')?.src;
  layer.style.setProperty('--tint', fabric.color); layer.style.setProperty('--src', `url("${src}")`);
  if (layer.children.length !== 4) layer.innerHTML = '<i></i><i></i><i></i><i></i>';
  layer.classList.add('is-on');
}
function bindSwatches(root, layer, label, onChange) {
  root.addEventListener('click', e => {
    const b = e.target.closest('[data-fabric]'); if (!b) return;
    $$('.swatch', root).forEach(s => { s.classList.toggle('is-on', s === b); s.setAttribute('aria-checked', s === b); });
    const f = FABRICS.find(x => x.id === b.dataset.fabric);
    applyFabric(layer, f); if (label) label.textContent = f.color ? `${f.name} · ${f.kind}` : 'Беж · как на фото';
    onChange && onChange(f);
  });
}
$('#featSwatches').innerHTML = swatchesHTML();
bindSwatches($('#featSwatches'), $('#featLayer'), $('#featLabel'));

/* ---------- калькулятор ---------- */
const calc = { kind:'corner', len:240, dep:95, mech:'euro', fab:'velour', opts:new Set(['box']) };
(() => {
  $('#calcKinds').innerHTML = CALC.kinds.map(k => `<button class="kind ${calc.kind === k.id ? 'is-on' : ''}" data-kind="${k.id}"><svg viewBox="0 0 52 32">${k.svg}</svg>${k.name}</button>`).join('');
  $('#calcMech').innerHTML = CALC.mech.map(([id, n, pr]) => `<button class="chip ${calc.mech === id ? 'is-on' : ''}" data-mech="${id}">${n}${pr ? ` · +${fmt(pr)}` : ''}</button>`).join('');
  $('#calcFab').innerHTML = CALC.fab.map(([id, n, pr]) => `<button class="chip ${calc.fab === id ? 'is-on' : ''}" data-fabcat="${id}">${n}${pr ? ` · +${fmt(pr)}` : ''}</button>`).join('');
  $('#calcOpts').innerHTML = CALC.opts.map(([id, n, pr]) => `<label class="check"><input type="checkbox" data-opt="${id}" ${calc.opts.has(id) ? 'checked' : ''}><i></i>${n}<small>+${fmt(pr)} ₽</small></label>`).join('');
  const panel = $('.calc__panel');
  panel.addEventListener('click', e => {
    const k = e.target.closest('[data-kind]'); if (k) { calc.kind = k.dataset.kind; $$('[data-kind]', panel).forEach(b => b.classList.toggle('is-on', b === k)); }
    const m = e.target.closest('[data-mech]'); if (m) { calc.mech = m.dataset.mech; $$('[data-mech]', panel).forEach(b => b.classList.toggle('is-on', b === m)); }
    const f = e.target.closest('[data-fabcat]'); if (f) { calc.fab = f.dataset.fabcat; $$('[data-fabcat]', panel).forEach(b => b.classList.toggle('is-on', b === f)); }
    if (k || m || f) updateCalc();
  });
  panel.addEventListener('change', e => { const o = e.target.closest('[data-opt]'); if (o) { o.checked ? calc.opts.add(o.dataset.opt) : calc.opts.delete(o.dataset.opt); updateCalc(); } });
  const setRange = (el, out, unit) => { el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100) + '%'); out.textContent = el.value + ' ' + unit; };
  $('#calcLen').addEventListener('input', e => { calc.len = +e.target.value; setRange(e.target, $('#calcLenOut'), 'см'); updateCalc(); });
  $('#calcDep').addEventListener('input', e => { calc.dep = +e.target.value; setRange(e.target, $('#calcDepOut'), 'см'); updateCalc(); });
  setRange($('#calcLen'), $('#calcLenOut'), 'см'); setRange($('#calcDep'), $('#calcDepOut'), 'см');
  $('#calcSend').addEventListener('click', () => openQuote({ kind: TYPES[calc.kind], msg: `Расчёт из калькулятора: ${calcSummaryText()}. Ориентир: ${$('#calcPrice').firstChild.textContent.trim()}` }));
  updateCalc();
})();
function calcPrice() {
  const k = CALC.kinds.find(x => x.id === calc.kind);
  let price = k.base;
  price += Math.max(0, calc.len - 200) / 10 * 1800;
  price += Math.max(0, calc.dep - 90) / 5 * 1200;
  price += CALC.mech.find(x => x[0] === calc.mech)[2];
  price += CALC.fab.find(x => x[0] === calc.fab)[2] * (calc.kind === 'u' ? 1.6 : 1);
  calc.opts.forEach(o => price += CALC.opts.find(x => x[0] === o)[2]);
  const r = n => Math.round(n / 500) * 500;
  return [r(price * .93), r(price * 1.07)];
}
function calcSummaryText() {
  const m = CALC.mech.find(x => x[0] === calc.mech)[1], f = CALC.fab.find(x => x[0] === calc.fab)[1];
  const o = [...calc.opts].map(id => CALC.opts.find(x => x[0] === id)[1]);
  return [TYPES[calc.kind], `длина ${calc.len} см`, `глубина ${calc.dep} см`, m, f, ...o].join(', ');
}
function updateCalc() {
  const [a, b] = calcPrice();
  $('#calcPrice').innerHTML = `${fmt(a)} – ${fmt(b)} ₽<small>ориентировочно, с учётом ткани и механизма</small>`;
  const m = CALC.mech.find(x => x[0] === calc.mech)[1], f = CALC.fab.find(x => x[0] === calc.fab)[1];
  $('#calcSummary').innerHTML = [TYPES[calc.kind], `${calc.len} × ${calc.dep} см`, m, f, ...[...calc.opts].map(id => CALC.opts.find(x => x[0] === id)[1])].map(s => `<span>${s}</span>`).join('');
  const p = byId(CALC.kinds.find(x => x.id === calc.kind).model);
  const img = $('#calcImg'); const src = p.img(p.photos[0], 'm'); if (img.getAttribute('src') !== src) img.src = src;
  const tint = { rogozhka:'#b9b5ad', velour:null, anticlaw:'#7e8a62', ecoleather:'#6f4e3a' }[calc.fab];
  applyFabric($('#calcLayer'), { color: tint });
}

/* ---------- конструкция (scroll-driven) ---------- */
const AN = [
  ['Обивка', 'Покажем образцы тканей и цветов. Поможем выбрать обивку с учётом интерьера и того, как вы пользуетесь диваном.'],
  ['Наполнение', 'От наполнения зависит, насколько мягким будет сиденье. Обсудим, как вам удобнее сидеть, и предложим подходящий вариант: HR-пена, пружинный блок или их сочетание.'],
  ['Спальное место', 'Если планируете спать на диване, скажите об этом при заказе. Подберём механизм и размер спального места под ваши задачи — ровное, без стыка.'],
  ['Каркас и сборка', 'Каркас из сухого бруса и фанеры. Длину и глубину дивана согласуем до изготовления. Готовый диван привезём и соберём у вас дома.'],
];
let anCur = -1;
function setAnatomy(i) {
  if (i === anCur) return; anCur = i;
  $('#anStep').textContent = `${i + 1} / 4`; $('#anTitle').textContent = AN[i][0]; $('#anDesc').textContent = AN[i][1];
  $$('#anProg i').forEach((el, k) => el.classList.toggle('is-on', k <= i));
  $$('.anatomy__layer').forEach((l, k) => { l.classList.toggle('is-on', k === i); l.classList.toggle('is-dim', k !== i); l.style.transform = k < i ? 'translateY(-60px)' : k > i ? 'translateY(60px)' : 'translateY(0) scale(1.03)'; });
  $$('.anatomy__dot').forEach((d, k) => d.classList.toggle('is-on', k === i));
  $$('.anatomy__card').forEach((c, k) => c.classList.toggle('is-on', k === i));
}
setAnatomy(0);
$('#anCards').addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (!b) return; const sec = $('#anatomy'); const h = $('#anSteps').offsetHeight; window.scrollTo({ top: sec.offsetTop + (h / 4) * (+b.dataset.go) + 10, behavior: 'smooth' }); });
$$('.anatomy__dot').forEach(d => d.addEventListener('click', () => setAnatomy(+d.dataset.dot)));
function anatomyScroll() {
  const sec = $('#anatomy'); const r = sec.getBoundingClientRect(); const h = $('#anSteps').offsetHeight;
  if (r.top > innerHeight || r.bottom < 0) return;
  const p = Math.min(1, Math.max(0, -r.top / h));
  setAnatomy(Math.min(3, Math.floor(p * 4)));
}

/* ---------- счётчики ---------- */
function countUp(el) {
  const to = +el.dataset.count, suf = el.dataset.suffix || ''; const t0 = performance.now(), dur = 1400;
  const tick = t => { const p = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(to * e) + suf; if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}

/* ---------- до/после ---------- */
(() => { const ba = $('#ba'); const inp = $('input', ba); const set = v => ba.style.setProperty('--x', v + '%'); inp.addEventListener('input', e => set(e.target.value)); set(50); })();

/* ---------- квиз ---------- */
const QUIZ = [
  { q:'Куда нужен диван?', opts:[['Гостиная','room:living'],['Спальня','room:bed'],['Кухня-гостиная','room:living'],['Детская / кабинет','room:small']] },
  { q:'Какая форма подойдёт комнате?', opts:[['Прямой','type:straight'],['Угловой','type:corner'],['П-образный, большой','type:u'],['Не знаю — подскажите','type:any']] },
  { q:'Будете ли спать на диване?', opts:[['Каждый день','sleep:daily'],['Иногда, для гостей','sleep:guest'],['Нет','sleep:no']] },
  { q:'Есть ли дома животные?', opts:[['Кошка','pet:cat'],['Собака','pet:dog'],['Нет','pet:no']] },
];
const quiz = { step:0, ans:[] };
function renderQuiz() {
  const box = $('#quizBox');
  if (quiz.step >= QUIZ.length) {
    const a = Object.fromEntries(quiz.ans.map(s => s.split(':')));
    let type = a.type === 'any' ? (a.room === 'living' ? 'corner' : 'straight') : a.type;
    const picks = PRODUCTS.filter(p => p.type === type).slice(0, 3);
    const tips = [];
    if (a.sleep === 'daily') tips.push('механизм для ежедневного сна и ортопедическое спальное место');
    if (a.pet === 'cat' || a.pet === 'dog') tips.push('ткань «антикоготь»');
    box.innerHTML = `<div class="quiz__res">
      <span class="eyebrow" style="color:#c38b5c">Ваш подбор</span>
      <h3 class="quiz__q">${TYPES[type]} диван${tips.length ? ' — советуем ' + tips.join(' и ') : ''}</h3>
      <div class="quiz__picks">${picks.map(p => `<a class="quiz__pick" href="#/product/${p.id}"><img src="${p.cover}" alt="${p.name}"><span>${p.name}</span></a>`).join('')}</div>
      <button class="btn btn--cognac btn--block" id="quizSend"><span>Получить расчёт по подбору</span><span class="btn__dot"><svg><use href="#i-arrow"/></svg></span></button>
      <button class="quiz__back" id="quizRestart">Пройти заново</button></div>`;
    $('#quizSend').addEventListener('click', () => openQuote({ kind: TYPES[type], msg: `Подбор через квиз: ${TYPES[type]}${tips.length ? ', ' + tips.join(', ') : ''}. Понравились: ${picks.map(p => p.name).join(', ')}` }));
    $('#quizRestart').addEventListener('click', () => { quiz.step = 0; quiz.ans = []; renderQuiz(); });
    return;
  }
  const s = QUIZ[quiz.step];
  box.innerHTML = `<div class="quiz__prog">${QUIZ.map((_, i) => `<i class="${i <= quiz.step ? 'is-on' : ''}"></i>`).join('')}</div>
    <h3 class="quiz__q">${s.q}</h3>
    <div class="quiz__opts">${s.opts.map(([t, v]) => `<button class="quiz__opt" data-ans="${v}">${t}</button>`).join('')}</div>
    <div class="quiz__foot"><span>Вопрос ${quiz.step + 1} из ${QUIZ.length}</span>${quiz.step ? '<button class="quiz__back" id="quizBack">← Назад</button>' : ''}</div>`;
  $$('[data-ans]', box).forEach(b => b.addEventListener('click', () => { quiz.ans[quiz.step] = b.dataset.ans; quiz.step++; renderQuiz(); }));
  const back = $('#quizBack'); if (back) back.addEventListener('click', () => { quiz.step--; renderQuiz(); });
}
renderQuiz();

/* ---------- отзывы ---------- */
(() => {
  const track = $('#rTrack');
  track.innerHTML = REVIEWS.map(r => `<article class="rcard"><span class="rcard__q">«</span><p>${r.text}</p><footer><b>${r.name}</b><span>${r.meta}</span></footer></article>`).join('');
  const dots = $('#rDots'); dots.innerHTML = REVIEWS.map(() => '<i></i>').join('');
  const upd = () => { const i = Math.round(track.scrollLeft / (track.firstElementChild.offsetWidth + 20)); $$('i', dots).forEach((d, k) => d.classList.toggle('is-on', k === i)); };
  track.addEventListener('scroll', upd, { passive: true }); upd();
  const go = d => track.scrollBy({ left: d * (track.firstElementChild.offsetWidth + 20), behavior: 'smooth' });
  $('#rPrev').addEventListener('click', () => go(-1)); $('#rNext').addEventListener('click', () => go(1));
})();

/* ---------- FAQ ---------- */
$('#faqAcc').innerHTML = FAQ.map(([q, a], i) => `<div class="acc__item ${i === 0 ? 'is-open' : ''}"><button class="acc__head" aria-expanded="${i === 0}">${q}<span class="acc__icon"><svg><use href="#i-plus"/></svg></span></button><div class="acc__panel"><div class="acc__inner"><p>${a}</p></div></div></div>`).join('');
document.addEventListener('click', e => { const h = e.target.closest('.acc__head'); if (!h) return; const it = h.parentElement; const on = it.classList.toggle('is-open'); h.setAttribute('aria-expanded', on); });

/* ---------- формы ---------- */
function phoneMask(input) {
  input.addEventListener('input', () => {
    let d = input.value.replace(/\D/g, ''); if (d.startsWith('8')) d = '7' + d.slice(1); if (!d.startsWith('7')) d = '7' + d; d = d.slice(0, 11);
    let s = '+7'; if (d.length > 1) s += ' ' + d.slice(1, 4); if (d.length > 4) s += ' ' + d.slice(4, 7); if (d.length > 7) s += '-' + d.slice(7, 9); if (d.length > 9) s += '-' + d.slice(9, 11);
    input.value = s;
  });
  input.addEventListener('focus', () => { if (!input.value) input.value = '+7 '; });
  input.addEventListener('blur', () => { if (input.value.trim() === '+7') input.value = ''; });
}
function setupForm(form) {
  const kinds = $('[data-kinds]', form);
  kinds.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', kinds).forEach(c => c.classList.toggle('is-on', c === b)); });
  phoneMask($('input[name=phone]', form));
  const file = $('input[type=file]', form); file.addEventListener('change', () => { const n = file.files.length; $('[data-file-label]', form).textContent = n ? `${n} ${plural(n, ['файл', 'файла', 'файлов'])} выбрано` : 'комнаты или модели'; });
  form.addEventListener('submit', e => {
    e.preventDefault(); let ok = true;
    const name = $('input[name=name]', form), phone = $('input[name=phone]', form);
    name.parentElement.classList.toggle('is-error', !name.value.trim()); if (!name.value.trim()) ok = false;
    const digits = phone.value.replace(/\D/g, ''); phone.parentElement.classList.toggle('is-error', digits.length !== 11); if (digits.length !== 11) ok = false;
    if (!ok) return;
    // Отправка на почту фабрики через send.php на хостинге
    const btn = $('button[type=submit]', form), label = btn.querySelector('span'), was = label.textContent;
    btn.disabled = true; label.textContent = 'Отправляем…'; form.classList.remove('is-failed');
    const fd = new FormData();
    fd.append('name', name.value.trim()); fd.append('phone', phone.value.trim());
    fd.append('msg', ($('textarea', form) || {}).value || '');
    fd.append('kind', ($('[data-kinds] .chip.is-on', form) || {}).textContent || '');
    fd.append('form', form.id === 'orderForm' ? 'Заявка на расчёт (главная)' : 'Рассчитать стоимость (окно)');
    fd.append('page', location.href); fd.append('website', ($('input[name=website]', form) || {}).value || '');
    [...file.files].slice(0, 5).forEach(f => fd.append('files[]', f, f.name));
    fetch('send.php', { method: 'POST', body: fd })
      .then(r => r.json().catch(() => ({ ok: false })))
      .then(j => { if (!j.ok) throw new Error(j.error || 'send'); form.classList.add('is-sent'); form.reset && form.reset(); $('[data-file-label]', form).textContent = 'комнаты или модели'; })
      .catch(() => { form.classList.add('is-failed'); toast('Не удалось отправить. Позвоните нам: +7 908 638-47-66'); })
      .finally(() => { btn.disabled = false; label.textContent = was; });
  });
  $$('input', form).forEach(i => i.addEventListener('input', () => i.parentElement.classList.remove('is-error')));
}
setupForm($('#orderForm')); setupForm($('#quoteForm'));
function openQuote({ kind, msg, model } = {}) {
  const form = $('#quoteForm'); form.classList.remove('is-sent');
  if (kind) $$('[data-kinds] .chip', form).forEach(c => c.classList.toggle('is-on', c.textContent === kind));
  if (msg || model) $('textarea', form).value = msg || `Интересует ${model}`;
  openModal('quote'); setTimeout(() => $('input[name=name]', form).focus(), 400);
}
document.addEventListener('click', e => { const b = e.target.closest('[data-open="quote"]'); if (!b) return; e.preventDefault(); openQuote({ kind: b.dataset.kind, model: b.dataset.model }); });

/* ---------- модалки ---------- */
function openModal(id) { const m = $('#modal-' + id); m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false'); lock(true); }
function closeModals() { $$('.modal.is-open').forEach(m => { m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true'); }); if (!$('#drawer').classList.contains('is-open') && !$('#mmenu').classList.contains('is-open')) lock(false); }
document.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModals(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModals(); openDrawer(false); } });
/* ---------- лайтбокс: только фото, листается ---------- */
let lbList = [], lbI = 0;
function lbShow(i) { lbI = (i + lbList.length) % lbList.length; $('#lbImg').src = lbList[lbI]; const many = lbList.length > 1; $('#lbPrev').hidden = $('#lbNext').hidden = $('#lbCount').hidden = !many; $('#lbCount').textContent = `${lbI + 1} / ${lbList.length}`; }
function openLightbox(list, i = 0, alt = '') { lbList = list; $('#lbImg').alt = alt; lbShow(i); openModal('lb'); }
$('#lbPrev').addEventListener('click', () => lbShow(lbI - 1));
$('#lbNext').addEventListener('click', () => lbShow(lbI + 1));
document.addEventListener('keydown', e => { if (!$('#modal-lb').classList.contains('is-open') || lbList.length < 2) return; if (e.key === 'ArrowLeft') lbShow(lbI - 1); if (e.key === 'ArrowRight') lbShow(lbI + 1); });
function openQuickView(id) {
  const p = byId(id); if (!p) return;
  $('#qvRoot').innerHTML = `<div class="qv__media"><img src="${p.img(p.photos[0])}" alt="${p.name}"></div>
    <div class="qv__body"><button class="modal__close" data-close aria-label="Закрыть"><svg><use href="#i-close"/></svg></button>
      <span class="eyebrow">${p.typeName}</span><h3 class="h2" style="font-size:clamp(28px,3vw,40px)">${p.name}</h3>
      <div class="pinfo__price"><b>Цена по запросу</b><span>Точную цену назовём после выбора размера и ткани</span></div>
      <p class="pinfo__desc">${p.desc}</p>
      <div class="pinfo__specs">${p.specs.map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join('')}</div>
      <div class="pinfo__ctas"><a class="btn btn--cognac" href="#/product/${p.id}" data-close><span>Открыть модель</span><span class="btn__dot"><svg><use href="#i-arrow"/></svg></span></a><button class="btn btn--ghost btn--sm" data-fav="${p.id}"><span>${isFav(p.id) ? 'В избранном' : 'В избранное'}</span><span class="btn__dot"><svg><use href="#i-heart"/></svg></span></button></div>
    </div>`;
  openModal('qv');
}

/* ---------- каталог ---------- */
let catFilter = 'all', catSort = 'default';
function renderCatalog() {
  const counts = Object.fromEntries(Object.keys(TYPES).map(k => [k, PRODUCTS.filter(p => p.type === k).length]));
  const tabs = [['all', 'Все', PRODUCTS.length], ...Object.entries(TYPES).map(([k, v]) => [k, PLURAL[k], counts[k]])];
  $('#catTabs').innerHTML = tabs.map(([k, v, n]) => `<button class="tabs__btn ${catFilter === k ? 'is-on' : ''}" data-cf="${k}">${v}<b>${n}</b></button>`).join('');
  let list = PRODUCTS.filter(p => catFilter === 'all' || p.type === catFilter);
  if (catSort === 'fav') list = [...list].sort((a, b) => isFav(b.id) - isFav(a.id));
  if (catSort === 'new') list = [...list].sort((a, b) => !!b.isNew - !!a.isNew);
  $('#catCount').textContent = `${list.length} ${plural(list.length, ['модель', 'модели', 'моделей'])}`;
  $('#catGrid').innerHTML = list.length ? list.map(cardHTML).join('') : '<div class="catalog__empty">В этой категории пока нет моделей.</div>';
}
$('#catTabs').addEventListener('click', e => { const b = e.target.closest('[data-cf]'); if (!b) return; catFilter = b.dataset.cf; renderCatalog(); });
$('#catSort').addEventListener('change', e => { catSort = e.target.value; renderCatalog(); });

/* ---------- страница товара ---------- */
const CORNER_PATH = '<path d="M4 6h56v14H22v12H4z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>';
function renderProduct(id) {
  const p = byId(id); const root = $('#productRoot');
  if (!p) { root.innerHTML = '<nav class="crumbs"><a href="#/">Главная</a><span>/</span><a href="#/catalog">Каталог</a></nav><h1 class="h2">Модель не найдена</h1><p class="lead" style="margin-top:16px">Возможно, ссылка устарела. <a class="link-arrow" href="#/catalog">Перейти в каталог</a></p>'; return; }
  const related = PRODUCTS.filter(x => x.id !== p.id && x.type === p.type).slice(0, 3);
  const rel = related.length >= 3 ? related : [...related, ...PRODUCTS.filter(x => x.id !== p.id && !related.includes(x))].slice(0, 3);
  const hasCorner = p.type === 'corner' || p.type === 'u';
  const stageCls = p.recolor ? ' is-concept' : '';
  let cur = 0, side = 'left';
  root.innerHTML = `
    <nav class="crumbs"><a href="#/">Главная</a><span>/</span><a href="#/catalog">Каталог</a><span>/</span><span class="crumbs__cur">${p.name}</span></nav>
    <div class="product__grid">
      <div class="gallery">
        <div class="gallery__thumbs" id="gThumbs">${p.photos.map((n, i) => `<button class="gallery__thumb ${i === 0 ? 'is-on' : ''}" data-i="${i}"><img src="${p.img(n, 's')}" alt=""></button>`).join('')}</div>
        <div class="gallery__stage${stageCls}">
          <div class="recolor" id="gRecolor"><img id="gImg" src="${p.img(p.photos[0])}" alt="${p.name}"><div class="recolor__layer" id="gLayer"></div></div>
          ${p.tag ? `<span class="gallery__tag">${p.tag} модели</span>` : ''}
          <button class="icon-btn gallery__zoom" id="gZoom" aria-label="Увеличить"><svg><use href="#i-zoom"/></svg></button>
          ${p.photos.length > 1 ? `<div class="gallery__nav"><button class="icon-btn" id="gPrev" aria-label="Назад"><svg><use href="#i-left"/></svg></button><span id="gCount">1 / ${p.photos.length}</span><button class="icon-btn" id="gNext" aria-label="Вперёд"><svg><use href="#i-arrow"/></svg></button></div>` : ''}
        </div>
      </div>
      <div class="pinfo">
        <div class="pinfo__title"><span class="eyebrow">${p.typeName} диван</span><h1 class="h2">${p.name}</h1></div>
        <div class="pinfo__price"><b>Цена по запросу</b><span>Точную цену назовём после выбора размера и ткани</span></div>
        <p class="pinfo__desc">${p.desc}</p>
        <div class="pinfo__opts">
          ${hasCorner ? `<div class="opt"><div class="opt__label"><i>1</i>Сторона угла</div><div class="opt__corner"><button class="opt__box is-on" data-side="left"><svg viewBox="0 0 64 36" class="corner-ico">${CORNER_PATH}</svg>Слева</button><button class="opt__box" data-side="right"><svg viewBox="0 0 64 36" class="corner-ico" style="transform:scaleX(-1)">${CORNER_PATH}</svg>Справа</button></div></div>` : ''}
          <div class="opt"><div class="opt__label"><i>${hasCorner ? 2 : 1}</i>Ткань${p.recolor ? ' — примерьте на фото' : ''}</div><div class="opt__sw" id="gSwatches">${swatchesHTML()}</div><span class="opt__hint" id="gLabel">${p.recolor ? 'Беж · как на фото' : 'Выберите ткань — подберём образец в шоуруме'}</span></div>
        </div>
        <div class="pinfo__ctas">
          <button class="btn btn--cognac" id="pQuote"><span>Заказать расчёт</span><span class="btn__dot"><svg><use href="#i-arrow"/></svg></span></button>
          <a class="btn btn--ghost" href="https://wa.me/79086384766?text=${encodeURIComponent('Здравствуйте! Интересует ' + p.name + ' (' + p.typeName.toLowerCase() + ')')}" target="_blank" rel="noopener"><span>Написать в WhatsApp</span><span class="btn__dot"><svg><use href="#i-arrow-ne"/></svg></span></a>
          <button class="btn btn--ghost btn--sm" data-fav="${p.id}"><span>${isFav(p.id) ? 'В избранном' : 'В избранное'}</span><span class="btn__dot"><svg><use href="#i-heart"/></svg></span></button>
        </div>
        <div class="pinfo__specs">${p.specs.map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join('')}</div>
        <div class="acc">
          ${[['Изготовим под ваш размер', 'Меняем длину, глубину, высоту и ширину подлокотников. Пришлите замеры или фото комнаты — подскажем, как диван встанет.'], ['Ткань на выбор', 'Покажем образцы и поможем выбрать: «антикоготь», если дома кошка, экокожа для кухни-гостиной, велюр для спальни. На части моделей чехол съёмный — его можно стирать.'], ['Доставка и сборка', 'Привезём, занесём и соберём. Доставляем по Екатеринбургу и области, отправляем в другие регионы. Стоимость зависит от адреса.'], ['Срок изготовления', 'Обычно около 14 дней с момента, когда согласовали размеры и ткань. Точный срок назовём при заказе.']].map(([q, a]) => `<div class="acc__item"><button class="acc__head" aria-expanded="false">${q}<span class="acc__icon"><svg><use href="#i-plus"/></svg></span></button><div class="acc__panel"><div class="acc__inner"><p>${a}</p></div></div></div>`).join('')}
        </div>
        <div class="pinfo__share"><span>Поделиться:</span><button class="chip" id="pShare">Скопировать ссылку</button></div>
      </div>
    </div>
    <section class="related"><div class="related__head"><h2 class="h3">С этим смотрят</h2><a class="link-arrow" href="#/catalog">Весь каталог <svg><use href="#i-arrow"/></svg></a></div><div class="cprev__grid">${rel.map(cardHTML).join('')}</div></section>`;
  $('#pbarName').textContent = `${p.name} · ${p.typeName}`;
  const img = $('#gImg'), layer = $('#gLayer');
  const show = i => { cur = (i + p.photos.length) % p.photos.length; img.style.opacity = 0; setTimeout(() => { img.src = p.img(p.photos[cur]); img.style.opacity = 1; if (layer._fabric) applyFabric(layer, layer._fabric, img.src); }, 180); $$('#gThumbs .gallery__thumb').forEach((t, k) => t.classList.toggle('is-on', k === cur)); const c = $('#gCount'); if (c) c.textContent = `${cur + 1} / ${p.photos.length}`; };
  $('#gThumbs').addEventListener('click', e => { const t = e.target.closest('[data-i]'); if (t) show(+t.dataset.i); });
  const prev = $('#gPrev'), next = $('#gNext'); if (prev) { prev.addEventListener('click', () => show(cur - 1)); next.addEventListener('click', () => show(cur + 1)); }
  $('#gZoom').addEventListener('click', () => openLightbox(p.photos.map(n => p.img(n)), cur, p.name));
  $$('[data-side]').forEach(b => b.addEventListener('click', () => { side = b.dataset.side; $$('[data-side]').forEach(x => x.classList.toggle('is-on', x === b)); $('#gRecolor').classList.toggle('is-flipped', side === 'right'); }));
  let fab = FABRICS[0];
  bindSwatches($('#gSwatches'), p.recolor ? layer : null, p.recolor ? $('#gLabel') : null, f => { fab = f; if (!p.recolor) $('#gLabel').textContent = `${f.name} · ${f.kind} — покажем образец в шоуруме`; });
  $('#pQuote').addEventListener('click', () => openQuote({ kind: p.typeName, msg: `Интересует ${p.name} (${p.typeName.toLowerCase()})${hasCorner ? `, угол ${side === 'left' ? 'слева' : 'справа'}` : ''}, ткань: ${fab.name} (${fab.kind})` }));
  $('#pShare').addEventListener('click', async () => { try { await navigator.clipboard.writeText(location.href); toast('Ссылка скопирована'); } catch (e) { toast(location.href); } });
  document.title = `${p.name} — ${p.typeName.toLowerCase()} диван по вашим размерам · Ника`;
}

/* ---------- роутер ---------- */
const views = { home: $('#view-home'), catalog: $('#view-catalog'), product: $('#view-product') };
let currentView = 'home';
function route() {
  const h = location.hash || '#/';
  let view = 'home', section = null, pid = null;
  if (h.startsWith('#/catalog')) view = 'catalog';
  else if (h.startsWith('#/product/')) { view = 'product'; pid = h.slice(10).split(/[?#]/)[0]; }
  else { const m = h.match(/^#\/#?(\w+)/); if (m && m[1]) section = m[1]; }
  Object.entries(views).forEach(([k, v]) => v.classList.toggle('is-active', k === view));
  document.body.classList.toggle('on-product', view === 'product');
  $('#pbar').classList.toggle('is-on', view === 'product');
  if (view === 'catalog') { renderCatalog(); document.title = 'Каталог диванов — фабрика «Ника», Екатеринбург'; }
  else if (view === 'product') renderProduct(pid);
  else document.title = 'Ника — фабрика мягкой мебели в Екатеринбурге. Диваны по вашим размерам';
  $$('.header__link').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === (view === 'catalog' ? '#/catalog' : '#/')));
  closeModals(); openDrawer(false); closeMenu();
  if (section && $('#' + section)) { setTimeout(() => $('#' + section).scrollIntoView({ behavior: currentView === view ? 'smooth' : 'auto', block: 'start' }), 30); }
  else if (view !== currentView || view !== 'home') window.scrollTo({ top: 0, behavior: 'auto' });
  currentView = view;
  requestAnimationFrame(() => { observeReveals(); onScroll(); });
}
window.addEventListener('hashchange', route);
// ссылки на секции главной
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-scroll]'); if (!a) return;
  e.preventDefault(); const id = a.dataset.scroll;
  if (currentView === 'home') { closeMenu(); $('#' + id).scrollIntoView({ behavior: 'smooth' }); history.replaceState(null, '', '#/#' + id); }
  else location.hash = '#/#' + id;
});
$('#toTop').addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

/* ---------- меню ---------- */
function closeMenu() { $('#mmenu').classList.remove('is-open'); $('#burger').classList.remove('is-open'); if (!$('.modal.is-open') && !$('#drawer').classList.contains('is-open')) lock(false); }
$('#burger').addEventListener('click', () => { const on = !$('#mmenu').classList.contains('is-open'); $('#mmenu').classList.toggle('is-open', on); $('#burger').classList.toggle('is-open', on); lock(on); });
$('#mmenu').addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });

/* ---------- reveal / scroll ---------- */
const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); $$('[data-count]', en.target).forEach(countUp); if (en.target.matches('[data-count]')) countUp(en.target); } }), { threshold: .12 });
function observeReveals() { $$('.rv:not(.in), .footer__word:not(.in)').forEach(el => io.observe(el)); }
observeReveals();
let lastY = 0;
function onScroll() {
  const y = scrollY; const header = $('#header');
  header.classList.toggle('is-scrolled', y > 40);
  header.classList.toggle('is-hidden', y > lastY && y > 400 && !$('#mmenu').classList.contains('is-open'));
  if (currentView === 'home') { $('#heroMedia').style.transform = `translateY(${y * .25}px)`; anatomyScroll(); }
  const doc = document.documentElement; $('#scrollbar').style.transform = `scaleX(${y / (doc.scrollHeight - innerHeight || 1)})`;
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- fab / glow ---------- */
$('#fabBtn').addEventListener('click', () => $('#fab').classList.toggle('is-open'));
document.addEventListener('click', e => { if (!e.target.closest('#fab')) $('#fab').classList.remove('is-open'); });
window.addEventListener('pointermove', e => { const g = $('#glow'); g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px'; }, { passive: true });

/* ---------- прелоадер + старт ---------- */
(() => {
  const title = $('#heroTitle'); const words = title.textContent.trim().split(/\s+/);
  title.setAttribute('aria-label', title.textContent.trim());
  title.innerHTML = words.map((w, i) => `<span class="w" aria-hidden="true"><i style="transition-delay:${.05 * i}s">${w}${i < words.length - 1 ? '&nbsp;' : ''}</i></span>`).join('');
  const count = $('#plCount'), bar = $('#plBar'); let n = 0; const t0 = performance.now(), dur = 1700;
  lock(true);
  let done = false;
  const finish = () => { if (done) return; done = true; count.textContent = 100; bar.style.width = '100%'; setTimeout(() => { $('#preloader').classList.add('is-done'); document.body.classList.add('is-ready'); lock(false); route(); setTimeout(() => $('#preloader')?.remove(), 1200); }, 250); };
  const iv = setInterval(() => { const p = Math.min(1, (performance.now() - t0) / dur); const e = 1 - Math.pow(1 - p, 2.2); n = Math.round(e * 100); count.textContent = n; bar.style.width = n + '%'; if (p >= 1) { clearInterval(iv); finish(); } }, 30);
  setTimeout(finish, dur + 1500);
})();

})();

/* ---------- MAX: ссылка на профиль фабрики (вставить, когда пришлют) ---------- */
const MAX_URL = '';
$$('[data-max]').forEach(a => { a.href = MAX_URL || 'https://max.ru/'; });
