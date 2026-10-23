/* ── Slider principal DGC ── */
const dgcSlides = [
  { id: 'slide-1',  caption: 'Bavispe - Nuevo Casas Grandes, Sonora - Chihuahua.' },
  { id: 'slide-2',  caption: 'Puente vehicular Nichupté - Cancún, Quintana Roo.' },
  { id: 'slide-3',  caption: 'Carretera Real del Monte-Huasca.' },
  { id: 'slide-4',  caption: 'Programa de Pavimentación de Caminos a Cabeceras Municipales.' },
  { id: 'slide-5',  caption: 'Modernización de la autopista La Pera - Cuautla, Morelos.' },
  { id: 'slide-6',  caption: 'Ayutla - Acatepec, Guerrero.' },
  { id: 'slide-7',  caption: 'Av. Morones Prieto y calle José Calderón, Nuevo León.' },
  { id: 'slide-8',  caption: 'Chiná - E.C. (Haltunchen - Cayal), Campeche.' },
  { id: 'slide-9',  caption: 'Distribuidor Aeropuerto Cancún, Quintana Roo.' },
  { id: 'slide-10', caption: 'Cd. del Carmen - Campeche, Campeche.' },
  { id: 'slide-11', caption: 'Pachuca - Huejutla, Hidalgo.' },
  { id: 'slide-12', caption: 'Puente la Concordia, Chiapas.' },
];
const cap = document.getElementById('slider-caption');
dgcSlides.forEach(s =>
  document.getElementById(s.id).addEventListener('change', () => cap.textContent = s.caption)
);
setInterval(() => {
  const i = dgcSlides.findIndex(s => document.getElementById(s.id).checked);
  const next = (i + 1) % dgcSlides.length;
  document.getElementById(dgcSlides[next].id).checked = true;
  cap.textContent = dgcSlides[next].caption;
}, 5000);

/* ── Datos del slider de ejes (sin cifras) ── */
const DATA = [
  {
    tag: 'Oaxaca · Guerrero',
    title: 'Salina Cruz - Zihuatanejo',
    p1: 'Es uno de los Ejes Prioritarios de la actual administración. Se han ampliado tramos y construido puentes, y se continúa trabajando en nuevas etapas en beneficio de las comunidades de Oaxaca y Guerrero.',
    p2: 'Es una obra estratégica que fortalece la conectividad entre el Pacífico sur y las regiones del interior del país.'
  },
  {
    tag: 'Colima',
    title: 'Pasos Superiores Vehiculares Arco Norte y Arco Sur',
    p1: 'Las obras están a punto de concluir y beneficiarán a la zona conurbada de la ciudad de Colima, mejorando significativamente la movilidad urbana.',
    p2: 'Los trabajos generan empleos directos e indirectos y contribuyen al desarrollo de la región.'
  },
  {
    tag: 'Sonora · Chihuahua',
    title: 'Bavispe - Nuevo Casas Grandes',
    p1: 'Inició operaciones el 1 de febrero de 2026. Esta vía conecta Sonora y Chihuahua y beneficia a la región serrana.',
    p2: 'La nueva carretera reduce de manera importante los traslados entre ambas entidades, facilitando el acceso a servicios de salud, educación y mercados.'
  },
  {
    tag: 'San Luis Potosí · Hidalgo',
    title: 'Carretera Tamazunchale - Huejutla',
    p1: 'La modernización de esta carretera continúa en proceso y, en una primera etapa, beneficia a las comunidades de San Luis Potosí e Hidalgo.',
    p2: 'Esta vía es fundamental para el desarrollo económico de la Huasteca.'
  },
  {
    tag: 'Chiapas',
    title: 'Puente Rizo de Oro',
    p1: '¡Avanza la construcción del Puente Rizo de Oro en Chiapas! Esta moderna estructura de la ingeniería mexicana representa una obra de justicia social para las comunidades que cruzan la Presa La Angostura.',
    p2: ''
  },
  {
    tag: 'Quintana Roo',
    title: 'Puente Vehicular Nichupté',
    p1: 'El Puente Vehicular Nichupté en Cancún beneficia a los habitantes y favorece a turistas que visitan la región; es uno de los puentes más largos de América Latina sobre una laguna. Cuenta con programas ambientales que protegen la zona ecológica del manglar. Esta obra emblemática transforma la movilidad en Cancún, al conectar la ciudad con la zona hotelera e impulsa el desarrollo social y económico de la zona.',
    p2: ''
  }
];

const N = DATA.length;
let cur = 0, modalOpen = false, autoTimer;

const eslides   = [...document.querySelectorAll('.eslide')];
const edotsEl   = document.getElementById('edots');
const eoverlay  = document.getElementById('eoverlay');
const ems       = document.getElementById('ems');
const embody    = document.getElementById('embody');
const emdotsEl  = document.getElementById('emdots');

/* Crear puntos del slider */
DATA.forEach(() => {
  const d = document.createElement('div');
  d.className = 'edot';
  edotsEl.appendChild(d);
});
const sliderDots = [...edotsEl.children];

/* Crear puntos del modal */
DATA.forEach((_, i) => {
  const b = document.createElement('button');
  b.className = 'emdot';
  b.addEventListener('click', () => goTo(i));
  emdotsEl.appendChild(b);
});
const modalDots = [...emdotsEl.children];

function goTo(next) {
  next = ((next % N) + N) % N;
  eslides[cur].classList.remove('is-active');
  cur = next;
  eslides[cur].classList.add('is-active');

  sliderDots.forEach((d, i) => d.classList.toggle('on', i === cur));
  ems.style.transform = `translateX(-${cur * 100}%)`;
  modalDots.forEach((d, i) => d.classList.toggle('on', i === cur));

  const d = DATA[cur];

  /* Solo etiqueta, título y párrafos (sin tarjetas de cifras) */
  embody.innerHTML =
    `<span class="emtag">${d.tag}</span>` +
    `<div class="emtag-divider"></div>` +
    `<h3>${d.title}</h3>` +
    `<p>${d.p1}</p>` +
    (d.p2 ? `<p>${d.p2}</p>` : '');
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => { if (!modalOpen) goTo(cur + 1); }, 5000);
}

/* Controles slider */
document.getElementById('eNext').addEventListener('click', () => { goTo(cur + 1); startAuto(); });
document.getElementById('ePrev').addEventListener('click', () => { goTo(cur - 1); startAuto(); });

/* Controles modal */
document.getElementById('emNext').addEventListener('click', () => goTo(cur + 1));
document.getElementById('emPrev').addEventListener('click', () => goTo(cur - 1));

/* Abrir modal */
document.querySelectorAll('.ebtn').forEach(btn =>
  btn.addEventListener('click', () => {
    goTo(+btn.dataset.i);
    modalOpen = true;
    eoverlay.classList.add('open');
    clearInterval(autoTimer);
  })
);

/* Cerrar modal */
function closeModal() {
  modalOpen = false;
  eoverlay.classList.remove('open');
  startAuto();
}
document.getElementById('ecls').addEventListener('click', closeModal);
eoverlay.addEventListener('click', e => { if (e.target === eoverlay) closeModal(); });
document.addEventListener('keydown', e => {
  if (!modalOpen) return;
  if (e.key === 'Escape')      closeModal();
  if (e.key === 'ArrowRight')  goTo(cur + 1);
  if (e.key === 'ArrowLeft')   goTo(cur - 1);
});

goTo(0);
startAuto();