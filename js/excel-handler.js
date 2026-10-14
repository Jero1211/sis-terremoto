/**
 * Módulo de Manejo de Hojas de Cálculo (Excel / CSV)
 * Utiliza SheetJS (XLSX) para importación, exportación y generación de plantillas
 */

const ExcelHandler = {
  // Datos precargados iniciales de simulación
  // Datos precargados iniciales de simulación Unilasallista
  getPreloadedData: function() {
    return [
      {
        id: "EST-101",
        name: "Valeria Gómez Mendoza",
        dni: "1028491023",
        role: "Estudiante",
        department: "Ingeniería de Software",
        teacherInCharge: "Prof. Feibert Guzmán",
        baseLocation: "Bloque A - Aula 201",
        currentLocationStatus: "safe_zone", // safe_zone, classroom, other, transit, trapped
        currentLocationDetail: "Plazoleta Central",
        assignedZone: "Plazoleta Central",
        actualZone: "Plazoleta Central",
        phone: "+57 300 654 3210",
        emergencyContact: "Carlos Gómez (Padre) - 301 223 3445",
        specialCondition: "Ninguna",
        status: "safe", // safe, injured, missing, other_zone
        timestamp: "10:45:12",
        triageSeverity: "none", // none, green (leve), yellow (moderado), red (grave)
        triageNotes: "Evacuó por escalera de emergencia del Bloque A. En buen estado.",
        lastKnownLocation: "Bloque A - Aula 201"
      },
      {
        id: "EST-102",
        name: "Mateo Sebastián Ríos",
        dni: "1074839201",
        role: "Estudiante",
        department: "Ingeniería de Software",
        teacherInCharge: "Prof. Feibert Guzmán",
        baseLocation: "Bloque A - Aula 201",
        currentLocationStatus: "safe_zone",
        currentLocationDetail: "Plazoleta Central",
        assignedZone: "Plazoleta Central",
        actualZone: "Plazoleta Central",
        phone: "+57 312 543 2109",
        emergencyContact: "Elena Ríos (Madre) - 311 771 1223",
        specialCondition: "Ninguna",
        status: "safe",
        timestamp: "10:46:05",
        triageSeverity: "none",
        triageNotes: "Ileso. Reporta que el aula 201 del Bloque A quedó vacía.",
        lastKnownLocation: "Bloque A - Aula 201"
      },
      {
        id: "EST-103",
        name: "Camila Belén Torres",
        dni: "1076543219",
        role: "Estudiante",
        department: "Medicina Veterinaria",
        teacherInCharge: "Dra. Carmen Benavides",
        baseLocation: "Bloque de Veterinaria - Lab 1",
        currentLocationStatus: "other",
        currentLocationDetail: "Cafetería Central",
        assignedZone: "Plazoleta Central",
        actualZone: "Plazoleta Central",
        phone: "+57 315 432 1098",
        emergencyContact: "Jorge Torres (Hermano) - 316 334 4556",
        specialCondition: "Asma",
        status: "injured",
        timestamp: "10:48:30",
        triageSeverity: "yellow",
        triageNotes: "Estaba en la cafetería al momento del sismo. Inhaló polvo. Crisis asmática moderada atendida en Plazoleta Central.",
        lastKnownLocation: "Cafetería"
      },
      {
        id: "DOC-201",
        name: "Prof. Feibert Guzmán",
        dni: "71098765",
        role: "Docente",
        department: "Ingeniería de Software",
        teacherInCharge: "Prof. Feibert Guzmán (Titular)",
        baseLocation: "Bloque A - Sala de Cómputo",
        currentLocationStatus: "safe_zone",
        currentLocationDetail: "Plazoleta Central",
        assignedZone: "Plazoleta Central",
        actualZone: "Plazoleta Central",
        phone: "+57 301 321 0987",
        emergencyContact: "Coordinación Académica - Ext. 104",
        specialCondition: "Ninguna",
        status: "safe",
        timestamp: "10:44:50",
        triageSeverity: "none",
        triageNotes: "Coordinó la evacuación ordenada de los estudiantes de Ingeniería de Software.",
        lastKnownLocation: "Bloque A"
      },
      {
        id: "BRIG-01",
        name: "Marco Antonio Vargas (Líder Brigada)",
        dni: "98456789",
        role: "Brigadista",
        department: "Seguridad y Salud en el Trabajo",
        teacherInCharge: "Centro de Operaciones (COE)",
        baseLocation: "Administrativo - Oficina SST",
        currentLocationStatus: "safe_zone",
        currentLocationDetail: "Plazoleta Central (Puesto de Mando)",
        assignedZone: "Plazoleta Central",
        actualZone: "Plazoleta Central",
        phone: "+57 320 210 9876",
        emergencyContact: "Central de Emergencias Lasallista - Ext. 911",
        specialCondition: "Primeros Auxilios Avanzados",
        status: "safe",
        timestamp: "10:43:10",
        triageSeverity: "none",
        triageNotes: "Activo en la Plazoleta Central con botiquín y radio de enlace.",
        lastKnownLocation: "Plazoleta Central"
      },
      {
        id: "EST-104",
        name: "Lucía Fernández Cáceres",
        dni: "1071234567",
        role: "Estudiante",
        department: "Ingeniería de Software",
        teacherInCharge: "Prof. Feibert Guzmán",
        baseLocation: "Bloque B - Aula 302",
        currentLocationStatus: "trapped",
        currentLocationDetail: "Bloque B - Piso 3 (Cerca al descanso)",
        assignedZone: "Plazoleta Central",
        actualZone: "No asignada",
        phone: "+57 318 109 8765",
        emergencyContact: "Rosa Cáceres (Madre) - 313 556 6778",
        specialCondition: "Movilidad reducida (Silla de ruedas)",
        status: "missing",
        timestamp: "-",
        triageSeverity: "red",
        triageNotes: "¡ALERTA! En piso 3 del Bloque B. Requiere apoyo de brigada para bajar por rampa/escalera.",
        lastKnownLocation: "Bloque B - Piso 3"
      },
      {
        id: "ADM-301",
        name: "María Esther Alarcón",
        dni: "43102938",
        role: "Administrativo",
        department: "Gestión Humana y Financiera",
        teacherInCharge: "Administración Central",
        baseLocation: "Administrativo - Oficina 102",
        currentLocationStatus: "safe_zone",
        currentLocationDetail: "Plazoleta Central",
        assignedZone: "Plazoleta Central",
        actualZone: "Plazoleta Central",
        phone: "+57 300 098 7654",
        emergencyContact: "David Alarcón (Hijo) - 322 667 7889",
        specialCondition: "Hipertensión",
        status: "safe",
        timestamp: "10:47:19",
        triageSeverity: "none",
        triageNotes: "Evacuó sin incidentes desde el edificio Administrativo.",
        lastKnownLocation: "Administrativo"
      },
      {
        id: "DOC-202",
        name: "Ing. Guillermo Paredes Vega",
        dni: "70234567",
        role: "Docente",
        department: "Ingeniería Agroindustrial",
        teacherInCharge: "Ing. Guillermo Paredes Vega (Titular)",
        baseLocation: "Bloque C - Laboratorio 204",
        currentLocationStatus: "safe_zone",
        currentLocationDetail: "Plazoleta Central",
        assignedZone: "Plazoleta Central",
        actualZone: "Plazoleta Central",
        phone: "+57 311 987 6543",
        emergencyContact: "Karla Paredes (Hija) - 314 778 8990",
        specialCondition: "Ninguna",
        status: "injured",
        timestamp: "10:49:15",
        triageSeverity: "green",
        triageNotes: "Raspón leve en mano derecha al salir del Bloque C. Curación rápida en punto seguro.",
        lastKnownLocation: "Bloque C"
      },
      {
        id: "EST-105",
        name: "Joaquín Ernesto Salazar",
        dni: "1075432198",
        role: "Estudiante",
        department: "Medicina Veterinaria",
        teacherInCharge: "Dra. Carmen Benavides",
        baseLocation: "Bloque de Veterinaria - Quirófano",
        currentLocationStatus: "other",
        currentLocationDetail: "Biblioteca (Piso 1)",
        assignedZone: "Plazoleta Central",
        actualZone: "Plazoleta Central",
        phone: "+57 319 876 5432",
        emergencyContact: "Santiago Salazar (Padre) - 308 889 9001",
        specialCondition: "Apoyo en Triage",
        status: "other_zone",
        timestamp: "10:50:02",
        triageSeverity: "none",
        triageNotes: "Se encontraba en la Biblioteca. Evacuó hacia la Plazoleta Central para colaborar.",
        lastKnownLocation: "Biblioteca"
      },
      {
        id: "EST-107",
        name: "Diego Alonso Navarro",
        dni: "1078912345",
        role: "Estudiante",
        department: "Ingeniería de Software",
        teacherInCharge: "Prof. Feibert Guzmán",
        baseLocation: "Bloque A - Aula 201",
        currentLocationStatus: "classroom",
        currentLocationDetail: "Bloque A - Aula 201 (En el Salón)",
        assignedZone: "Plazoleta Central",
        actualZone: "No asignada",
        phone: "+57 317 123 7890",
        emergencyContact: "Teresa Navarro (Madre) - 318 456 1234",
        specialCondition: "Ninguna",
        status: "missing",
        timestamp: "-",
        triageSeverity: "none",
        triageNotes: "Pendiente de confirmación de llegada a la Plazoleta Central.",
        lastKnownLocation: "Bloque A - Aula 201"
      },
      {
        id: "ADM-302",
        name: "Carlos Eduardo Mejía",
        dni: "43987123",
        role: "Administrativo",
        department: "Registro y Matrículas",
        teacherInCharge: "Administración Central",
        baseLocation: "Administrativo - Oficina 101",
        currentLocationStatus: "classroom",
        currentLocationDetail: "Administrativo - Taquilla 3",
        assignedZone: "Plazoleta Central",
        actualZone: "No asignada",
        phone: "+57 301 889 4455",
        emergencyContact: "Gloria Mejía (Esposa) - 302 998 7766",
        specialCondition: "Ninguna",
        status: "missing",
        timestamp: "-",
        triageSeverity: "none",
        triageNotes: "Ubicado en la oficina administrativa de Admisiones y Registro.",
        lastKnownLocation: "Administrativo"
      },
      {
        id: "EST-108",
        name: "Laura Sofía Quintero",
        dni: "1079812340",
        role: "Estudiante",
        department: "Medicina Veterinaria",
        teacherInCharge: "Dra. Carmen Benavides",
        baseLocation: "Bloque de Veterinaria - Lab 2",
        currentLocationStatus: "classroom",
        currentLocationDetail: "Bloque de Veterinaria - Lab 2",
        assignedZone: "Plazoleta Central",
        actualZone: "No asignada",
        phone: "+57 314 556 7890",
        emergencyContact: "Gonzalo Quintero (Padre) - 315 667 8901",
        specialCondition: "Ninguna",
        status: "missing",
        timestamp: "-",
        triageSeverity: "none",
        triageNotes: "En práctica de laboratorio de anatomía veterinaria.",
        lastKnownLocation: "Bloque de Veterinaria"
      }
    ];
  },

  // Genera y descarga una plantilla Excel modelo lista para llenar
  downloadTemplate: function() {
    if (typeof XLSX === 'undefined') {
      alert("La biblioteca de Excel (SheetJS) no se ha cargado. Verifique su conexión.");
      return;
    }

    const templateHeaders = [
      "ID_Codigo",
      "Nombre_Completo",
      "DNI_Documento",
      "Rol",
      "Profesor_Encargado",
      "Facultad_Departamento",
      "Ubicacion_Habitual_Bloque_Aula",
      "Donde_Se_Encuentra_Actualmente",
      "Punto_Encuentro_Asignado",
      "Telefono_Movil",
      "Contacto_Emergencia_Nombre_Telefono",
      "Condicion_Especial_Salud"
    ];

    const templateRows = [
      [
        "EST-201",
        "Juan Pérez Cotera",
        "1071829304",
        "Estudiante",
        "Prof. Feibert Guzmán",
        "Ingeniería de Software",
        "Bloque A - Aula 201",
        "En el Salón",
        "Plazoleta Central",
        "+57 300 111 2233",
        "María Cotera (Madre) - 300 333 4455",
        "Ninguna"
      ],
      [
        "EST-202",
        "Ana Lucía Vega",
        "1072819203",
        "Estudiante",
        "Dra. Carmen Benavides",
        "Medicina Veterinaria",
        "Bloque de Veterinaria - Aula 102",
        "En Otra Parte (Cafetería)",
        "Plazoleta Central",
        "+57 312 222 3344",
        "Pedro Vega (Padre) - 312 444 5566",
        "Asma"
      ],
      [
        "DOC-105",
        "Prof. Feibert Guzmán",
        "71089281",
        "Docente",
        "Prof. Feibert Guzmán",
        "Ingeniería de Software",
        "Bloque A - Laboratorio de Software",
        "En el Salón",
        "Plazoleta Central",
        "+57 301 999 2233",
        "Coordinación Académica - Ext. 104",
        "Ninguna"
      ],
      [
        "BRIG-05",
        "Raúl Castillo Díaz",
        "98428172",
        "Brigadista",
        "Centro de Operaciones (COE)",
        "Seguridad Institucional",
        "Administrativo - Oficina SST",
        "En Zona Segura",
        "Plazoleta Central",
        "+57 320 883 3344",
        "Rosa Díaz - 320 885 5566",
        "Primeros Auxilios"
      ]
    ];

    const wsData = [templateHeaders, ...templateRows];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Ajustar anchos de columnas
    ws['!cols'] = [
      { wch: 14 },
      { wch: 30 },
      { wch: 16 },
      { wch: 16 },
      { wch: 28 },
      { wch: 25 },
      { wch: 32 },
      { wch: 26 },
      { wch: 26 },
      { wch: 18 },
      { wch: 36 },
      { wch: 24 }
    ];

    // Hoja de instrucciones y zonas
    const instructionsData = [
      ["GUÍA DE LLENADO DE PLANTILLA DE EVACUACIÓN - UNILASALLISTA"],
      [""],
      ["1. Campos principales: ID_Codigo, Nombre_Completo, Rol, Profesor_Encargado, Punto_Encuentro_Asignado."],
      ["2. Ubicación actual sugerida: 'En el Salón', 'En Zona Segura', 'En Otra Parte (Cafetería/Biblioteca)', 'En Tránsito'."],
      ["3. Zonas y Bloques del Campus Unilasallista:"],
      ["   - Plazoleta Central (PUNTO DE ENCUENTRO SEGURO PRINCIPAL)"],
      ["   - Bloque A"],
      ["   - Bloque B"],
      ["   - Bloque C"],
      ["   - Administrativo"],
      ["   - Cafetería"],
      ["   - Biblioteca"],
      ["   - Bloque de Veterinaria"],
      ["4. Guarde el archivo en formato .xlsx o .csv y cárguelo en la aplicación SIS-TERREMOTO."]
    ];
    const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
    wsInstructions['!cols'] = [{ wch: 80 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Personal_A_Evacuar");
    XLSX.utils.book_append_sheet(wb, wsInstructions, "Instrucciones_Zonas");

    XLSX.writeFile(wb, "Plantilla_Evacuacion_Unilasallista.xlsx");
  },

  // Procesa un archivo Excel o CSV subido por el usuario
  parseFile: function(file, optionsOrCallback, callback) {
    let options = {};
    let cb = callback;
    if (typeof optionsOrCallback === 'function') {
      cb = optionsOrCallback;
    } else if (typeof optionsOrCallback === 'object') {
      options = optionsOrCallback || {};
    }

    if (typeof XLSX === 'undefined') {
      if (cb) cb(new Error("SheetJS no está cargado"), null);
      return;
    }

    const defaultTeacher = options.customTeacher || "Prof. Feibert Guzmán";
    const defaultCourse = options.customCourse || "Ingeniería de Software";
    const defaultZone = "Plazoleta Central";

    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Tomar la primera hoja
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convertir a JSON
        const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

        if (!rawJson || rawJson.length === 0) {
          if (cb) cb(new Error("La hoja de cálculo está vacía o no contiene filas con datos."), null);
          return;
        }

        // Mapear columnas dinámicamente con tolerancia a nombres de encabezados
        const mappedList = rawJson.map((row, index) => {
          // Búsqueda insensible a mayúsculas y acentos
          const getVal = (possibleKeys) => {
            for (const key of Object.keys(row)) {
              const cleanKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
              for (const pk of possibleKeys) {
                const cleanPK = pk.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
                if (cleanKey.includes(cleanPK)) {
                  return String(row[key]).trim();
                }
              }
            }
            return "";
          };

          const id = getVal(["id", "codigo", "matricula", "carnet"]) || `PER-${1000 + index}`;
          const name = getVal(["nombre", "fullname", "apellidos", "persona", "alumno", "estudiante"]) || `Persona ${index + 1}`;
          const dni = getVal(["dni", "documento", "cedula", "identificacion", "pasaporte"]) || "No reg.";
          const role = getVal(["rol", "cargo", "tipo", "puesto"]) || "Estudiante";
          const teacherInCharge = options.customTeacher || getVal(["profesor", "docente", "tutor", "maestro", "maestra", "encargado", "responsable"]) || defaultTeacher;
          const department = options.customCourse || getVal(["facultad", "departamento", "carrera", "area", "escuela", "curso", "materia", "asignatura"]) || defaultCourse;
          const baseLocation = getVal(["ubicacion", "aula", "laboratorio", "bloque", "pabellon", "oficina", "piso", "salon"]) || "Bloque A - Aula 201";
          const rawLocationStatus = getVal(["donde", "actual", "lugar", "estado_ubicacion", "ubicacion_actual"]).toLowerCase();
          
          let currentLocationStatus = "classroom"; // classroom, safe_zone, other, transit, trapped
          let currentLocationDetail = baseLocation;

          if (rawLocationStatus.includes("salvo") || rawLocationStatus.includes("segur") || rawLocationStatus.includes("plazoleta") || rawLocationStatus.includes("patio") || rawLocationStatus.includes("evacuad")) {
            currentLocationStatus = "safe_zone";
            currentLocationDetail = "Plazoleta Central (Zona Segura)";
          } else if (rawLocationStatus.includes("otra") || rawLocationStatus.includes("fuera") || rawLocationStatus.includes("cafeter") || rawLocationStatus.includes("bibliot") || rawLocationStatus.includes("bano") || rawLocationStatus.includes("veterin")) {
            currentLocationStatus = "other";
            currentLocationDetail = "En Otra Parte (Fuera de Aula)";
          } else if (rawLocationStatus.includes("transit") || rawLocationStatus.includes("pasillo") || rawLocationStatus.includes("escaler")) {
            currentLocationStatus = "transit";
            currentLocationDetail = "En Tránsito / Escalera";
          } else if (rawLocationStatus.includes("atrap") || rawLocationStatus.includes("peligro") || rawLocationStatus.includes("bloque")) {
            currentLocationStatus = "trapped";
            currentLocationDetail = "Atrapado / Incomunicado";
          }

          const assignedZone = getVal(["puntoencuentro", "zona", "zonasegura", "punto"]) || defaultZone;
          const phone = getVal(["telefono", "celular", "movil", "phone"]) || "-";
          const emergencyContact = getVal(["contacto", "emergencia", "familiar", "pariente", "tutor", "apoderado"]) || "-";
          const specialCondition = getVal(["condicion", "especial", "salud", "discapacidad", "alergia", "medica"]) || "Ninguna";

          // Estado existente si ya se había importado o si viene con estado
          const rawStatus = getVal(["estado", "status", "evacuado"]).toLowerCase();
          let status = "missing"; // Por defecto al iniciar evacuación están "No localizados" hasta que se marcan
          if (rawStatus.includes("salvo") || rawStatus.includes("seguro") || rawStatus.includes("safe") || rawStatus.includes("presente")) {
            status = "safe";
            currentLocationStatus = "safe_zone";
            currentLocationDetail = assignedZone;
          } else if (rawStatus.includes("herid") || rawStatus.includes("auxilio") || rawStatus.includes("injured") || rawStatus.includes("atencion")) {
            status = "injured";
          } else if (rawStatus.includes("otra") || rawStatus.includes("cambio")) {
            status = "other_zone";
          }

          return {
            id,
            name,
            dni,
            role,
            teacherInCharge,
            department,
            baseLocation,
            currentLocationStatus,
            currentLocationDetail,
            assignedZone,
            actualZone: status === 'safe' ? assignedZone : 'No asignada',
            phone,
            emergencyContact,
            specialCondition,
            status,
            timestamp: status === 'safe' ? new Date().toLocaleTimeString() : "-",
            triageSeverity: "none",
            triageNotes: "",
            lastKnownLocation: baseLocation
          };
        });

        if (cb) cb(null, mappedList);
      } catch (err) {
        console.error("Error al procesar archivo:", err);
        if (cb) cb(err, null);
      }
    };

    reader.onerror = function(err) {
      if (cb) cb(err, null);
    };

    reader.readAsArrayBuffer(file);
  },

  // Exporta el estado actual completo a un libro Excel profesional con 2 hojas
  exportReport: function(peopleList, stats, drillMetadata) {
    if (typeof XLSX === 'undefined') {
      alert("SheetJS no disponible para exportar.");
      return;
    }

    // Hoja 1: Lista Nominal de Evacuación y Triaje
    const headers = [
      "ID / Código",
      "Nombre Completo",
      "DNI / Documento",
      "Rol",
      "Profesor Encargado",
      "Facultad / Dpto.",
      "Ubicación Base (Aula)",
      "¿Dónde se encuentra?",
      "Detalle Ubicación",
      "Zona Asignada",
      "Zona Evacuada Real",
      "Estado de Evacuación",
      "Hora Registro",
      "Nivel de Triage",
      "Notas Médicas / Rescate",
      "Teléfono",
      "Contacto de Emergencia",
      "Condición Especial"
    ];

    const rows = peopleList.map(p => {
      let estadoTexto = "Desaparecido / No Localizado";
      if (p.status === 'safe') estadoTexto = "A Salvo (Evacuado)";
      if (p.status === 'injured') estadoTexto = "HERIDO / ATENCIÓN MÉDICA";
      if (p.status === 'other_zone') estadoTexto = "Evacuado en Otra Zona";

      let triageTexto = "Sin lesión";
      if (p.triageSeverity === 'green') triageTexto = "Verde (Leve)";
      if (p.triageSeverity === 'yellow') triageTexto = "Amarillo (Moderado)";
      if (p.triageSeverity === 'red') triageTexto = "ROJO (GRAVE / URGENTE)";

      let ubicacionTexto = "En el Salón";
      if (p.currentLocationStatus === 'safe_zone') ubicacionTexto = "En Zona Segura (Evacuado)";
      if (p.currentLocationStatus === 'other') ubicacionTexto = "En Otra Parte (Fuera del Aula)";
      if (p.currentLocationStatus === 'transit') ubicacionTexto = "En Tránsito / Escaleras";
      if (p.currentLocationStatus === 'trapped') ubicacionTexto = "ATRAPADO / SIN SALIDA";

      return [
        p.id,
        p.name,
        p.dni,
        p.role,
        p.teacherInCharge || "No asignado",
        p.department,
        p.baseLocation,
        ubicacionTexto,
        p.currentLocationDetail || p.baseLocation,
        p.assignedZone,
        p.actualZone || "-",
        estadoTexto,
        p.timestamp || "-",
        triageTexto,
        p.triageNotes || "-",
        p.phone || "-",
        p.emergencyContact || "-",
        p.specialCondition || "Ninguna"
      ];
    });

    const wsList = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    wsList['!cols'] = [
      { wch: 14 },
      { wch: 30 },
      { wch: 15 },
      { wch: 15 },
      { wch: 28 },
      { wch: 22 },
      { wch: 25 },
      { wch: 26 },
      { wch: 28 },
      { wch: 24 },
      { wch: 24 },
      { wch: 26 },
      { wch: 14 },
      { wch: 20 },
      { wch: 35 },
      { wch: 16 },
      { wch: 35 },
      { wch: 24 }
    ];

    // Hoja 2: Resumen Ejecutivo y Estadísticas
    const summaryData = [
      ["REPORTE OFICIAL DE ASISTENCIA Y EVACUACIÓN - UNILASALLISTA"],
      ["SISTEMA DE CONTROL DE EMERGENCIAS Y BRIGADAS"],
      [""],
      ["Fecha y Hora de Generación:", new Date().toLocaleString()],
      ["Tipo de Evento:", drillMetadata.eventType || "Simulacro / Evacuación Institucional"],
      ["Punto de Encuentro Seguro Principal:", "Plazoleta Central"],
      ["Responsable / Docente a Cargo:", drillMetadata.officerInCharge || "Prof. Feibert Guzmán"],
      [""],
      ["INDICADORES CLAVE DE DESEMPEÑO (KPIs)"],
      ["Censo Total de Personas:", stats.total],
      ["Total Evacuados y a Salvo:", stats.safe, `${((stats.safe / (stats.total || 1)) * 100).toFixed(1)}%`],
      ["Total Heridos que Requieren Atención:", stats.injured, `${((stats.injured / (stats.total || 1)) * 100).toFixed(1)}%`],
      ["Total NO LOCALIZADOS / Desaparecidos:", stats.missing, `${((stats.missing / (stats.total || 1)) * 100).toFixed(1)}%`],
      ["Total en Otras Zonas:", stats.otherZone, `${((stats.otherZone / (stats.total || 1)) * 100).toFixed(1)}%`],
      ["Porcentaje Global de Localización:", `${stats.accountedPercentage}%`],
      [""],
      ["CONTEO POR PUNTOS DE ENCUENTRO Y ZONAS DEL CAMPUS"],
      ["Zona / Bloque", "Personas A Salvo", "Heridos", "Desaparecidos Esperados"]
    ];

    // Desglose por zonas Unilasallista
    const zones = ["Plazoleta Central", "Bloque A", "Bloque B", "Bloque C", "Administrativo", "Cafetería", "Biblioteca", "Bloque de Veterinaria"];
    zones.forEach(z => {
      const inZoneSafe = peopleList.filter(p => (p.actualZone === z || p.assignedZone === z) && p.status === 'safe').length;
      const inZoneInjured = peopleList.filter(p => (p.actualZone === z || p.assignedZone === z) && p.status === 'injured').length;
      const inZoneMissing = peopleList.filter(p => p.assignedZone === z && p.status === 'missing').length;
      summaryData.push([z, inZoneSafe, inZoneInjured, inZoneMissing]);
    });

    summaryData.push([""]);
    summaryData.push(["LISTADO PRIORITARIO DE HERIDOS Y PERSONAS NO LOCALIZADAS (PARA BRIGADAS/MÉDICOS)"]);
    summaryData.push(["Prioridad", "Nombre", "DNI", "Estado", "Nivel Triage", "Última Ubicación", "Contacto Emergencia"]);

    // Agregar personas críticas
    const criticalPeople = peopleList.filter(p => p.status === 'injured' || p.status === 'missing');
    criticalPeople.forEach(p => {
      const prio = p.status === 'missing' ? "URGENTE BÚSQUEDA" : (p.triageSeverity === 'red' ? "ATENCIÓN ROJA" : "ATENCIÓN MÉDICA");
      summaryData.push([
        prio,
        p.name,
        p.dni,
        p.status === 'missing' ? "NO LOCALIZADO" : "HERIDO",
        p.triageSeverity.toUpperCase(),
        p.lastKnownLocation || p.baseLocation,
        p.emergencyContact
      ]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    wsSummary['!cols'] = [
      { wch: 35 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
      { wch: 20 },
      { wch: 30 },
      { wch: 35 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsSummary, "Resumen_Ejecutivo_COE");
    XLSX.utils.book_append_sheet(wb, wsList, "Nomina_Completa_Evacuacion");

    const dateStr = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    XLSX.writeFile(wb, `Reporte_Evacuacion_Unilasallista_${dateStr}.xlsx`);
  },

  // Exportar Base de Datos en formato CSV estándar (UTF-8 con BOM)
  exportCSV: function(peopleList, sessionMeta) {
    const headers = [
      "ID_CODIGO",
      "NOMBRE_COMPLETO",
      "DNI_DOCUMENTO",
      "ROL",
      "PROFESOR_ENCARGADO",
      "FACULTAD_CURSO",
      "AULA_BASE",
      "DONDE_SE_ENCUENTRA",
      "DETALLE_UBICACION_ACTUAL",
      "ZONA_ASIGNADA",
      "ZONA_REAL",
      "ESTADO_EVACUACION",
      "HORA_REGISTRO",
      "NIVEL_TRIAGE",
      "NOTAS_TRIAGE",
      "TELEFONO",
      "CONTACTO_EMERGENCIA",
      "CONDICION_SALUD",
      "DOCENTE_RESPONSABLE_SESION",
      "FECHA_SESION"
    ];

    const teacherSession = sessionMeta.teacher || "Profesor Responsable";
    const sessionDate = new Date().toLocaleDateString();

    const rows = peopleList.map(p => {
      let estado = "NO_LOCALIZADO";
      if (p.status === 'safe') estado = "A_SALVO";
      if (p.status === 'injured') estado = "HERIDO_EN_TRIAJE";
      if (p.status === 'other_zone') estado = "OTRA_ZONA";

      let ubicacion = "EN_EL_SALON";
      if (p.currentLocationStatus === 'safe_zone') ubicacion = "EN_ZONA_SEGURA";
      if (p.currentLocationStatus === 'other') ubicacion = "EN_OTRA_PARTE_FUERA_DE_AULA";
      if (p.currentLocationStatus === 'transit') ubicacion = "EN_TRANSITO";
      if (p.currentLocationStatus === 'trapped') ubicacion = "ATRAPADO";

      return [
        `"${(p.id || '').replace(/"/g, '""')}"`,
        `"${(p.name || '').replace(/"/g, '""')}"`,
        `"${(p.dni || '').replace(/"/g, '""')}"`,
        `"${(p.role || '').replace(/"/g, '""')}"`,
        `"${(p.teacherInCharge || teacherSession).replace(/"/g, '""')}"`,
        `"${(p.department || '').replace(/"/g, '""')}"`,
        `"${(p.baseLocation || '').replace(/"/g, '""')}"`,
        `"${ubicacion}"`,
        `"${(p.currentLocationDetail || p.baseLocation || '').replace(/"/g, '""')}"`,
        `"${(p.assignedZone || '').replace(/"/g, '""')}"`,
        `"${(p.actualZone || '').replace(/"/g, '""')}"`,
        `"${estado}"`,
        `"${(p.timestamp || '').replace(/"/g, '""')}"`,
        `"${(p.triageSeverity || 'none').toUpperCase()}"`,
        `"${(p.triageNotes || '').replace(/"/g, '""')}"`,
        `"${(p.phone || '').replace(/"/g, '""')}"`,
        `"${(p.emergencyContact || '').replace(/"/g, '""')}"`,
        `"${(p.specialCondition || 'Ninguna').replace(/"/g, '""')}"`,
        `"${teacherSession.replace(/"/g, '""')}"`,
        `"${sessionDate}"`
      ].join(',');
    });

    // UTF-8 BOM (\uFEFF) para que Excel lo abra con tildes y caracteres en español correctamente
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const dateStr = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    this.downloadBlob(csvContent, `Base_Datos_Asistencia_Unilasallista_${dateStr}.csv`, 'text/csv;charset=utf-8;');
  },

  // Exportar Base de Datos Estructurada en formato JSON
  exportJSON: function(peopleList, sessionMeta, stats) {
    const databaseExport = {
      database_type: "UNILASALLISTA_EVACUACION_ROLL_CALL_DB",
      version: "1.3",
      export_timestamp: new Date().toISOString(),
      session_info: {
        teacher_in_charge: sessionMeta.teacher || "No especificado",
        course_name: sessionMeta.course || "No especificado",
        origin_classroom: sessionMeta.classroom || "No especificado",
        assembly_zone: sessionMeta.zone || "Plazoleta Central",
        teacher_notes: sessionMeta.notes || "Sin observaciones adicionales",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      },
      kpi_summary: {
        total_census: stats.total,
        total_safe: stats.safe,
        safe_percentage: stats.total > 0 ? Number(((stats.safe / stats.total) * 100).toFixed(1)) : 0,
        total_injured: stats.injured,
        total_missing: stats.missing,
        total_other_zone: stats.otherZone,
        accounted_percentage: stats.accountedPercentage
      },
      records: peopleList.map(p => ({
        id: p.id,
        full_name: p.name,
        dni: p.dni || null,
        role: p.role,
        teacher_in_charge: p.teacherInCharge || sessionMeta.teacher || null,
        faculty_or_department: p.department || null,
        base_location: p.baseLocation,
        current_location: {
          status: p.currentLocationStatus || "classroom",
          description: p.currentLocationStatus === 'safe_zone' ? 'En Zona Segura (Evacuado)' : (p.currentLocationStatus === 'other' ? 'En Otra Parte (Fuera del Aula)' : (p.currentLocationStatus === 'trapped' ? 'Atrapado / Incomunicado' : 'En el Salón')),
          detail: p.currentLocationDetail || p.baseLocation
        },
        assigned_zone: p.assignedZone,
        actual_zone: p.actualZone,
        evacuation_status: p.status,
        check_in_time: p.timestamp,
        triage: {
          severity: p.triageSeverity || "none",
          medical_notes: p.triageNotes || null,
          last_known_location: p.lastKnownLocation || p.baseLocation
        },
        contact: {
          phone: p.phone || null,
          emergency_contact: p.emergencyContact || null
        },
        health: {
          special_condition: p.specialCondition || "Ninguna"
        }
      }))
    };

    const jsonString = JSON.stringify(databaseExport, null, 2);
    const dateStr = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    this.downloadBlob(jsonString, `Base_Datos_Evacuacion_${dateStr}.json`, 'application/json;charset=utf-8;');
  },

  // Exportar Base de Datos como Script SQL Relacional (.sql)
  exportSQL: function(peopleList, sessionMeta) {
    const teacher = (sessionMeta.teacher || 'Docente').replace(/'/g, "''");
    const course = (sessionMeta.course || 'Asignatura').replace(/'/g, "''");
    const sessionTime = new Date().toISOString();

    let sql = `-- =========================================================================\n`;
    sql += `-- UNILASALLISTA: SCRIPT DE BASE DE DATOS DE ASISTENCIA Y EVACUACIÓN\n`;
    sql += `-- Generado: ${new Date().toLocaleString()}\n`;
    sql += `-- Profesor: ${sessionMeta.teacher || 'No especificado'}\n`;
    sql += `-- Curso/Bloque: ${sessionMeta.course || 'General'} / ${sessionMeta.classroom || 'Bloque A'}\n`;
    sql += `-- =========================================================================\n\n`;

    sql += `CREATE TABLE IF NOT EXISTS sesiones_evacuacion (\n`;
    sql += `    id_sesion VARCHAR(50) PRIMARY KEY,\n`;
    sql += `    fecha_evento TIMESTAMP,\n`;
    sql += `    docente_responsable VARCHAR(150),\n`;
    sql += `    curso_asignatura VARCHAR(150),\n`;
    sql += `    aula_origen VARCHAR(100),\n`;
    sql += `    punto_encuentro VARCHAR(100),\n`;
    sql += `    tiempo_evacuacion VARCHAR(20),\n`;
    sql += `    observaciones TEXT\n`;
    sql += `);\n\n`;

    sql += `CREATE TABLE IF NOT EXISTS registro_asistencia_sismo (\n`;
    sql += `    id_registro SERIAL PRIMARY KEY,\n`;
    sql += `    id_persona VARCHAR(50),\n`;
    sql += `    nombre_completo VARCHAR(200),\n`;
    sql += `    dni VARCHAR(20),\n`;
    sql += `    rol VARCHAR(50),\n`;
    sql += `    profesor_encargado VARCHAR(150),\n`;
    sql += `    departamento VARCHAR(100),\n`;
    sql += `    ubicacion_base VARCHAR(100),\n`;
    sql += `    estado_ubicacion VARCHAR(50),\n`;
    sql += `    detalle_ubicacion_actual VARCHAR(150),\n`;
    sql += `    zona_asignada VARCHAR(100),\n`;
    sql += `    zona_real VARCHAR(100),\n`;
    sql += `    estado_evacuacion VARCHAR(50),\n`;
    sql += `    hora_registro VARCHAR(20),\n`;
    sql += `    nivel_triage VARCHAR(20),\n`;
    sql += `    notas_triage TEXT,\n`;
    sql += `    telefono VARCHAR(30),\n`;
    sql += `    contacto_emergencia VARCHAR(200),\n`;
    sql += `    condicion_especial VARCHAR(100),\n`;
    sql += `    docente_responsable VARCHAR(150),\n`;
    sql += `    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n`;
    sql += `);\n\n`;

    const sessionId = `SES-${Date.now()}`;
    sql += `INSERT INTO sesiones_evacuacion (id_sesion, fecha_evento, docente_responsable, curso_asignatura, aula_origen, punto_encuentro, tiempo_evacuacion, observaciones)\n`;
    sql += `VALUES ('${sessionId}', '${sessionTime}', '${teacher}', '${course}', '${(sessionMeta.classroom || '').replace(/'/g, "''")}', '${(sessionMeta.zone || '').replace(/'/g, "''")}', '${sessionMeta.elapsedTime || '00:00:00'}', '${(sessionMeta.notes || '').replace(/'/g, "''")}');\n\n`;

    sql += `INSERT INTO registro_asistencia_sismo (id_persona, nombre_completo, dni, rol, profesor_encargado, departamento, ubicacion_base, estado_ubicacion, detalle_ubicacion_actual, zona_asignada, zona_real, estado_evacuacion, hora_registro, nivel_triage, notas_triage, telefono, contacto_emergencia, condicion_especial, docente_responsable)\nVALUES\n`;

    const valueRows = peopleList.map(p => {
      const id = (p.id || '').replace(/'/g, "''");
      const name = (p.name || '').replace(/'/g, "''");
      const dni = (p.dni || '').replace(/'/g, "''");
      const role = (p.role || '').replace(/'/g, "''");
      const prof = (p.teacherInCharge || teacher).replace(/'/g, "''");
      const dept = (p.department || '').replace(/'/g, "''");
      const baseLoc = (p.baseLocation || '').replace(/'/g, "''");
      const estUbic = (p.currentLocationStatus || 'classroom').replace(/'/g, "''");
      const detUbic = (p.currentLocationDetail || p.baseLocation || '').replace(/'/g, "''");
      const assZone = (p.assignedZone || '').replace(/'/g, "''");
      const actZone = (p.actualZone || '').replace(/'/g, "''");
      const status = (p.status || 'missing').replace(/'/g, "''");
      const time = (p.timestamp || '-').replace(/'/g, "''");
      const triage = (p.triageSeverity || 'none').replace(/'/g, "''");
      const notes = (p.triageNotes || '').replace(/'/g, "''");
      const phone = (p.phone || '').replace(/'/g, "''");
      const emContact = (p.emergencyContact || '').replace(/'/g, "''");
      const cond = (p.specialCondition || 'Ninguna').replace(/'/g, "''");

      return `('${id}', '${name}', '${dni}', '${role}', '${prof}', '${dept}', '${baseLoc}', '${estUbic}', '${detUbic}', '${assZone}', '${actZone}', '${status}', '${time}', '${triage}', '${notes}', '${phone}', '${emContact}', '${cond}', '${teacher}')`;
    });

    sql += valueRows.join(',\n') + ';\n';

    const dateStr = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    this.downloadBlob(sql, `Script_Base_Datos_Evacuacion_${dateStr}.sql`, 'text/plain;charset=utf-8;');
  },

  // Función utilitaria para descargar archivos creados en el cliente
  downloadBlob: function(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 150);
  }
};

window.ExcelHandler = ExcelHandler;
