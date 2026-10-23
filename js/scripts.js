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

    /* ── Datos del slider de ejes ── */
    const DATA = [
      {
        tag: 'Oaxaca · Guerrero',
        title: 'Salina Cruz - Zihuatanejo',
        p1: 'Es uno de los Ejes Prioritarios de la actual administración. En 2025 se ampliaron 27 km y se construyeron ocho puentes; este año se trabajará en 37 km más en beneficio de las comunidades de Oaxaca y Guerrero.',
        p2: 'Se invertirán más de 24 mil millones de pesos en esta obra estratégica que fortalece la conectividad entre el Pacífico sur y las regiones del interior del país.',
        stats: [['27 km','Ampliados en 2025'],['8','Puentes construidos'],['> $24,000 mdp','Inversión']]
      },
      {
        tag: 'Colima',
        title: 'Pasos Superiores Vehiculares Arco Norte y Arco Sur',
        p1: 'Las obras están a punto de concluir y beneficiarán a 463 mil habitantes de la zona conurbada de la ciudad de Colima, mejorando significativamente la movilidad urbana.',
        p2: 'Con una inversión de mil 66 millones de pesos, los trabajos generarán 3 mil 198 empleos directos e indirectos.',
        stats: [['463 mil','Habitantes beneficiados'],['$1,066 mdp','Inversión'],['3,198','Empleos generados']]
      },
      {
        tag: 'Sonora · Chihuahua',
        title: 'Bavispe - Nuevo Casas Grandes',
        p1: 'Inició operaciones el 1 de febrero de 2026. Con una longitud total de 134 km, esta vía que conecta Sonora y Chihuahua beneficia a 115 mil habitantes de la región serrana.',
        p2: 'La nueva carretera permite la disminución de hora y media en los traslados entre ambas entidades, facilitando el acceso a servicios de salud, educación y mercados.',
        stats: [['134 km','Longitud total'],['115 mil','Habitantes beneficiados'],['-1 hr. 30 min.','Reducción en traslados']]
      },
      {
        tag: 'San Luis Potosí · Hidalgo',
        title: 'Carretera Tamazunchale - Huejutla',
        p1: 'La modernización registra avance del 75%. En una primera etapa se intervienen 37 km en beneficio de 309 mil habitantes, conectando San Luis Potosí e Hidalgo.',
        p2: 'En las obras se invierten 2 mil 469 millones de pesos. Esta vía es fundamental para el desarrollo económico de la Huasteca.',
        stats: [['75%','Avance de obra'],['309 mil','Habitantes beneficiados'],['$2,469 mdp','Inversión']]
      },
      {
        tag: 'Chiapas',
        title: 'Puente Rizo de Oro',
        p1: 'Esta obra presenta avance de más del 80% y beneficiará a 300 mil habitantes de 10 municipios de Chiapas al reducir los traslados en casi una hora.',
        p2: 'Durante su edificación se han generado 5 mil 715 empleos directos e indirectos. Con estas acciones, la SICT avanza en la consolidación de una infraestructura que será símbolo de conectividad, desarrollo regional y capacidad técnica en el sureste del país.',
        stats: [['>80%','Avance de obra'],['300 mil','Habitantes beneficiados'],['5,715','Empleos generados']]
      },
      {
        tag: 'Quintana Roo',
        title: 'Puente Vehicular Nichupté',
        p1: 'El Puente Vehicular Nichupté en Cancún beneficia a más de 1.3 millones de habitantes y favorece a turistas que visitan la región, es uno de los puentes más largos de América Latina sobre una laguna. Cuenta con 10 programas ambientales que protegen la zona ecológica del manglar. Esta obra emblemática transforma la movilidad en Cancún, al conectar la ciudad con la zona hotelera e impulsa el desarrollo social y económico de la zona.',
        p2: '',
        stats: [['1.3 millones','Habitantes beneficiados']]
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

      /* ★ innerHTML actualizado: incluye emtag-divider y ebtn-modal */
      embody.innerHTML =
        `<span class="emtag">${d.tag}</span>` +
        `<div class="emtag-divider"></div>` +
        `<h3>${d.title}</h3>` +
        `<p>${d.p1}</p>` +
        (d.p2 ? `<p>${d.p2}</p>` : '') +
        `<div class="estats">${d.stats.map(s =>
          `<div class="estat"><span>${s[0]}</span><span>${s[1]}</span></div>`
        ).join('')}</div>`;
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
