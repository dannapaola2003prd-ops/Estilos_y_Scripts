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
    p1: 'Es uno de los Ejes Prioritarios de la actual administración. En 2025 se ampliaron 27 km y se construyeron ocho puentes; este año se trabajará en 37 km más en beneficio de las comunidades de Oaxaca y Guerrero.',
    p2: 'Se invertirán más de 24 mil millones de pesos en esta obra estratégica que fortalece la conectividad entre el Pacífico sur y las regiones del interior del país.'
  },
  {
    tag: 'Colima',
    title: 'Puente Las Tunas',
    p1: 'El Puente Las Tunas se encuentra en su etapa final de construcción.',
    p2: 'La obra cruzará el Río Coahuayana y sustituirá el cruce que resultó afectado por el Huracán Lidia. Optimizará traslados, generará 235 empleos y beneficiará a más de 157 mil habitantes.'
  },
  {
    tag: 'Sonora · Chihuahua',
    title: 'Bavispe - Nuevo Casas Grandes',
    p1: 'Inició operaciones el 1 de febrero de 2026. Con una longitud total de 134 km, esta vía que conecta Sonora y Chihuahua beneficia a 115 mil habitantes de la región serrana.',
    p2: 'La nueva carretera permite la disminución de hora y media en los traslados entre ambas entidades, facilitando el acceso a servicios de salud, educación y mercados.'
  },
  {
    tag: 'Hidalgo · San Luis Potosí',
    title: 'Carretera Tamazunchale - Huejutla',
    p1: 'Se avanza en la modernización de la carretera Tamazunchale–Huejutla en la Huasteca. Este 2026 se intervienen 30 kilómetros en Hidalgo y 7 en San Luis Potosí.',
    p2: 'Al concluir las obras, el tiempo de recorrido entre Tamazunchale y Huejutla se reducirá hasta 65 minutos.'
  },
  {
    tag: 'Chiapas',
    title: 'Puente Rizo de Oro',
    p1: '¡Avanza la construcción del Puente Rizo de Oro en Chiapas!',
    p2: 'Esta moderna estructura de la ingeniería mexicana registra un avance del 98% y representa una obra de justicia social para más de 300 mil habitantes que cruzan la Presa La Angostura.'
  },
  {
    tag: 'Quintana Roo',
    title: 'Puente Vehicular Nichupté',
    p1: 'El Puente Vehicular Nichupté en Cancún beneficia a más de 1.3 millones de habitantes y favorece a turistas que visitan la región, es uno de los puentes más largos de América Latina sobre una laguna. Cuenta con 10 programas ambientales que protegen la zona ecológica del manglar. Esta obra emblemática transforma la movilidad en Cancún, al conectar la ciudad con la zona hotelera e impulsa el desarrollo social y económico de la zona',
    p2: ''
  },
  {
    tag: 'Tabasco · Campeche · Chiapas',
    title: 'Carretera Macuspana - Escárcega',
    p1: 'La meta para este año es modernizar 54 km de tramos ubicados en Tabasco, Campeche y Chiapas. La vía será ampliada a cuatro carriles con el propósito de reducir los tiempos de traslado hasta en 40 minutos.',
    p2: 'Durante 2026 se trabaja en 65 frentes de obra para ampliar a cuatro carriles 54 kilómetros de este Camino Prioritario con el propósito de reducir los tiempos de traslado hasta en 40 minutos..'
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