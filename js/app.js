/**
 * SIS-TERREMOTO: Controlador Principal de la Aplicación
 * Maneja el estado reactivo, la persistencia offline, renderizado y eventos
 */

(function() {
  'use strict';

  // ==========================================
  // ESTADO GLOBAL DE LA APLICACIÓN
  // ==========================================
  const State = {
    people: [],
    filters: {
      status: 'all', // all, safe, injured, missing, other_zone
      zone: 'all',
      role: 'all',
      teacher: 'all',
      location: 'all',
      search: ''
    },
    activeZone: 'Plazoleta Central',
    theme: 'dark',
    currentUser: {
      username: "prof.feibert",
      name: "Prof. Feibert Guzmán",
      role: "Docente Titular",
      department: "Ingeniería de Software"
    }
  };

  // Claves de LocalStorage
  const STORAGE_KEY_PEOPLE = 'sis_terremoto_roster_v1';
  const STORAGE_KEY_THEME = 'sis_terremoto_theme';



  // ==========================================
  // ELEMENTOS DEL DOM
  // ==========================================
  const DOM = {
    // KPIs
    kpiTotal: document.getElementById('kpi-total'),
    kpiSafe: document.getElementById('kpi-safe'),
    kpiSafePct: document.getElementById('kpi-safe-pct'),
    kpiAbsent: document.getElementById('kpi-absent'),
    kpiAbsentPct: document.getElementById('kpi-absent-pct'),
    kpiInjured: document.getElementById('kpi-injured'),
    kpiInjuredPct: document.getElementById('kpi-injured-pct'),
    kpiMissing: document.getElementById('kpi-missing'),
    kpiMissingPct: document.getElementById('kpi-missing-pct'),
    kpiOther: document.getElementById('kpi-other'),
    kpiOtherPct: document.getElementById('kpi-other-pct'),

    // Barra de Progreso
    progressText: document.getElementById('progress-text'),
    barSafe: document.getElementById('bar-safe'),
    barInjured: document.getElementById('bar-injured'),
    barOther: document.getElementById('bar-other'),
    barMissing: document.getElementById('bar-missing'),

    // Contadores de Pestañas
    countPillAll: document.getElementById('count-pill-all'),
    countPillSafe: document.getElementById('count-pill-safe'),
    countPillAbsent: document.getElementById('count-pill-absent'),
    countPillInjured: document.getElementById('count-pill-injured'),
    countPillMissing: document.getElementById('count-pill-missing'),
    countPillOther: document.getElementById('count-pill-other'),

    // Controles y Filtros
    searchInput: document.getElementById('search-input'),
    filterTeacher: document.getElementById('filter-teacher'),
    filterLocation: document.getElementById('filter-location'),
    filterZone: document.getElementById('filter-zone'),
    filterRole: document.getElementById('filter-role'),
    statusPills: document.querySelectorAll('.status-pill'),
    quickScanInput: document.getElementById('quick-scan-input'),
    activeZoneSelect: document.getElementById('active-zone-select'),
    btnMarkAllVisible: document.getElementById('btn-mark-all-visible'),
    btnResetDrill: document.getElementById('btn-reset-drill'),

    // Tabla
    rosterTbody: document.getElementById('roster-tbody'),

    // Botones y Cabecera
    btnToggleTheme: document.getElementById('btn-toggle-theme'),
    btnExportExcel: document.getElementById('btn-export-excel'),
    btnDownloadTemplate: document.getElementById('btn-download-template'),
    btnModalTemplate: document.getElementById('btn-modal-template'),
    btnPrintManifest: document.getElementById('btn-print-manifest'),
    printDateTime: document.getElementById('print-datetime'),

    // Modales
    btnOpenDocs: document.getElementById('btn-open-docs'),
    btnOpenImport: document.getElementById('btn-open-import'),
    btnOpenAddPerson: document.getElementById('btn-open-add-person'),
    modalDocs: document.getElementById('modal-docs'),
    modalImport: document.getElementById('modal-import'),
    modalTriage: document.getElementById('modal-triage'),
    modalPerson: document.getElementById('modal-person'),
    dropzone: document.getElementById('dropzone'),
    fileInput: document.getElementById('file-input'),

    // Formulario de Importación de Excel
    importTeacherName: document.getElementById('import-teacher-name'),
    importCourseName: document.getElementById('import-course-name'),

    // Form Triage
    triagePersonId: document.getElementById('triage-person-id'),
    triagePersonName: document.getElementById('triage-person-name'),
    triageSeverity: document.getElementById('triage-severity'),
    triageLocation: document.getElementById('triage-location'),
    triageNotes: document.getElementById('triage-notes'),
    triageEmergencyContact: document.getElementById('triage-emergency-contact'),
    btnSaveTriage: document.getElementById('btn-save-triage'),

    // Form Persona
    editPersonId: document.getElementById('edit-person-id'),
    modalPersonTitle: document.getElementById('modal-person-title'),
    inputPersonId: document.getElementById('input-person-id'),
    inputPersonDni: document.getElementById('input-person-dni'),
    inputPersonName: document.getElementById('input-person-name'),
    inputPersonRole: document.getElementById('input-person-role'),
    inputPersonTeacher: document.getElementById('input-person-teacher'),
    inputPersonDept: document.getElementById('input-person-dept'),
    inputPersonLocation: document.getElementById('input-person-location'),
    inputPersonLocStatus: document.getElementById('input-person-loc-status'),
    inputPersonLocDetail: document.getElementById('input-person-loc-detail'),
    inputPersonZone: document.getElementById('input-person-zone'),
    inputPersonPhone: document.getElementById('input-person-phone'),
    inputPersonCondition: document.getElementById('input-person-condition'),
    inputPersonContact: document.getElementById('input-person-contact'),
    btnSavePerson: document.getElementById('btn-save-person'),

    // Cierre de Sesión y Exportación de Base de Datos
    btnFinishRollcall: document.getElementById('btn-finish-rollcall'),
    btnQuickFinish: document.getElementById('btn-quick-finish'),
    modalFinishSession: document.getElementById('modal-finish-session'),
    finishStatTotal: document.getElementById('finish-stat-total'),
    finishStatSafe: document.getElementById('finish-stat-safe'),
    finishStatMissing: document.getElementById('finish-stat-missing'),
    finishStatInjured: document.getElementById('finish-stat-injured'),
    finishStatTime: document.getElementById('finish-stat-time'),
    finishTeacher: document.getElementById('finish-teacher'),
    finishCourse: document.getElementById('finish-course'),
    finishClassroom: document.getElementById('finish-classroom'),
    finishZone: document.getElementById('finish-zone'),
    finishNotes: document.getElementById('finish-notes'),
    btnExportOptExcel: document.getElementById('btn-export-opt-excel'),
    btnExportOptCsv: document.getElementById('btn-export-opt-csv'),
    btnExportOptJson: document.getElementById('btn-export-opt-json'),
    btnExportOptSql: document.getElementById('btn-export-opt-sql'),
    btnFinishPrintActa: document.getElementById('btn-finish-print-acta'),
    printTeacherName: document.getElementById('print-teacher-name'),

    // Notificaciones Toast
    toastContainer: document.getElementById('toast-container')
  };

  // ==========================================
  // INICIALIZACIÓN
  // ==========================================
  function init() {
    loadTheme();
    loadPeople();
    setupEventListeners();
    render();
  }

  // ==========================================
  // PERSISTENCIA Y CARGA DE DATOS
  // ==========================================
  function normalizePersonData(p) {
    if (!p.teacherInCharge || p.teacherInCharge === 'Dr. Roberto Silva Morales') {
      if (p.role === 'Docente') {
        p.teacherInCharge = 'Prof. Feibert Guzmán (Titular)';
      } else if (p.role === 'Brigadista') {
        p.teacherInCharge = 'Centro de Operaciones (COE)';
      } else if (p.role === 'Administrativo' || p.role === 'Personal de Servicio') {
        p.teacherInCharge = 'Administración Central';
      } else {
        p.teacherInCharge = 'Prof. Feibert Guzmán';
      }
    }

    if (p.id === 'DOC-201') {
      p.name = 'Prof. Feibert Guzmán';
      p.teacherInCharge = 'Prof. Feibert Guzmán (Titular)';
      p.department = 'Ingeniería de Software';
    }

    if (!p.department || p.department === 'Ing. Informática 2' || p.department === 'Ciencias Básicas') {
      p.department = 'Ingeniería de Software';
    }

    if (!p.assignedZone || p.assignedZone === 'Zona A - Patio Central') {
      p.assignedZone = 'Plazoleta Central';
    }

    if (!p.currentLocationStatus) {
      if (p.status === 'safe') {
        p.currentLocationStatus = 'safe_zone';
        p.currentLocationDetail = p.actualZone || p.assignedZone || 'Plazoleta Central';
      } else if (p.status === 'injured') {
        p.currentLocationStatus = 'other';
        p.currentLocationDetail = p.lastKnownLocation || p.baseLocation;
      } else if (p.status === 'other_zone') {
        p.currentLocationStatus = 'other';
        p.currentLocationDetail = p.actualZone || 'Otra Zona';
      } else {
        p.currentLocationStatus = 'classroom';
        p.currentLocationDetail = p.baseLocation;
      }
    }
    return p;
  }

  function populateTeacherDropdown() {
    if (!DOM.filterTeacher) return;
    const currentVal = DOM.filterTeacher.value;
    const teachers = Array.from(new Set(State.people.map(p => p.teacherInCharge).filter(Boolean))).sort();
    
    let html = '<option value="all">Todos los Profesores</option>';
    teachers.forEach(t => {
      html += `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`;
    });
    DOM.filterTeacher.innerHTML = html;
    if (teachers.includes(currentVal)) {
      DOM.filterTeacher.value = currentVal;
    }
  }

  // ==========================================
  // CLASIFICADOR ESPACIAL EXACTO DE EDIFICIOS (CAMPUS UNILASALLISTA)
  // ==========================================
  function getPersonBuilding(p) {
    if (!p) return 'Plazoleta Central';
    const locStatus = p.currentLocationStatus || (p.status === 'safe' ? 'safe_zone' : 'classroom');

    // 1. Si la persona ya fue evacuada físicamente y está a salvo en la Plazoleta
    if (locStatus === 'safe_zone') {
      if (p.actualZone && p.actualZone !== 'No asignada' && p.actualZone !== 'Plazoleta Central') {
        return p.actualZone;
      }
      return 'Plazoleta Central';
    }

    // 2. Para personas en el aula, en otra parte, atrapadas, en tránsito o desaparecidas:
    // Evaluar en orden de prioridad: 1) detalle de ubicación actual, 2) última ubicación vista, 3) aula/oficina base
    const candidates = [
      (p.currentLocationDetail || '').trim(),
      (p.lastKnownLocation || '').trim(),
      (p.baseLocation || '').trim()
    ].filter(Boolean);

    for (const text of candidates) {
      const t = text.toLowerCase();

      // a. Edificio Administrativo (Rectoría, Gestión Humana, SST, Admisiones, Registro)
      if (t.includes('administrativ') || t.includes('rector') || t.includes('admision') || t.includes('sst') || t.includes('gestion humana') || t.includes('registro') || t.includes('oficina 101') || t.includes('oficina 102') || t.includes('taquilla')) {
        return 'Administrativo';
      }

      // b. Bloque de Medicina Veterinaria (Clínicas, Quirófanos y Laboratorios)
      if (t.includes('veterinaria') || t.includes('quirófano') || t.includes('quirofano') || t.includes('clínica') || t.includes('clinica') || t.includes('pequeñas especies') || t.includes('lab de veter')) {
        return 'Bloque de Veterinaria';
      }

      // c. Cafetería Central
      if (t.includes('cafeter') || t.includes('casino') || t.includes('comedor')) {
        return 'Cafetería';
      }

      // d. Biblioteca Institucional
      if (t.includes('biblioteca') || t.includes('sala de estudio') || t.includes('hemeroteca')) {
        return 'Biblioteca';
      }

      // e. Bloque C (Auditorio Mayor San Juan Bautista de La Salle y Laboratorios Agroindustriales)
      if (t.includes('bloque c') || t.includes('auditorio') || t.includes('lab 204') || t.includes('agroindustrial') || t.includes('laboratorio c')) {
        return 'Bloque C';
      }

      // f. Bloque B (Aulas Generales 201 - 405)
      if (t.includes('bloque b') || t.includes('aula 302') || t.includes('aula 202') || t.includes('aula 203')) {
        return 'Bloque B';
      }

      // g. Bloque A (Ingeniería de Software y Salas de Cómputo)
      if (t.includes('bloque a') || t.includes('sala de cómputo') || t.includes('sala de computo') || t.includes('aula 101') || t.includes('aula 201')) {
        return 'Bloque A';
      }

      // h. Plazoleta Central
      if (t.includes('plazoleta') || t.includes('patio central') || t.includes('punto seguro')) {
        return 'Plazoleta Central';
      }
    }

    // Fallback seguro
    return p.assignedZone || 'Plazoleta Central';
  }

  function loadPeople() {
    const saved = localStorage.getItem(STORAGE_KEY_PEOPLE);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length < 8 || !parsed.some(p => p.id === 'ADM-302')) {
          State.people = ExcelHandler.getPreloadedData().map(normalizePersonData);
          savePeople();
        } else {
          State.people = parsed.map(normalizePersonData);
        }
      } catch (e) {
        console.error("Error al leer localStorage:", e);
        State.people = ExcelHandler.getPreloadedData().map(normalizePersonData);
      }
    } else {
      // Datos iniciales de demostración
      State.people = ExcelHandler.getPreloadedData().map(normalizePersonData);
      savePeople();
    }
    populateTeacherDropdown();
  }

  function savePeople() {
    try {
      localStorage.setItem(STORAGE_KEY_PEOPLE, JSON.stringify(State.people));
    } catch (e) {
      console.error("Error al guardar en localStorage:", e);
    }
  }

  const SVG_THEME_MOON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const SVG_THEME_SUN = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
    State.theme = savedTheme;
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      if (DOM.btnToggleTheme) DOM.btnToggleTheme.innerHTML = SVG_THEME_MOON;
    } else {
      document.body.classList.remove('light-mode');
      if (DOM.btnToggleTheme) DOM.btnToggleTheme.innerHTML = SVG_THEME_SUN;
    }
  }

  function toggleTheme() {
    if (State.theme === 'dark') {
      State.theme = 'light';
      document.body.classList.add('light-mode');
      if (DOM.btnToggleTheme) DOM.btnToggleTheme.innerHTML = SVG_THEME_MOON;
    } else {
      State.theme = 'dark';
      document.body.classList.remove('light-mode');
      if (DOM.btnToggleTheme) DOM.btnToggleTheme.innerHTML = SVG_THEME_SUN;
    }
    localStorage.setItem(STORAGE_KEY_THEME, State.theme);
  }

  // ==========================================
  // CÁLCULO DE ESTADÍSTICAS Y KPIS
  // ==========================================
  function getStats() {
    const total = State.people.length;
    const safe = State.people.filter(p => p.status === 'safe').length;
    const absent = State.people.filter(p => p.status === 'absent').length;
    const injured = State.people.filter(p => p.status === 'injured').length;
    const missing = State.people.filter(p => p.status === 'missing').length;
    const otherZone = State.people.filter(p => p.status === 'other_zone').length;

    const accounted = safe + absent + injured + otherZone;
    const accountedPercentage = total > 0 ? Math.round((accounted / total) * 100) : 0;

    return {
      total,
      safe,
      absent,
      injured,
      missing,
      otherZone,
      accounted,
      accountedPercentage
    };
  }

  // ==========================================
  // FILTRADO Y BÚSQUEDA
  // ==========================================
  function getFilteredPeople() {
    const { status, zone, role, teacher, location, search } = State.filters;
    const searchLower = search.toLowerCase().trim();

    return State.people.filter(p => {
      // Filtro por Estado
      if (status !== 'all' && p.status !== status) {
        return false;
      }

      // Filtro por Profesor Encargado
      if (teacher && teacher !== 'all') {
        if ((p.teacherInCharge || '') !== teacher) return false;
      }

      // Filtro por Ubicación (Salón, Zona Segura, Otra parte, etc.)
      if (location && location !== 'all') {
        const locStatus = p.currentLocationStatus || 'classroom';
        if (locStatus !== location) return false;
      }

      // Filtro por Zona / Edificio del Campus
      if (zone !== 'all') {
        const personBuilding = getPersonBuilding(p);
        const matchesAssigned = p.assignedZone === zone;
        const matchesActual = p.actualZone === zone;
        const matchesBase = (p.baseLocation || '').toLowerCase().includes(zone.toLowerCase());
        const matchesDetail = (p.currentLocationDetail || '').toLowerCase().includes(zone.toLowerCase());
        if (personBuilding !== zone && !matchesAssigned && !matchesActual && !matchesBase && !matchesDetail) {
          return false;
        }
      }

      // Filtro por Rol
      if (role !== 'all') {
        if (role === 'special') {
          if (!p.specialCondition || p.specialCondition.toLowerCase() === 'ninguna') {
            return false;
          }
        } else if (p.role !== role) {
          return false;
        }
      }

      // Filtro por Búsqueda de Texto
      if (searchLower) {
        const nameMatch = p.name.toLowerCase().includes(searchLower);
        const dniMatch = (p.dni || '').toLowerCase().includes(searchLower);
        const idMatch = (p.id || '').toLowerCase().includes(searchLower);
        const deptMatch = (p.department || '').toLowerCase().includes(searchLower);
        const teacherMatch = (p.teacherInCharge || '').toLowerCase().includes(searchLower);
        const locMatch = (p.baseLocation || '').toLowerCase().includes(searchLower);
        const locDetMatch = (p.currentLocationDetail || '').toLowerCase().includes(searchLower);
        if (!nameMatch && !dniMatch && !idMatch && !deptMatch && !teacherMatch && !locMatch && !locDetMatch) {
          return false;
        }
      }

      return true;
    });
  }

  // ==========================================
  // RENDERIZADO PRINCIPAL
  // ==========================================
  function render() {
    const stats = getStats();

    // 1. Actualizar KPIs
    if (DOM.kpiTotal) DOM.kpiTotal.textContent = stats.total;
    if (DOM.kpiSafe) DOM.kpiSafe.textContent = stats.safe;
    if (DOM.kpiSafePct) DOM.kpiSafePct.textContent = stats.total > 0 ? `(${((stats.safe / stats.total) * 100).toFixed(0)}%)` : '(0%)';

    if (DOM.kpiAbsent) DOM.kpiAbsent.textContent = stats.absent;
    if (DOM.kpiAbsentPct) DOM.kpiAbsentPct.textContent = stats.total > 0 ? `(${((stats.absent / stats.total) * 100).toFixed(0)}%)` : '(0%)';

    if (DOM.kpiInjured) DOM.kpiInjured.textContent = stats.injured;
    if (DOM.kpiInjuredPct) DOM.kpiInjuredPct.textContent = stats.total > 0 ? `(${((stats.injured / stats.total) * 100).toFixed(0)}%)` : '(0%)';

    if (DOM.kpiMissing) DOM.kpiMissing.textContent = stats.missing;
    if (DOM.kpiMissingPct) DOM.kpiMissingPct.textContent = stats.total > 0 ? `(${((stats.missing / stats.total) * 100).toFixed(0)}%)` : '(0%)';

    if (DOM.kpiOther) DOM.kpiOther.textContent = stats.otherZone;
    if (DOM.kpiOtherPct) DOM.kpiOtherPct.textContent = stats.total > 0 ? `(${((stats.otherZone / stats.total) * 100).toFixed(0)}%)` : '(0%)';

    // 2. Barra de Progreso
    if (DOM.progressText) DOM.progressText.textContent = `${stats.accountedPercentage}% Verificado (${stats.accounted}/${stats.total})`;
    if (stats.total > 0) {
      if (DOM.barSafe) DOM.barSafe.style.width = `${(stats.safe / stats.total) * 100}%`;
      if (DOM.barInjured) DOM.barInjured.style.width = `${(stats.injured / stats.total) * 100}%`;
      if (DOM.barOther) DOM.barOther.style.width = `${(stats.otherZone / stats.total) * 100}%`;
      if (DOM.barMissing) DOM.barMissing.style.width = `${(stats.missing / stats.total) * 100}%`;
    } else {
      if (DOM.barSafe) DOM.barSafe.style.width = '0%';
      if (DOM.barInjured) DOM.barInjured.style.width = '0%';
      if (DOM.barOther) DOM.barOther.style.width = '0%';
      if (DOM.barMissing) DOM.barMissing.style.width = '100%';
    }

    // 3. Contadores en Pestañas
    if (DOM.countPillAll) DOM.countPillAll.textContent = stats.total;
    if (DOM.countPillSafe) DOM.countPillSafe.textContent = stats.safe;
    if (DOM.countPillAbsent) DOM.countPillAbsent.textContent = stats.absent;
    if (DOM.countPillInjured) DOM.countPillInjured.textContent = stats.injured;
    if (DOM.countPillMissing) DOM.countPillMissing.textContent = stats.missing;
    if (DOM.countPillOther) DOM.countPillOther.textContent = stats.otherZone;

    // 4. Renderizar Filas de la Tabla
    const filteredList = getFilteredPeople();
    renderTableRows(filteredList);

    // 5. Fecha en Manifiesto de Impresión
    if (DOM.printDateTime) {
      DOM.printDateTime.textContent = `Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    }
  }

  function renderTableRows(peopleList) {
    if (peopleList.length === 0) {
      DOM.rosterTbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.5rem; opacity: 0.5;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <p style="font-weight: 600;">No se encontraron personas con los filtros seleccionados.</p>
            <p style="font-size: 0.8rem; margin-top: 0.25rem;">Intente limpiar la búsqueda o cambiar el filtro de profesor, ubicación o zona.</p>
          </td>
        </tr>
      `;
      return;
    }

    const rowsHtml = peopleList.map(p => {
      // Clase de fila según estado
      let rowClass = '';
      if (p.status === 'missing') rowClass = 'row-missing';
      if (p.status === 'injured') rowClass = 'row-injured';
      if (p.status === 'absent') rowClass = 'row-absent';

      // Badge de Rol
      const isBrigadista = p.role.toLowerCase().includes('brigad');
      const roleBadgeClass = isBrigadista ? 'role-badge brigadista' : 'role-badge';

      // Badge de Condición Especial
      const hasSpecial = p.specialCondition && p.specialCondition.toLowerCase() !== 'ninguna';
      const specialBadgeHtml = hasSpecial ? `<span class="special-badge" title="Condición de Salud">${escapeHtml(p.specialCondition)}</span>` : '';

      // Triage indicator
      let triageBadge = '';
      if (p.status === 'injured') {
        const sevColor = p.triageSeverity === 'red' ? '#ef4444' : (p.triageSeverity === 'yellow' ? '#f59e0b' : '#10b981');
        const sevText = p.triageSeverity === 'red' ? 'GRAVE (ROJO)' : (p.triageSeverity === 'yellow' ? 'MODERADO (AMARILLO)' : 'LEVE (VERDE)');
        triageBadge = `<div style="font-size: 0.72rem; color: ${sevColor}; font-weight: 700; margin-top: 3px;">Triage: ${sevText}</div>`;
      }

      // Teléfono y contacto
      const contactHtml = p.phone && p.phone !== '-' ? 
        `<a href="tel:${escapeHtml(p.phone)}" class="contact-link" title="Llamar a ${escapeHtml(p.name)}"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 3px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${escapeHtml(p.phone)}</a>` : 
        `<span style="color: var(--text-subtle); font-size: 0.75rem;">Sin teléfono</span>`;

      // Estado de Ubicación (Salón, Zona Segura, Otra parte, Tránsito, Atrapado)
      const locStatus = p.currentLocationStatus || (p.status === 'safe' ? 'safe_zone' : 'classroom');
      let locationBadgeHtml = '';

      if (locStatus === 'safe_zone') {
        locationBadgeHtml = `
          <span class="location-tag in-safe">En Zona Segura</span>
          <div style="font-size: 0.75rem; color: #34d399; font-weight: 600; margin-top: 3px;">
            ${escapeHtml(p.actualZone || p.assignedZone)}
          </div>
        `;
      } else if (p.status === 'absent') {
        locationBadgeHtml = `
          <span class="location-tag in-other" style="background: rgba(100, 116, 139, 0.15); color: #94a3b8; border-color: rgba(148, 163, 184, 0.25);">No Asistió</span>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; margin-top: 3px;">
            Ausente de clase
          </div>
        `;
      } else if (locStatus === 'other') {
        locationBadgeHtml = `
          <span class="location-tag in-other">Fuera del Salón</span>
          <div style="font-size: 0.75rem; color: #fbbf24; font-weight: 600; margin-top: 3px;">
            ${escapeHtml(p.currentLocationDetail || 'En otra parte')}
          </div>
        `;
      } else if (locStatus === 'transit') {
        locationBadgeHtml = `
          <span class="location-tag in-transit">En Tránsito</span>
          <div style="font-size: 0.75rem; color: #22d3ee; font-weight: 600; margin-top: 3px;">
            ${escapeHtml(p.currentLocationDetail || 'Escaleras / Pasillo')}
          </div>
        `;
      } else if (locStatus === 'trapped') {
        locationBadgeHtml = `
          <span class="location-tag in-trapped">ATRAPADO</span>
          <div style="font-size: 0.75rem; color: #f87171; font-weight: 700; margin-top: 3px;">
            ${escapeHtml(p.currentLocationDetail || 'Sin salida')}
          </div>
        `;
      } else {
        locationBadgeHtml = `
          <span class="location-tag in-classroom">En el Salón</span>
          <div style="font-size: 0.75rem; color: #60a5fa; font-weight: 600; margin-top: 3px;">
            ${escapeHtml(p.baseLocation || 'Aula base')}
          </div>
        `;
      }

      return `
        <tr class="${rowClass}" data-id="${p.id}">
          <!-- Persona / Identificación -->
          <td>
            <div class="person-identity">
              <div class="person-name">
                ${escapeHtml(p.name)}
              </div>
              <div class="person-sub">
                ID: <strong>${escapeHtml(p.id)}</strong> | DNI: ${escapeHtml(p.dni || 'N/R')}
              </div>
              ${specialBadgeHtml}
              ${triageBadge}
            </div>
          </td>

          <!-- Profesor Encargado / Curso -->
          <td>
            <span class="teacher-badge">
              ${escapeHtml(p.teacherInCharge || 'Prof. Feibert Guzmán')}
            </span>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
              <span class="${roleBadgeClass}">${escapeHtml(p.role)}</span> · ${escapeHtml(p.department || '')}
            </div>
            <div style="margin-top: 3px;">
              ${contactHtml}
            </div>
          </td>

          <!-- ¿Dónde se encuentra? -->
          <td>
            <div style="display: flex; flex-direction: column;">
              ${locationBadgeHtml}
            </div>
          </td>

          <!-- Punto de Encuentro Asignado -->
          <td>
            <div class="zone-chip">
              ${escapeHtml(p.assignedZone)}
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 3px;">
              Hora: <strong>${escapeHtml(p.timestamp || '-')}</strong>
            </div>
          </td>

          <!-- Control de Estado Rápido (1 Clic): Presente, Ausente, Faltante -->
          <td style="text-align: center;">
            <div class="status-action-group">
              <button class="btn-state ${p.status === 'safe' ? 'active-safe' : ''}" 
                      onclick="window.AppController.quickSetStatus('${p.id}', 'safe')" 
                      title="Marcar como Presente">
                Presente
              </button>
              <button class="btn-state ${p.status === 'absent' ? 'active-absent' : ''}" 
                      onclick="window.AppController.quickSetStatus('${p.id}', 'absent')" 
                      title="Marcar como Ausente (no asistió al campus hoy)">
                Ausente
              </button>
              <button class="btn-state ${p.status === 'missing' ? 'active-missing' : ''}" 
                      onclick="window.AppController.quickSetStatus('${p.id}', 'missing')" 
                      title="Marcar como Faltante (paradero desconocido tras sismo)">
                Faltante
              </button>
            </div>
          </td>

          <!-- Acciones de Fila -->
          <td style="text-align: right;">
            <div class="row-actions" style="justify-content: flex-end;">
              <button class="icon-btn ${p.triageNotes ? 'btn-triage-active' : ''}" 
                      onclick="window.AppController.openTriage('${p.id}')" 
                      title="Ficha Médica y Triaje START">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
              </button>
              <button class="icon-btn" 
                      onclick="window.AppController.editPerson('${p.id}')" 
                      title="Editar datos, ubicación y profesor">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="icon-btn" 
                      onclick="window.AppController.deletePerson('${p.id}')" 
                      style="color: #f87171;" 
                      title="Eliminar del censo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    DOM.rosterTbody.innerHTML = rowsHtml;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================
  // OPERACIONES DE ESTADO Y PASE DE LISTA
  // ==========================================
  function setPersonStatus(id, newStatus, customZone = null) {
    const person = State.people.find(p => p.id === id);
    if (!person) return;

    person.status = newStatus;
    person.timestamp = (newStatus === 'missing' || newStatus === 'absent') ? '-' : new Date().toLocaleTimeString();

    if (newStatus === 'safe') {
      person.actualZone = customZone || DOM.activeZoneSelect.value || person.assignedZone;
      person.currentLocationStatus = 'safe_zone';
      person.currentLocationDetail = person.actualZone;
      if (window.soundSystem) window.soundSystem.playSuccess();
      showToast(`${person.name} registrado como PRESENTE`, 'success');
    } else if (newStatus === 'absent') {
      person.actualZone = 'No asistió al campus';
      person.currentLocationStatus = 'other';
      person.currentLocationDetail = 'Ausente de clase';
      if (window.soundSystem) window.soundSystem.playSuccess();
      showToast(`${person.name} registrado como AUSENTE (no asistió hoy)`, 'info');
    } else if (newStatus === 'injured') {
      person.actualZone = customZone || DOM.activeZoneSelect.value || person.assignedZone;
      if (window.soundSystem) window.soundSystem.playWarning();
      showToast(`${person.name} registrado en ATENCIÓN MÉDICA`, 'warning');
    } else if (newStatus === 'missing') {
      person.actualZone = 'Paradero desconocido';
      person.currentLocationStatus = 'classroom';
      person.currentLocationDetail = person.baseLocation;
      if (window.soundSystem) window.soundSystem.playDanger();
      showToast(`${person.name} registrado como FALTANTE (paradero desconocido tras sismo)`, 'danger');
    } else if (newStatus === 'other_zone') {
      person.actualZone = customZone || 'Otra Zona Segura';
      person.currentLocationStatus = 'other';
      person.currentLocationDetail = person.actualZone;
      if (window.soundSystem) window.soundSystem.playSuccess();
      showToast(`${person.name} registrado en otra zona`, 'info');
    }

    savePeople();
    render();
  }

  // Pase rápido por Escáner / Código de barras / DNI
  function handleQuickScan(inputVal) {
    const clean = inputVal.trim();
    if (!clean) return;

    const lower = clean.toLowerCase();
    // Búsqueda por ID exacto, DNI exacto o coincidencia de nombre
    let found = State.people.find(p => p.id.toLowerCase() === lower || (p.dni && p.dni.toLowerCase() === lower));

    if (!found) {
      // Buscar por nombre si no es código
      found = State.people.find(p => p.name.toLowerCase().includes(lower));
    }

    if (found) {
      const activeZone = DOM.activeZoneSelect.value;
      setPersonStatus(found.id, 'safe', activeZone);
      showToast(`${found.name} registrado como PRESENTE en ${activeZone}`, 'success');
      DOM.quickScanInput.value = '';
      DOM.quickScanInput.focus();
    } else {
      window.soundSystem.playDanger();
      showToast(`No se encontró registro para "${clean}". Puede agregarlo manualmente.`, 'danger');
    }
  }

  // Marcar todos los visibles actualmente como Presentes
  function markAllVisibleSafe() {
    const visible = getFilteredPeople();
    if (visible.length === 0) {
      showToast("No hay personas visibles en el filtro actual.", "warning");
      return;
    }

    const currentZone = DOM.activeZoneSelect.value;
    const confirmMsg = `¿Desea marcar a ${visible.length} personas visibles como PRESENTES en "${currentZone}"?`;
    if (!confirm(confirmMsg)) return;

    visible.forEach(p => {
      p.status = 'safe';
      p.actualZone = currentZone;
      p.currentLocationStatus = 'safe_zone';
      p.currentLocationDetail = currentZone;
      p.timestamp = new Date().toLocaleTimeString();
    });

    window.soundSystem.playSuccess();
    savePeople();
    render();
    showToast(`${visible.length} personas marcadas como PRESENTES en ${currentZone}`, 'success');
  }

  // Reiniciar simulacro (vuelve todos a 'missing')
  function resetDrill() {
    if (!confirm("¿Está seguro de reiniciar el pase de asistencia? Todos los estados volverán a 'Faltante'.")) {
      return;
    }

    State.people.forEach(p => {
      p.status = 'missing';
      p.actualZone = 'No asignada';
      p.currentLocationStatus = 'classroom';
      p.currentLocationDetail = p.baseLocation;
      p.timestamp = '-';
      p.triageSeverity = 'none';
      p.triageNotes = '';
    });

    State.timerSeconds = 0;
    updateTimerDisplay();
    savePeople();
    render();
    showToast("Asistencia reiniciada. Todas las personas en estado Faltante.", "warning");
  }

  // ==========================================
  // MANEJO DE MODALES
  // ==========================================
  function openModal(modalEl) {
    modalEl.classList.add('open');
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('open');
  }

  function setupModalClosers() {
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        const targetModal = document.getElementById(modalId);
        if (targetModal) closeModal(targetModal);
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeModal(backdrop);
        }
      });
    });
  }

  // Modal Triaje
  function openTriage(id) {
    const person = State.people.find(p => p.id === id);
    if (!person) return;

    DOM.triagePersonId.value = person.id;
    DOM.triagePersonName.textContent = `Triaje Médico: ${person.name} (${person.id})`;
    DOM.triageSeverity.value = person.triageSeverity || 'none';
    DOM.triageLocation.value = person.lastKnownLocation || person.baseLocation || '';
    DOM.triageNotes.value = person.triageNotes || '';
    DOM.triageEmergencyContact.value = person.emergencyContact || '';

    openModal(DOM.modalTriage);
  }

  function saveTriage() {
    const id = DOM.triagePersonId.value;
    const person = State.people.find(p => p.id === id);
    if (!person) return;

    person.triageSeverity = DOM.triageSeverity.value;
    person.lastKnownLocation = DOM.triageLocation.value;
    person.triageNotes = DOM.triageNotes.value;
    person.emergencyContact = DOM.triageEmergencyContact.value;

    // Si tiene severidad mayor a none, cambiar automáticamente estado a 'injured'
    if (person.triageSeverity !== 'none') {
      person.status = 'injured';
      person.actualZone = DOM.activeZoneSelect.value || person.assignedZone;
      person.timestamp = new Date().toLocaleTimeString();
      window.soundSystem.playWarning();
    }

    savePeople();
    closeModal(DOM.modalTriage);
    render();
    showToast(`Ficha médica actualizada para ${person.name}`, 'warning');
  }

  // Modal Persona (Agregar / Editar)
  function openAddPerson() {
    DOM.editPersonId.value = '';
    DOM.modalPersonTitle.textContent = 'Registrar Nueva Persona en el Censo';
    DOM.inputPersonId.value = `PER-${Math.floor(1000 + Math.random() * 9000)}`;
    DOM.inputPersonDni.value = '';
    DOM.inputPersonName.value = '';
    DOM.inputPersonRole.value = 'Estudiante';
    DOM.inputPersonTeacher.value = 'Prof. Feibert Guzmán';
    DOM.inputPersonDept.value = 'Ingeniería de Software';
    DOM.inputPersonLocation.value = 'Bloque A - Aula 201';
    DOM.inputPersonLocStatus.value = 'classroom';
    DOM.inputPersonLocDetail.value = 'Bloque A - Aula 201';
    DOM.inputPersonZone.value = 'Plazoleta Central';
    DOM.inputPersonPhone.value = '';
    DOM.inputPersonCondition.value = '';
    DOM.inputPersonContact.value = '';

    openModal(DOM.modalPerson);
  }

  function openEditPerson(id) {
    const person = State.people.find(p => p.id === id);
    if (!person) return;

    DOM.editPersonId.value = person.id;
    DOM.modalPersonTitle.textContent = `Editar Datos: ${person.name}`;
    DOM.inputPersonId.value = person.id;
    DOM.inputPersonDni.value = person.dni || '';
    DOM.inputPersonName.value = person.name;
    DOM.inputPersonRole.value = person.role;
    DOM.inputPersonTeacher.value = person.teacherInCharge || 'Prof. Feibert Guzmán';
    DOM.inputPersonDept.value = person.department || 'Ingeniería de Software';
    DOM.inputPersonLocation.value = person.baseLocation || '';
    DOM.inputPersonLocStatus.value = person.currentLocationStatus || 'classroom';
    DOM.inputPersonLocDetail.value = person.currentLocationDetail || person.baseLocation || '';
    DOM.inputPersonZone.value = person.assignedZone || 'Plazoleta Central';
    DOM.inputPersonPhone.value = person.phone || '';
    DOM.inputPersonCondition.value = person.specialCondition || '';
    DOM.inputPersonContact.value = person.emergencyContact || '';

    openModal(DOM.modalPerson);
  }

  function savePerson() {
    const isEdit = !!DOM.editPersonId.value;
    const id = DOM.inputPersonId.value.trim();
    const name = DOM.inputPersonName.value.trim();

    if (!id || !name) {
      alert("Por favor complete los campos obligatorios (ID y Nombre).");
      return;
    }

    if (isEdit) {
      const person = State.people.find(p => p.id === DOM.editPersonId.value);
      if (person) {
        person.name = name;
        person.dni = DOM.inputPersonDni.value.trim();
        person.role = DOM.inputPersonRole.value;
        person.teacherInCharge = DOM.inputPersonTeacher.value.trim() || 'Prof. Feibert Guzmán';
        person.department = DOM.inputPersonDept.value.trim() || 'Ingeniería de Software';
        person.baseLocation = DOM.inputPersonLocation.value.trim();
        person.currentLocationStatus = DOM.inputPersonLocStatus.value;
        person.currentLocationDetail = DOM.inputPersonLocDetail.value.trim() || person.baseLocation;
        person.assignedZone = DOM.inputPersonZone.value;
        person.phone = DOM.inputPersonPhone.value.trim();
        person.specialCondition = DOM.inputPersonCondition.value.trim();
        person.emergencyContact = DOM.inputPersonContact.value.trim();
      }
      showToast(`Datos de ${name} actualizados`, 'success');
    } else {
      // Validar ID duplicado
      if (State.people.some(p => p.id === id)) {
        alert("Ya existe una persona registrada con ese ID/Código.");
        return;
      }

      const newPerson = {
        id,
        name,
        dni: DOM.inputPersonDni.value.trim(),
        role: DOM.inputPersonRole.value,
        teacherInCharge: DOM.inputPersonTeacher.value.trim() || 'Prof. Feibert Guzmán',
        department: DOM.inputPersonDept.value.trim() || 'Ingeniería de Software',
        baseLocation: DOM.inputPersonLocation.value.trim(),
        currentLocationStatus: DOM.inputPersonLocStatus.value,
        currentLocationDetail: DOM.inputPersonLocDetail.value.trim() || DOM.inputPersonLocation.value.trim(),
        assignedZone: DOM.inputPersonZone.value,
        actualZone: DOM.inputPersonLocStatus.value === 'safe_zone' ? DOM.inputPersonZone.value : 'No asignada',
        phone: DOM.inputPersonPhone.value.trim(),
        emergencyContact: DOM.inputPersonContact.value.trim(),
        specialCondition: DOM.inputPersonCondition.value.trim() || 'Ninguna',
        status: DOM.inputPersonLocStatus.value === 'safe_zone' ? 'safe' : 'missing',
        timestamp: DOM.inputPersonLocStatus.value === 'safe_zone' ? new Date().toLocaleTimeString() : '-',
        triageSeverity: 'none',
        triageNotes: '',
        lastKnownLocation: DOM.inputPersonLocation.value.trim()
      };
      State.people.unshift(newPerson);
      showToast(`${name} agregado al censo de evacuación`, 'success');
    }

    populateTeacherDropdown();
    savePeople();
    closeModal(DOM.modalPerson);
    render();
  }

  function deletePerson(id) {
    const person = State.people.find(p => p.id === id);
    if (!person) return;

    if (confirm(`¿Está seguro de eliminar a ${person.name} (${person.id}) del censo?`)) {
      State.people = State.people.filter(p => p.id !== id);
      savePeople();
      render();
      showToast(`${person.name} eliminado del censo`, 'danger');
    }
  }

  // ==========================================
  // IMPORTACIÓN / EXPORTACIÓN EXCEL
  // ==========================================
  function handleFileImport(file) {
    if (!file) return;

    const customTeacher = DOM.importTeacherName ? DOM.importTeacherName.value.trim() : '';
    const customCourse = DOM.importCourseName ? DOM.importCourseName.value.trim() : '';

    ExcelHandler.parseFile(file, { customTeacher, customCourse }, (err, data) => {
      if (err) {
        alert("Error al leer el archivo: " + err.message);
        return;
      }

      if (data && data.length > 0) {
        if (confirm(`Se encontraron ${data.length} registros en la hoja de cálculo.\n\n¿Desea REEMPLAZAR la lista actual (Aceptar) o COMBINARLA con los registros existentes (Cancelar para combinar)?`)) {
          State.people = data;
        } else {
          // Combinar evitando IDs duplicados
          const existingIds = new Set(State.people.map(p => p.id));
          const newEntries = data.filter(d => !existingIds.has(d.id));
          State.people = [...State.people, ...newEntries];
        }

        if (customTeacher && DOM.finishTeacher) {
          DOM.finishTeacher.value = customTeacher;
        }
        if (customCourse && DOM.finishCourse) {
          DOM.finishCourse.value = customCourse;
        }

        savePeople();
        populateTeacherDropdown();
        render();
        closeModal(DOM.modalImport);
        showToast(`Importación exitosa: ${data.length} personas procesadas`, 'success');
      }
    });
  }

  function exportReport() {
    const stats = getStats();
    const drillMeta = {
      eventType: "Simulacro / Evacuación Unilasallista",
      officerInCharge: (DOM.finishTeacher ? DOM.finishTeacher.value.trim() : "Prof. Feibert Guzmán")
    };

    ExcelHandler.exportReport(State.people, stats, drillMeta);
    showToast("Reporte en Excel generado y descargado con éxito.", "success");
  }

  // ==========================================
  // NOTIFICACIONES TOAST
  // ==========================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ==========================================
  // FINALIZACIÓN DE PASE DE LISTA Y BASE DE DATOS
  // ==========================================
  function openFinishSessionModal() {
    const stats = getStats();

    // Actualizar contadores en el modal
    if (DOM.finishStatTotal) DOM.finishStatTotal.textContent = stats.total;
    if (DOM.finishStatSafe) DOM.finishStatSafe.textContent = `${stats.safe} (${stats.total > 0 ? ((stats.safe/stats.total)*100).toFixed(0) : 0}%)`;
    if (DOM.finishStatMissing) DOM.finishStatMissing.textContent = stats.missing;
    if (DOM.finishStatInjured) DOM.finishStatInjured.textContent = stats.injured;

    if (DOM.finishZone) DOM.finishZone.value = DOM.activeZoneSelect ? DOM.activeZoneSelect.value : 'Plazoleta Central';

    openModal(DOM.modalFinishSession);
  }

  function handleExportFormat(format) {
    const stats = getStats();
    const sessionMeta = {
      teacher: DOM.finishTeacher ? DOM.finishTeacher.value.trim() : "Prof. Feibert Guzmán",
      course: DOM.finishCourse ? DOM.finishCourse.value.trim() : "Ingeniería de Software",
      classroom: DOM.finishClassroom ? DOM.finishClassroom.value.trim() : "Bloque A - Aula 201",
      zone: DOM.finishZone ? DOM.finishZone.value.trim() : (DOM.activeZoneSelect ? DOM.activeZoneSelect.value : "Plazoleta Central"),
      notes: DOM.finishNotes ? DOM.finishNotes.value.trim() : "",
      eventType: "Simulacro / Evacuación Unilasallista",
      officerInCharge: DOM.finishTeacher ? DOM.finishTeacher.value.trim() : "Prof. Feibert Guzmán"
    };

    if (format === 'excel') {
      ExcelHandler.exportReport(State.people, stats, sessionMeta);
      showToast("Base de Datos en Excel (.xlsx) exportada con éxito", "success");
    } else if (format === 'csv') {
      ExcelHandler.exportCSV(State.people, sessionMeta);
      showToast("Base de Datos en CSV exportada con éxito (UTF-8 con BOM)", "success");
    } else if (format === 'json') {
      ExcelHandler.exportJSON(State.people, sessionMeta, stats);
      showToast("Base de Datos en JSON exportada con éxito", "success");
    } else if (format === 'sql') {
      ExcelHandler.exportSQL(State.people, sessionMeta);
      showToast("Script SQL de Base de Datos generado con éxito", "success");
    }

    window.soundSystem.playSuccess();
  }

  function handlePrintActa() {
    const teacherName = DOM.finishTeacher ? DOM.finishTeacher.value.trim() : "Profesor Responsable";
    if (DOM.printTeacherName) {
      DOM.printTeacherName.textContent = teacherName;
    }
    closeModal(DOM.modalFinishSession);
    setTimeout(() => {
      window.print();
    }, 250);
  }

  // ==========================================
  // CONFIGURACIÓN DE EVENT LISTENERS
  // ==========================================
  function setupEventListeners() {
    // Tema
    if (DOM.btnToggleTheme) {
      DOM.btnToggleTheme.addEventListener('click', toggleTheme);
    }

    // Búsqueda y Filtros
    DOM.searchInput.addEventListener('input', (e) => {
      State.filters.search = e.target.value;
      render();
    });

    if (DOM.filterTeacher) {
      DOM.filterTeacher.addEventListener('change', (e) => {
        State.filters.teacher = e.target.value;
        render();
      });
    }

    if (DOM.filterLocation) {
      DOM.filterLocation.addEventListener('change', (e) => {
        State.filters.location = e.target.value;
        render();
      });
    }

    DOM.filterZone.addEventListener('change', (e) => {
      State.filters.zone = e.target.value;
      render();
    });

    DOM.filterRole.addEventListener('change', (e) => {
      State.filters.role = e.target.value;
      render();
    });

    // Pestañas de Estado
    DOM.statusPills.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.statusPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        State.filters.status = pill.getAttribute('data-status');
        render();
      });
    });

    // Pase Rápido / Escáner
    DOM.quickScanInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleQuickScan(DOM.quickScanInput.value);
      }
    });

    DOM.btnMarkAllVisible.addEventListener('click', markAllVisibleSafe);
    DOM.btnResetDrill.addEventListener('click', resetDrill);

    // Finalizar Pase de Lista (Profesor)
    if (DOM.btnFinishRollcall) {
      DOM.btnFinishRollcall.addEventListener('click', openFinishSessionModal);
    }
    if (DOM.btnQuickFinish) {
      DOM.btnQuickFinish.addEventListener('click', openFinishSessionModal);
    }

    // Opciones de exportación dentro del modal
    if (DOM.btnExportOptExcel) {
      DOM.btnExportOptExcel.addEventListener('click', () => handleExportFormat('excel'));
    }
    if (DOM.btnExportOptCsv) {
      DOM.btnExportOptCsv.addEventListener('click', () => handleExportFormat('csv'));
    }
    if (DOM.btnExportOptJson) {
      DOM.btnExportOptJson.addEventListener('click', () => handleExportFormat('json'));
    }
    if (DOM.btnExportOptSql) {
      DOM.btnExportOptSql.addEventListener('click', () => handleExportFormat('sql'));
    }
    if (DOM.btnFinishPrintActa) {
      DOM.btnFinishPrintActa.addEventListener('click', handlePrintActa);
    }

    // Botones de Modales
    if (DOM.btnOpenDocs) {
      DOM.btnOpenDocs.addEventListener('click', () => openModal(DOM.modalDocs));
    }
    DOM.btnOpenImport.addEventListener('click', () => openModal(DOM.modalImport));
    DOM.btnOpenAddPerson.addEventListener('click', openAddPerson);
    DOM.btnSavePerson.addEventListener('click', savePerson);
    DOM.btnSaveTriage.addEventListener('click', saveTriage);

    // Alternar Barra de Filtros Avanzados
    const btnToggleFilters = document.getElementById('btn-toggle-filters');
    const advancedFiltersBar = document.getElementById('advanced-filters-bar');
    if (btnToggleFilters && advancedFiltersBar) {
      btnToggleFilters.addEventListener('click', () => {
        advancedFiltersBar.classList.toggle('open');
        btnToggleFilters.classList.toggle('active');
      });
    }

    // Navegación de pestañas en el Modal de Documentación
    document.querySelectorAll('.doc-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');
        document.querySelectorAll('.doc-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.doc-tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.add('active');
      });
    });

    // Excel & Plantillas
    if (DOM.btnExportExcel) {
      DOM.btnExportExcel.addEventListener('click', exportReport);
    }
    if (DOM.btnDownloadTemplate) {
      DOM.btnDownloadTemplate.addEventListener('click', () => ExcelHandler.downloadTemplate());
    }
    if (DOM.btnModalTemplate) {
      DOM.btnModalTemplate.addEventListener('click', () => ExcelHandler.downloadTemplate());
    }

    // Imprimir
    if (DOM.btnPrintManifest) {
      DOM.btnPrintManifest.addEventListener('click', () => {
        window.print();
      });
    }

    // Drag and Drop para archivo Excel
    if (DOM.dropzone) {
      DOM.dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        DOM.dropzone.classList.add('dragover');
      });

      DOM.dropzone.addEventListener('dragleave', () => {
        DOM.dropzone.classList.remove('dragover');
      });

      DOM.dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        DOM.dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFileImport(e.dataTransfer.files[0]);
        }
      });
    }

    if (DOM.fileInput) {
      DOM.fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFileImport(e.target.files[0]);
        }
      });
    }

    // Modales Closers
    setupModalClosers();

    // Atajos de Teclado Globales (Ctrl+K para buscar)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (DOM.searchInput) DOM.searchInput.focus();
      }
    });
  }

  // ==========================================
  // EXPOSICIÓN AL ÁMBITO GLOBAL PARA HTML
  // ==========================================
  window.AppController = {
    quickSetStatus: setPersonStatus,
    openTriage: openTriage,
    editPerson: openEditPerson,
    deletePerson: deletePerson,
    finishSession: openFinishSessionModal,
    openDocs: () => openModal(DOM.modalDocs)
  };

  // Inicializar al cargar el DOM
  document.addEventListener('DOMContentLoaded', init);
})();
