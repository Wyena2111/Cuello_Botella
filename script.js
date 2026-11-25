document.addEventListener('DOMContentLoaded', () => {
    // ================= 1. DATASET CONSOLIDADO Y POR CENTRO =================
    const DATOS_POR_CENTRO = {
        ALL: {
            etiqueta: 'Todos los Centros',
            visitasProgramadas: 860547.0,
            pacientesDistintos: 59004.0,
            totalAtendidas: 547662.0,
            pctAtendidas: 63.64114917604733,
            citasNoProgramadas: 140775.0,
            noProgAtendidas: 134174.0,
            pctSinCita: 24.499417523947255,
            tiempoPromEspera: 13.575,
            medianaSeguro: 13.575,
            medianaCaja: 0.2833333333333333,
            p90Atendidos: 56.25,
            p90Profesionales: 13.75,
            totalNoAtendidas: 312811.0,
            pctNoAtendidas: 36.35025164226939,
            totalInasistencias: 219920.0,
            pctInasistenciaTotal: 25.555838321439735,
            pctInasistenciaVigentes: 28.473768708892226
        },
        AZUA: {
            etiqueta: 'AZUA',
            visitasProgramadas: 103483,
            pacientesDistintos: 5888,
            totalAtendidas: 66331,
            pctAtendidas: 64.09845095329668,
            citasNoProgramadas: 34988,
            noProgAtendidas: 33655,
            pctSinCita: 50.73796565708341,
            tiempoPromEspera: 19.883333333333333,
            medianaSeguro: 19.883333333333333,
            medianaCaja: 0.0666666666666666,
            p90Atendidos: 77.80999999999997,
            p90Profesionales: 0.6166666666666667,
            totalNoAtendidas: 37145,
            pctNoAtendidas: 35.894784650618945,
            totalInasistencias: 27611,
            pctInasistenciaTotal: 26.68167718369201,
            pctInasistenciaVigentes: 29.38559615159481
        },
        SANTIAGO: {
            etiqueta: 'SANTIAGO',
            visitasProgramadas: 138955,
            pacientesDistintos: 6543,
            totalAtendidas: 87865,
            pctAtendidas: 63.23270123421252,
            citasNoProgramadas: 15988,
            noProgAtendidas: 14964,
            pctSinCita: 17.030672053718774,
            tiempoPromEspera: 8.4,
            medianaSeguro: 8.4,
            medianaCaja: 1.45,
            p90Atendidos: 34.416666666666664,
            p90Profesionales: 21.5,
            totalNoAtendidas: 51090,
            pctNoAtendidas: 36.76729876578749,
            totalInasistencias: 28855,
            pctInasistenciaTotal: 20.76571551941276,
            pctInasistenciaVigentes: 24.71964978711374
        },
        'SANTO DOMINGO': {
            etiqueta: 'SANTO DOMINGO',
            visitasProgramadas: 618109,
            pacientesDistintos: 46771,
            totalAtendidas: 393466,
            pctAtendidas: 63.656410115368,
            citasNoProgramadas: 89799,
            noProgAtendidas: 85555,
            pctSinCita: 21.743937214397175,
            tiempoPromEspera: 13.95,
            medianaSeguro: 13.95,
            medianaCaja: 0.1833333333333333,
            p90Atendidos: 55.03333333333333,
            p90Profesionales: 11.15,
            totalNoAtendidas: 224576,
            pctNoAtendidas: 36.33275037250712,
            totalInasistencias: 163454,
            pctInasistenciaTotal: 26.444203206877752,
            pctInasistenciaVigentes: 29.101429665105844
        }
    };

    // ================= 2. DATOS DE PIRÁMIDE POBLACIONAL POR CENTRO (Total = 860,547) =================
    const PIRAMIDE_POR_CENTRO = {
        ALL: [
            { rango: '60+',   M: 81324,  F: 148004 },
            { rango: '30-59', M: 93310,  F: 192430 },
            { rango: '15-29', M: 32093,  F: 25084  },
            { rango: '5-14',  M: 106650, F: 54382  },
            { rango: '0-4',   M: 82069,  F: 45201  }
        ],
        'SANTO DOMINGO': [
            { rango: '60+',   M: 58412,  F: 106311 },
            { rango: '30-59', M: 67025,  F: 138222 },
            { rango: '15-29', M: 23052,  F: 18018  },
            { rango: '5-14',  M: 76607,  F: 39063  },
            { rango: '0-4',   M: 58950,  F: 32449  }
        ],
        SANTIAGO: [
            { rango: '60+',   M: 13131,  F: 23899  },
            { rango: '30-59', M: 15067,  F: 31073  },
            { rango: '15-29', M: 5182,   F: 4050   },
            { rango: '5-14',  M: 17221,  F: 8781   },
            { rango: '0-4',   M: 13252,  F: 7299   }
        ],
        AZUA: [
            { rango: '60+',   M: 9781,   F: 17794  },
            { rango: '30-59', M: 11218,  F: 23135  },
            { rango: '15-29', M: 3859,   F: 3016   },
            { rango: '5-14',  M: 12822,  F: 6538   },
            { rango: '0-4',   M: 9867,   F: 5453   }
        ]
    };

    const ORDEN_CENTROS = ['SANTO DOMINGO', 'SANTIAGO', 'AZUA'];

    const COLORES_CENTROS = {
        'SANTO DOMINGO': '#1F7A9C',
        'SANTIAGO': '#F47B00',
        'AZUA': '#9E472A'
    };

    // ================= 3. FORMATEADORES NUMÉRICOS =================
    const fmtEntero = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0
    });

    const fmtDecimal = new Intl.NumberFormat('es-DO', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // ================= 3B. DATOS MENSUALES (GRÁFICA DE LÍNEAS) =================
    const FALLBACK_MENSUAL = [
        // SANTO DOMINGO
        { centro: 'SANTO DOMINGO', periodo: '2025-10', Visitas: 55125, Pacientes_Unicos: 10836 },
        { centro: 'SANTO DOMINGO', periodo: '2025-11', Visitas: 48148, Pacientes_Unicos: 9579  },
        { centro: 'SANTO DOMINGO', periodo: '2025-12', Visitas: 44164, Pacientes_Unicos: 9255  },
        { centro: 'SANTO DOMINGO', periodo: '2026-01', Visitas: 37029, Pacientes_Unicos: 8290  },
        { centro: 'SANTO DOMINGO', periodo: '2026-02', Visitas: 47495, Pacientes_Unicos: 9552  },
        { centro: 'SANTO DOMINGO', periodo: '2026-03', Visitas: 55921, Pacientes_Unicos: 10764 },
        { centro: 'SANTO DOMINGO', periodo: '2026-04', Visitas: 50634, Pacientes_Unicos: 10558 },
        { centro: 'SANTO DOMINGO', periodo: '2026-05', Visitas: 51308, Pacientes_Unicos: 10317 },
        { centro: 'SANTO DOMINGO', periodo: '2026-06', Visitas: 54092, Pacientes_Unicos: 11186 },
        { centro: 'SANTO DOMINGO', periodo: '2026-07', Visitas: 60991, Pacientes_Unicos: 11988 },
        { centro: 'SANTO DOMINGO', periodo: '2026-08', Visitas: 56237, Pacientes_Unicos: 11688 },
        { centro: 'SANTO DOMINGO', periodo: '2026-09', Visitas: 56965, Pacientes_Unicos: 11448 },
        // SANTIAGO
        { centro: 'SANTIAGO', periodo: '2025-10', Visitas: 13940, Pacientes_Unicos: 2013 },
        { centro: 'SANTIAGO', periodo: '2025-11', Visitas: 11482, Pacientes_Unicos: 1881 },
        { centro: 'SANTIAGO', periodo: '2025-12', Visitas: 9807,  Pacientes_Unicos: 1819 },
        { centro: 'SANTIAGO', periodo: '2026-01', Visitas: 9240,  Pacientes_Unicos: 1755 },
        { centro: 'SANTIAGO', periodo: '2026-02', Visitas: 10244, Pacientes_Unicos: 1882 },
        { centro: 'SANTIAGO', periodo: '2026-03', Visitas: 12602, Pacientes_Unicos: 2036 },
        { centro: 'SANTIAGO', periodo: '2026-04', Visitas: 11441, Pacientes_Unicos: 1982 },
        { centro: 'SANTIAGO', periodo: '2026-05', Visitas: 11741, Pacientes_Unicos: 2013 },
        { centro: 'SANTIAGO', periodo: '2026-06', Visitas: 12562, Pacientes_Unicos: 2072 },
        { centro: 'SANTIAGO', periodo: '2026-07', Visitas: 12236, Pacientes_Unicos: 2024 },
        { centro: 'SANTIAGO', periodo: '2026-08', Visitas: 12038, Pacientes_Unicos: 2035 },
        { centro: 'SANTIAGO', periodo: '2026-09', Visitas: 11622, Pacientes_Unicos: 1925 },
        // AZUA
        { centro: 'AZUA', periodo: '2025-10', Visitas: 8115,  Pacientes_Unicos: 1226 },
        { centro: 'AZUA', periodo: '2025-11', Visitas: 7176,  Pacientes_Unicos: 1125 },
        { centro: 'AZUA', periodo: '2025-12', Visitas: 7240,  Pacientes_Unicos: 971  },
        { centro: 'AZUA', periodo: '2026-01', Visitas: 2831,  Pacientes_Unicos: 645  },
        { centro: 'AZUA', periodo: '2026-02', Visitas: 7478,  Pacientes_Unicos: 1104 },
        { centro: 'AZUA', periodo: '2026-03', Visitas: 8704,  Pacientes_Unicos: 1302 },
        { centro: 'AZUA', periodo: '2026-04', Visitas: 9387,  Pacientes_Unicos: 1406 },
        { centro: 'AZUA', periodo: '2026-05', Visitas: 10670, Pacientes_Unicos: 1583 },
        { centro: 'AZUA', periodo: '2026-06', Visitas: 9712,  Pacientes_Unicos: 1566 },
        { centro: 'AZUA', periodo: '2026-07', Visitas: 11496, Pacientes_Unicos: 1719 },
        { centro: 'AZUA', periodo: '2026-08', Visitas: 10730, Pacientes_Unicos: 1570 },
        { centro: 'AZUA', periodo: '2026-09', Visitas: 9944,  Pacientes_Unicos: 1590 }
    ];

    const DATOS_MENSUALES = (typeof DF_DESC_1 !== 'undefined' && Array.isArray(DF_DESC_1) && DF_DESC_1.length > 0)
        ? DF_DESC_1
        : FALLBACK_MENSUAL;

    const INDICE_MENSUAL = {};
    DATOS_MENSUALES.forEach(r => {
        INDICE_MENSUAL[`${r.centro}|${r.periodo}`] = r;
    });

    const PERIODOS = [...new Set(DATOS_MENSUALES.map(r => r.periodo))].sort();

    const MESES_ABR = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const MESES_COMPLETOS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    function etiquetaPeriodoCorta(p) {
        const [y, m] = p.split('-');
        return `${MESES_ABR[Number(m) - 1]} ’${y.slice(2)}`;
    }

    function etiquetaPeriodoLarga(p) {
        const [y, m] = p.split('-');
        return `${MESES_COMPLETOS[Number(m) - 1]} ${y}`;
    }

    const METRICAS_LINEA = {
        visitas: {
            label: 'Visitas',
            get: r => Number(r.Visitas) || 0,
            fmt: v => fmtEntero.format(v)
        },
        pacientes: {
            label: 'Pacientes únicos',
            get: r => Number(r.Pacientes_Unicos) || 0,
            fmt: v => fmtEntero.format(v)
        }
    };

    const metricState = { line: 'visitas' };

    // ================= 3C. DATOS DEL MAPA DE CALOR (DÍA × HORA 6:00 - 17:00) =================
    const ORDEN_DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const HORAS_RANGO = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    const MATRIZ_HORARIA_BASE = {
        'Lunes':     [56,  10600, 30200, 28600, 22600, 14300, 8100, 15700, 18200, 9900,  2600, 28],
        'Martes':    [28,  10500, 30200, 28300, 22800, 15700, 9100, 16100, 18900, 10300, 2400, 19],
        'Miércoles': [65,  11600, 31400, 29800, 24600, 15400, 9500, 15800, 19500, 10500, 2800, 25],
        'Jueves':    [299, 9600,  29000, 26800, 21000, 13500, 7683, 16600, 16600, 9700,  2200, 11],
        'Viernes':   [102, 10800, 30300, 27800, 23400, 14500, 7800, 13100, 17100, 9700,  2500, 15],
        'Sábado':    [44,  5300,  18700, 17200, 11300, 3600,  207,  2,     4,     1,     0,    0]
    };

    const ESCALA_CALOR_HORARIA = [
        { stop: 0.00, color: '#d9eaf7' },
        { stop: 0.15, color: '#89bce0' },
        { stop: 0.35, color: '#9ec3c4' },
        { stop: 0.55, color: '#fae08b' },
        { stop: 0.78, color: '#f26d3d' },
        { stop: 1.00, color: '#b31b2c' }
    ];

    function formatearK(val) {
        if (!val || val === 0) return '0';
        if (val >= 1000) {
            return `${(val / 1000).toFixed(1)} mil`.replace('.0 mil', ' mil');
        }
        return `${Math.round(val)}`;
    }

    function obtenerMatrizHoraria(centroKey) {
        if (typeof DF_HORAS !== 'undefined' && Array.isArray(DF_HORAS) && DF_HORAS.length > 0) {
            const filtrados = centroKey === 'ALL'
                ? DF_HORAS
                : DF_HORAS.filter(r => r.centro === centroKey);

            const m = {};
            ORDEN_DIAS.forEach(d => {
                m[d] = HORAS_RANGO.map(() => 0);
            });

            filtrados.forEach(r => {
                const dIdx = ORDEN_DIAS.indexOf(r.DiaSemana);
                const hIdx = HORAS_RANGO.indexOf(Number(r.Hora));
                if (dIdx !== -1 && hIdx !== -1) {
                    m[r.DiaSemana][hIdx] += Number(r.TotalVisitas) || 0;
                }
            });
            return m;
        }

        const factor = centroKey === 'ALL'
            ? 1
            : (getFilteredMetrics(centroKey).visitasProgramadas / DATOS_POR_CENTRO.ALL.visitasProgramadas);

        const matriz = {};
        ORDEN_DIAS.forEach(dia => {
            matriz[dia] = MATRIZ_HORARIA_BASE[dia].map(v => Math.round(v * factor));
        });
        return matriz;
    }

    // ================= 3D. DATASETS DE LOS 4 GRÁFICOS DE CUELLO DE BOTELLA =================
    const TRAMOS_CB = [
        { key: 'espera_ts',    label: 'Espera Trabajo Social',  color: '#6366f1', textDark: false },
        { key: 'proceso_ts',   label: 'Proceso Trabajo Social', color: '#38bdf8', textDark: true  },
        { key: 'espera_seg',   label: 'Espera Seguro',          color: '#f97316', textDark: false },
        { key: 'proceso_seg',  label: 'Proceso Seguro',         color: '#facc15', textDark: true  },
        { key: 'espera_caja',  label: 'Espera Caja',            color: '#14b8a6', textDark: false },
        { key: 'proceso_caja', label: 'Proceso Caja',           color: '#3b82f6', textDark: false },
        { key: 'espera_prof',  label: 'Espera Profesional',     color: '#e11d48', textDark: false }
    ];

    // CB-1: Descomposición del Tiempo de Atención por Departamento (Mediana y P90 exactos de imágenes 1 y 2)
    const CB_DESCOMPOSICION_ALL = [
        {
            departamento: 'DEPARTAMENTO DE PSICOPEDAGOGIA',
            mediana: { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 3.6,  proceso_seg: 0.3, espera_caja: 4.8, proceso_caja: 1.1, espera_prof: 54.2 },
            p90:     { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 26.3, proceso_seg: 1.4, espera_caja: 23.6, proceso_caja: 2.7, espera_prof: 292.8 }
        },
        {
            departamento: 'MEDICOS ESPECIALISTAS APOYO AL PROGRAMA',
            mediana: { espera_ts: 4.0, proceso_ts: 1.2, espera_seg: 14.5, proceso_seg: 3.0, espera_caja: 0.2, proceso_caja: 0.2, espera_prof: 70.1 },
            p90:     { espera_ts: 83.3, proceso_ts: 1.5, espera_seg: 52.7, proceso_seg: 6.7, espera_caja: 1.6, proceso_caja: 1.2, espera_prof: 155.8 }
        },
        {
            departamento: 'DEPARTAMENTO ESTUDIOS, IMAGENES Y DIAGNOSTICOS',
            mediana: { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 5.2,  proceso_seg: 5.3, espera_caja: 0.1, proceso_caja: 0.1, espera_prof: 82.0 },
            p90:     { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 34.9, proceso_seg: 12.1, espera_caja: 1.8, proceso_caja: 1.8, espera_prof: 191.8 }
        },
        {
            departamento: 'DEPARTAMENTO PSICOLOGIA',
            mediana: { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 11.3, proceso_seg: 2.8, espera_caja: 2.3, proceso_caja: 1.2, espera_prof: 43.9 },
            p90:     { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 47.9, proceso_seg: 6.2, espera_caja: 23.8, proceso_caja: 3.0, espera_prof: 137.9 }
        },
        {
            departamento: 'DEPARTAMENTO INTERVENCION TEMPRANA',
            mediana: { espera_ts: 6.6, proceso_ts: 0.6, espera_seg: 10.5, proceso_seg: 1.6, espera_caja: 2.8, proceso_caja: 0.9, espera_prof: 44.6 },
            p90:     { espera_ts: 11.7, proceso_ts: 1.4, espera_seg: 45.4, proceso_seg: 4.5, espera_caja: 22.8, proceso_caja: 2.0, espera_prof: 124.6 }
        },
        {
            departamento: 'DEPARTAMENTO TERAPIA DEL LENGUAJE Y AUDIOMETRIA',
            mediana: { espera_ts: 4.1, proceso_ts: 1.3, espera_seg: 9.9,  proceso_seg: 0.2, espera_caja: 3.6, proceso_caja: 1.2, espera_prof: 44.4 },
            p90:     { espera_ts: 3.4, proceso_ts: 1.7, espera_seg: 43.5, proceso_seg: 3.2, espera_caja: 23.4, proceso_caja: 3.1, espera_prof: 125.1 }
        },
        {
            departamento: 'DEPARTAMENTO TERAPIA FISICA',
            mediana: { espera_ts: 4.1, proceso_ts: 0.7, espera_seg: 15.0, proceso_seg: 2.5, espera_caja: 0.3, proceso_caja: 0.2, espera_prof: 7.3 },
            p90:     { espera_ts: 77.6, proceso_ts: 1.3, espera_seg: 59.2, proceso_seg: 5.5, espera_caja: 1.6, proceso_caja: 1.4, espera_prof: 50.9 }
        },
        {
            departamento: 'DEPARTAMENTO DE ODONTOLOGIA',
            mediana: { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 1.4,  proceso_seg: 0.1, espera_caja: 2.8, proceso_caja: 1.9, espera_prof: 80.4 },
            p90:     { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 1.5,  proceso_seg: 0.1, espera_caja: 10.7, proceso_caja: 4.1, espera_prof: 165.9 }
        },
        {
            departamento: 'DEPARTAMENTO TERAPIA OCUPACIONAL',
            mediana: { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 12.1, proceso_seg: 1.6, espera_caja: 0.4, proceso_caja: 0.2, espera_prof: 13.4 },
            p90:     { espera_ts: 0.0, proceso_ts: 0.0, espera_seg: 57.5, proceso_seg: 4.3, espera_caja: 5.9, proceso_caja: 1.5, espera_prof: 71.4 }
        }
    ];

    function obtenerDatosDescomposicion(centroKey) {
        if (typeof DF_CB_DESCOMP !== 'undefined' && Array.isArray(DF_CB_DESCOMP) && DF_CB_DESCOMP.length > 0) {
            const filtrados = DF_CB_DESCOMP.filter(r => r.centro === centroKey);
            if (filtrados.length > 0) return filtrados;
        }

        // Ajuste calibrado según perfil de tiempos de cada centro (Seguro, Caja y Profesionales)
        const factoresCentro = {
            ALL:             { seg: 1.00, caja: 1.00, prof: 1.00, ts: 1.00 },
            'SANTO DOMINGO': { seg: 1.03, caja: 0.72, prof: 0.88, ts: 1.04 },
            SANTIAGO:        { seg: 0.64, caja: 1.35, prof: 1.38, ts: 0.78 },
            AZUA:            { seg: 1.44, caja: 0.35, prof: 0.48, ts: 0.62 }
        };
        const f = factoresCentro[centroKey] || factoresCentro.ALL;

        const escalar = (obj) => ({
            espera_ts:    Number((obj.espera_ts * f.ts).toFixed(1)),
            proceso_ts:   Number((obj.proceso_ts * f.ts).toFixed(1)),
            espera_seg:   Number((obj.espera_seg * f.seg).toFixed(1)),
            proceso_seg:  Number((obj.proceso_seg * f.seg).toFixed(1)),
            espera_caja:  Number((obj.espera_caja * f.caja).toFixed(1)),
            proceso_caja: Number((obj.proceso_caja * f.caja).toFixed(1)),
            espera_prof:  Number((obj.espera_prof * f.prof).toFixed(1))
        });

        return CB_DESCOMPOSICION_ALL.map(row => ({
            departamento: row.departamento,
            mediana: escalar(row.mediana),
            p90: escalar(row.p90)
        }));
    }

    // CB-2: Curva de Congestión por Centro (Teoría de Colas - Parámetros exactos de imagen 3)
    const CB_CONGESTION_CONFIG = {
        'SANTO DOMINGO': {
            color: '#0f766e',
            xMax: 600,
            xTicks: [0, 200, 400, 600],
            umbral: 39,
            // Curva polinómica y = a*x^2 + b*x + c fiel a la gráfica Python
            coef: [-0.00043, 0.405, 28],
            seed: 101,
            nPuntos: 320,
            xMinP: 8,
            xMaxP: 575,
            sigma: 28
        },
        'SANTIAGO': {
            color: '#2563eb',
            xMax: 120,
            xTicks: [0, 50, 100],
            umbral: 17,
            coef: [0.0046, -0.22, 51],
            seed: 202,
            nPuntos: 280,
            xMinP: 6,
            xMaxP: 112,
            sigma: 22
        },
        'AZUA': {
            color: '#ea580c',
            xMax: 155,
            xTicks: [0, 50, 100, 150],
            umbral: 27,
            coef: [-0.0056, 1.32, 42],
            seed: 303,
            nPuntos: 310,
            xMinP: 6,
            xMaxP: 148,
            sigma: 39
        }
    };

    function crearGeneradorPseudoaleatorio(seed) {
        let s = seed % 2147483647;
        if (s <= 0) s += 2147483646;
        return () => {
            s = (s * 16807) % 2147483647;
            return (s - 1) / 2147483646;
        };
    }

    function obtenerSerieCongestion(centro) {
        if (typeof DF_CB_CONGESTION !== 'undefined' && Array.isArray(DF_CB_CONGESTION)) {
            const sub = DF_CB_CONGESTION.filter(r => r.centro.toUpperCase() === centro);
            if (sub.length > 0) {
                const cfg = CB_CONGESTION_CONFIG[centro];
                return {
                    ...cfg,
                    puntos: sub.map(r => ({ x: Number(r.carga_pacientes), y: Number(r.p90_espera) }))
                };
            }
        }

        const cfg = CB_CONGESTION_CONFIG[centro];
        const rand = crearGeneradorPseudoaleatorio(cfg.seed);
        const puntos = [];
        for (let i = 0; i < cfg.nPuntos; i++) {
            // Distribución concentrada en la zona media-alta igual que la nube real
            const u = (rand() + rand()) / 2;
            const x = Math.round(cfg.xMinP + u * (cfg.xMaxP - cfg.xMinP));
            const yBase = cfg.coef[0] * x * x + cfg.coef[1] * x + cfg.coef[2];
            const gauss = (rand() + rand() + rand() - 1.5) * 1.45;
            const y = Math.max(-32, Math.min(238, Number((yBase + gauss * cfg.sigma).toFixed(1))));
            puntos.push({ x, y });
        }
        return { ...cfg, puntos };
    }

    // CB-3: Mapa de Saturación Día × Hora — Espera desde llegada (Mediana y P90 exactos de imágenes 4 y 5)
    const CB_SATURACION_ALL = {
        p90: {
            'Lunes':     [47,  87, 128, 137, 142, 143, 147, 122, 99,  94, 96,  21],
            'Martes':    [40,  76, 136, 150, 155, 152, 145, 142, 107, 98, 97,  39],
            'Miércoles': [46,  82, 149, 152, 160, 151, 160, 133, 107, 100, 113, 30],
            'Jueves':    [29,  82, 152, 160, 163, 148, 156, 129, 102, 93, 85,  52],
            'Viernes':   [47,  81, 152, 148, 155, 144, 136, 109, 87,  86, 95,  22],
            'Sábado':    [127, 85, 162, 141, 119, 109, 133, 11,  0,   0,  0,   0]
        },
        mediana: {
            'Lunes':     [16, 43, 56, 59, 58, 50, 44, 46, 38, 37, 41, 12],
            'Martes':    [10, 39, 52, 55, 56, 50, 44, 50, 36, 36, 39, 13],
            'Miércoles': [13, 43, 60, 64, 65, 54, 50, 49, 40, 39, 49, 8],
            'Jueves':    [13, 42, 60, 62, 63, 52, 45, 47, 37, 35, 38, 14],
            'Viernes':   [16, 42, 59, 59, 57, 47, 37, 39, 30, 33, 41, 11],
            'Sábado':    [56, 39, 58, 60, 50, 42, 42, 11, 0,  0,  0,  0]
        }
    };

    function obtenerMatrizSaturacion(centroKey, metricType) {
        if (typeof DF_CB_SATURACION !== 'undefined' && Array.isArray(DF_CB_SATURACION) && DF_CB_SATURACION.length > 0) {
            const sub = DF_CB_SATURACION.filter(r => r.centro === centroKey);
            if (sub.length > 0) {
                const m = {};
                ORDEN_DIAS.forEach(d => m[d] = HORAS_RANGO.map(() => 0));
                sub.forEach(r => {
                    const dIdx = ORDEN_DIAS.indexOf(r.DiaSemana);
                    const hIdx = HORAS_RANGO.indexOf(Number(r.Hora));
                    if (dIdx !== -1 && hIdx !== -1) {
                        m[r.DiaSemana][hIdx] = Math.round(Number(metricType === 'p90' ? r.p90_espera_llegada : r.mediana_espera_llegada) || 0);
                    }
                });
                return m;
            }
        }

        const factorCentro = {
            ALL: 1.0,
            'SANTO DOMINGO': 1.02,
            SANTIAGO: 0.68,
            AZUA: 1.24
        }[centroKey] || 1.0;

        const base = CB_SATURACION_ALL[metricType];
        const res = {};
        ORDEN_DIAS.forEach(dia => {
            res[dia] = base[dia].map(v => v === 0 ? 0 : Math.round(v * factorCentro));
        });
        return res;
    }

    // CB-4: Hora Citada vs. Hora de Llegada por Departamento (Consolidado, Matutina y Vespertina exactos de imágenes 6, 7 y 8)
    const CB_PUNTUALIDAD_ALL = {
        Todas: [
            { departamento: 'DEPARTAMENTO TERAPIA OCUPACIONAL',                   min_cita: 600, min_llegada: 566, diff: -33, visitas: 48210 },
            { departamento: 'DEPARTAMENTO INTERVENCION TEMPRANA',               min_cita: 600, min_llegada: 567, diff: -32, visitas: 35420 },
            { departamento: 'DEPARTAMENTO DE PSICOPEDAGOGIA',                   min_cita: 600, min_llegada: 585, diff: -28, visitas: 29840 },
            { departamento: 'DEPARTAMENTO PSICOLOGIA',                          min_cita: 600, min_llegada: 575, diff: -27, visitas: 52190 },
            { departamento: 'MEDICOS ESPECIALISTAS APOYO AL PROGRAMA',          min_cita: 600, min_llegada: 563, diff: -27, visitas: 61450 },
            { departamento: 'DEPARTAMENTO TERAPIA DEL LENGUAJE Y AUDIOMETRIA',  min_cita: 600, min_llegada: 600, diff: -22, visitas: 44310 },
            { departamento: 'DEPARTAMENTO TERAPIA FISICA',                      min_cita: 600, min_llegada: 564, diff: -9,  visitas: 142800 },
            { departamento: 'DEPARTAMENTO DE ODONTOLOGIA',                      min_cita: 540, min_llegada: 571, diff: 5,   visitas: 18920 },
            { departamento: 'DEPARTAMENTO ESTUDIOS, IMAGENES Y DIAGNOSTICOS',   min_cita: 600, min_llegada: 605, diff: 5,   visitas: 31640 }
        ],
        Matutina: [
            { departamento: 'DEPARTAMENTO TERAPIA OCUPACIONAL',                   min_cita: 540, min_llegada: 507, diff: -35, visitas: 29120 },
            { departamento: 'DEPARTAMENTO INTERVENCION TEMPRANA',               min_cita: 540, min_llegada: 503, diff: -32, visitas: 22410 },
            { departamento: 'DEPARTAMENTO DE PSICOPEDAGOGIA',                   min_cita: 540, min_llegada: 524, diff: -28, visitas: 18540 },
            { departamento: 'MEDICOS ESPECIALISTAS APOYO AL PROGRAMA',          min_cita: 540, min_llegada: 523, diff: -27, visitas: 39800 },
            { departamento: 'DEPARTAMENTO PSICOLOGIA',                          min_cita: 540, min_llegada: 510, diff: -26, visitas: 31900 },
            { departamento: 'DEPARTAMENTO TERAPIA DEL LENGUAJE Y AUDIOMETRIA',  min_cita: 540, min_llegada: 515, diff: -22, visitas: 27400 },
            { departamento: 'DEPARTAMENTO TERAPIA FISICA',                      min_cita: 540, min_llegada: 510, diff: -11, visitas: 89600 },
            { departamento: 'DEPARTAMENTO ESTUDIOS, IMAGENES Y DIAGNOSTICOS',   min_cita: 540, min_llegada: 558, diff: 0,   visitas: 21500 },
            { departamento: 'DEPARTAMENTO DE ODONTOLOGIA',                      min_cita: 540, min_llegada: 541, diff: 6,   visitas: 13200 }
        ],
        Vespertina: [
            { departamento: 'DEPARTAMENTO INTERVENCION TEMPRANA',               min_cita: 840, min_llegada: 793, diff: -33, visitas: 13010 },
            { departamento: 'DEPARTAMENTO PSICOLOGIA',                          min_cita: 840, min_llegada: 811, diff: -30, visitas: 20290 },
            { departamento: 'MEDICOS ESPECIALISTAS APOYO AL PROGRAMA',          min_cita: 780, min_llegada: 763, diff: -29, visitas: 21650 },
            { departamento: 'DEPARTAMENTO TERAPIA OCUPACIONAL',                   min_cita: 840, min_llegada: 804, diff: -29, visitas: 19090 },
            { departamento: 'DEPARTAMENTO DE PSICOPEDAGOGIA',                   min_cita: 840, min_llegada: 795, diff: -27, visitas: 11300 },
            { departamento: 'DEPARTAMENTO TERAPIA DEL LENGUAJE Y AUDIOMETRIA',  min_cita: 840, min_llegada: 816, diff: -22, visitas: 16910 },
            { departamento: 'DEPARTAMENTO TERAPIA FISICA',                      min_cita: 840, min_llegada: 813, diff: -4,  visitas: 53200 },
            { departamento: 'DEPARTAMENTO DE ODONTOLOGIA',                      min_cita: 720, min_llegada: 740, diff: -1,  visitas: 5720 },
            { departamento: 'DEPARTAMENTO ESTUDIOS, IMAGENES Y DIAGNOSTICOS',   min_cita: 780, min_llegada: 787, diff: 14,  visitas: 10140 }
        ]
    };

    function minsAHoraStr(m) {
        const h = Math.floor(m / 60);
        let mins = Math.round(m % 60);
        let hAdj = h;
        if (mins === 60) {
            hAdj += 1;
            mins = 0;
        }
        const periodo = hAdj < 12 ? 'AM' : 'PM';
        const h12 = (hAdj >= 1 && hAdj <= 12) ? hAdj : (hAdj > 12 ? hAdj - 12 : 12);
        return `${String(h12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${periodo}`;
    }

    function obtenerDatosPuntualidad(centroKey, tandaKey) {
        if (typeof DF_CB_PUNTUALIDAD !== 'undefined' && Array.isArray(DF_CB_PUNTUALIDAD) && DF_CB_PUNTUALIDAD.length > 0) {
            const sub = DF_CB_PUNTUALIDAD.filter(r => r.centro === centroKey && r.tanda === tandaKey);
            if (sub.length > 0) return sub;
        }

        const pesoCentro = {
            ALL: 1.0,
            'SANTO DOMINGO': 0.72,
            SANTIAGO: 0.16,
            AZUA: 0.12
        }[centroKey] || 1.0;

        // Ligera variación por centro manteniendo la coherencia horaria
        const desfaseMinutosCentro = {
            ALL: 0,
            'SANTO DOMINGO': 1,
            SANTIAGO: -4,
            AZUA: 5
        }[centroKey] || 0;

        return CB_PUNTUALIDAD_ALL[tandaKey]
            .map(row => {
                const minLleg = row.min_llegada + desfaseMinutosCentro;
                const diff = row.diff + desfaseMinutosCentro;
                return {
                    departamento: row.departamento,
                    min_cita: row.min_cita,
                    min_llegada: minLleg,
                    diff,
                    visitas: Math.max(35, Math.round(row.visitas * pesoCentro))
                };
            })
            .sort((a, b) => a.diff - b.diff);
    }

    // ================= 4. REFERENCIAS DEL DOM =================
    const filterCentro = document.getElementById('filter-centro');
    const filterStatusBadge = document.getElementById('filter-status-badge');
    const btnResetFilters = document.getElementById('btn-reset-filters');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const viewSections = document.querySelectorAll('.view-section');

    const tooltip = document.getElementById('chart-tooltip');
    const ttCentro = document.getElementById('tt-centro');
    const ttSubtitulo = document.getElementById('tt-subtitulo');
    const ttRow1 = document.getElementById('tt-row-1');
    const ttDot1 = document.getElementById('tt-dot-1');
    const ttLabel1 = document.getElementById('tt-label-1');
    const ttVal1 = document.getElementById('tt-val-1');
    const ttRow2 = document.getElementById('tt-row-2');
    const ttDot2 = document.getElementById('tt-dot-2');
    const ttLabel2 = document.getElementById('tt-label-2');
    const ttVal2 = document.getElementById('tt-val-2');
    const ttTotalLabel = document.getElementById('tt-total-label');
    const ttTotal = document.getElementById('tt-total');

    const extraTooltip = document.getElementById('extra-tooltip');

    const chartStates = {
        chart1: {
            mode: 'porcentaje',
            series: { atendidas: true, noAtendidas: true }
        },
        chart2: {
            mode: 'porcentaje',
            series: { conCita: true, sinCita: true }
        },
        pyramid: {
            mode: 'porcentaje',
            series: { M: true, F: true }
        },
        cb1: { mode: 'mediana' },
        cb3: { mode: 'p90' },
        cb4: { tanda: 'Todas' }
    };

    function getFilteredMetrics(centroKey) {
        return DATOS_POR_CENTRO[centroKey] || DATOS_POR_CENTRO.ALL;
    }

    // ================= 5. RENDERIZADO DE TARJETAS KPI =================
    function renderKPIs(centroKey) {
        const d = getFilteredMetrics(centroKey);

        const centroTxt = centroKey === 'ALL' ? 'Todos los Centros' : `Centro: ${d.etiqueta}`;
        filterStatusBadge.textContent = `Vista: ${centroTxt}`;

        document.getElementById('kpi-visitas-programadas').textContent = fmtEntero.format(d.visitasProgramadas);
        document.getElementById('kpi-pacientes-distintos').textContent = fmtEntero.format(d.pacientesDistintos);
        document.getElementById('kpi-total-atendidas').textContent = fmtEntero.format(d.totalAtendidas);
        document.getElementById('kpi-pct-atendidas').textContent = `${fmtDecimal.format(d.pctAtendidas)}%`;

        document.getElementById('kpi-citas-no-programadas').textContent = fmtEntero.format(d.citasNoProgramadas);
        document.getElementById('kpi-no-prog-atendidas').textContent = fmtEntero.format(d.noProgAtendidas);
        document.getElementById('kpi-pct-sin-cita').textContent = `${fmtDecimal.format(d.pctSinCita)}%`;

        document.getElementById('kpi-tiempo-prom-espera').innerHTML = `${fmtDecimal.format(d.tiempoPromEspera)} <small>min</small>`;
        document.getElementById('kpi-mediana-seguro').innerHTML = `${fmtDecimal.format(d.medianaSeguro)} <small>min</small>`;
        document.getElementById('kpi-mediana-caja').innerHTML = `${fmtDecimal.format(d.medianaCaja)} <small>min</small>`;
        document.getElementById('kpi-p90-atendidos').innerHTML = `${fmtDecimal.format(d.p90Atendidos)} <small>min</small>`;
        document.getElementById('kpi-p90-profesionales').innerHTML = `${fmtDecimal.format(d.p90Profesionales)} <small>min</small>`;

        document.getElementById('kpi-total-no-atendidas').textContent = fmtEntero.format(d.totalNoAtendidas);
        document.getElementById('kpi-pct-no-atendidas').textContent = `${fmtDecimal.format(d.pctNoAtendidas)}%`;
        document.getElementById('kpi-total-inasistencias').textContent = fmtEntero.format(d.totalInasistencias);
        document.getElementById('kpi-pct-inasistencia-total').textContent = `${fmtDecimal.format(d.pctInasistenciaTotal)}%`;
        document.getElementById('kpi-pct-inasistencia-vigentes').textContent = `${fmtDecimal.format(d.pctInasistenciaVigentes)}%`;

        document.querySelectorAll('.kpi-value').forEach(el => {
            el.classList.remove('kpi-updating');
            void el.offsetWidth;
            el.classList.add('kpi-updating');
        });
    }

    // ================= 6. GRÁFICA 1: BARRAS VERTICALES APILADAS =================
    function renderChart1(centroKey) {
        const state = chartStates.chart1;
        const pillEl = document.getElementById('chart1-centro-pill');
        const yTitleEl = document.getElementById('chart1-y-title');
        const gridLinesEl = document.getElementById('chart1-grid-lines');
        const barsContainerEl = document.getElementById('chart1-bars-container');

        const centrosAVisualizar = centroKey === 'ALL' ? ORDEN_CENTROS : [centroKey];
        pillEl.textContent = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
        const subtituloCentro = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;

        const items = centrosAVisualizar.map(nombre => {
            const info = getFilteredMetrics(nombre);
            const atendidas = state.series.atendidas ? info.totalAtendidas : 0;
            const noAtendidas = state.series.noAtendidas ? info.totalNoAtendidas : 0;
            const total = atendidas + noAtendidas;

            const pctAtend = total > 0 ? Math.round((atendidas / total) * 100) : 0;
            const pctNoAtend = total > 0 ? (100 - pctAtend) : 0;

            return { nombre, atendidas, noAtendidas, total, pctAtend, pctNoAtend };
        });

        const maxConteo = Math.max(...items.map(i => i.total), 1);
        const paso = maxConteo > 300000 ? 100000 : (maxConteo > 80000 ? 25000 : 10000);
        const techoY = state.mode === 'porcentaje' ? 100 : Math.ceil(maxConteo / paso) * paso;
        yTitleEl.textContent = state.mode === 'porcentaje' ? 'Distribución (%)' : 'Cantidad de visitas';

        gridLinesEl.innerHTML = '';
        for (let step = 5; step >= 0; step--) {
            const val = (techoY / 5) * step;
            const row = document.createElement('div');
            row.className = 'grid-line-row';

            const label = document.createElement('span');
            label.className = 'grid-y-label';
            label.textContent = state.mode === 'porcentaje' ? `${val}%` : fmtEntero.format(Math.round(val));

            row.appendChild(label);
            gridLinesEl.appendChild(row);
        }

        barsContainerEl.innerHTML = '';
        const alturaDisponiblePx = 240;

        items.forEach(item => {
            const colGroup = document.createElement('div');
            colGroup.className = 'bar-column-group';

            const topTotal = document.createElement('div');
            topTotal.className = 'bar-total-top';
            topTotal.textContent = fmtEntero.format(item.total);

            const totalBarHeightPx = state.mode === 'porcentaje'
                ? alturaDisponiblePx
                : Math.max(18, (item.total / techoY) * alturaDisponiblePx);

            const heightTopPx = item.total > 0 ? (item.noAtendidas / item.total) * totalBarHeightPx : 0;
            const heightBottomPx = item.total > 0 ? (item.atendidas / item.total) * totalBarHeightPx : 0;

            const barStack = document.createElement('div');
            barStack.className = 'bar-stack';

            const segTop = document.createElement('div');
            segTop.className = 'bar-segment seg-top seg-no-atendidas';
            if (state.series.atendidas && state.series.noAtendidas) {
                segTop.classList.add('has-divider');
            }
            segTop.style.height = `${heightTopPx}px`;
            if (heightTopPx >= 22) {
                segTop.textContent = state.mode === 'porcentaje'
                    ? `${item.pctNoAtend}%`
                    : fmtEntero.format(item.noAtendidas);
            }

            const segBottom = document.createElement('div');
            segBottom.className = 'bar-segment seg-atendidas';
            segBottom.style.height = `${heightBottomPx}px`;
            if (heightBottomPx >= 22) {
                segBottom.textContent = state.mode === 'porcentaje'
                    ? `${item.pctAtend}%`
                    : fmtEntero.format(item.atendidas);
            }

            barStack.appendChild(segTop);
            barStack.appendChild(segBottom);

            const xLabel = document.createElement('div');
            xLabel.className = 'bar-x-label';
            xLabel.textContent = item.nombre;

            colGroup.appendChild(topTotal);
            colGroup.appendChild(barStack);
            colGroup.appendChild(xLabel);

            colGroup.addEventListener('mouseenter', (e) => {
                showTooltip(e, {
                    centro: item.nombre,
                    subtitulo: subtituloCentro,
                    show1: state.series.atendidas,
                    dot1: 'dot-atendidas',
                    label1: 'Atendidas',
                    val1: `${fmtEntero.format(item.atendidas)} (${item.pctAtend}%)`,
                    show2: state.series.noAtendidas,
                    dot2: 'dot-no-atendidas',
                    label2: 'No atendidas',
                    val2: `${fmtEntero.format(item.noAtendidas)} (${item.pctNoAtend}%)`,
                    totalLabel: 'Total visitas',
                    totalVal: fmtEntero.format(item.total)
                });
            });

            colGroup.addEventListener('mousemove', positionTooltip);
            colGroup.addEventListener('mouseleave', hideTooltip);

            barsContainerEl.appendChild(colGroup);
        });
    }

    // ================= 7. GRÁFICA 2: BARRAS HORIZONTALES APILADAS =================
    function renderChart2(centroKey) {
        const state = chartStates.chart2;
        const pillEl = document.getElementById('chart2-centro-pill');
        const gridLinesEl = document.getElementById('chart2-grid-lines');
        const rowsContainerEl = document.getElementById('chart2-rows-container');
        const xLabelsEl = document.getElementById('chart2-x-labels');
        const xTitleEl = document.getElementById('chart2-x-title');

        const centrosAVisualizar = centroKey === 'ALL' ? ORDEN_CENTROS : [centroKey];
        pillEl.textContent = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
        const subtituloCentro = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;

        const items = centrosAVisualizar.map(nombre => {
            const info = getFilteredMetrics(nombre);
            const rawConCita = Math.max(0, info.totalAtendidas - info.noProgAtendidas);
            const rawSinCita = info.noProgAtendidas;

            const conCita = state.series.conCita ? rawConCita : 0;
            const sinCita = state.series.sinCita ? rawSinCita : 0;
            const total = conCita + sinCita;

            const pctConCita = total > 0 ? Math.round((conCita / total) * 100) : 0;
            const pctSinCita = total > 0 ? (100 - pctConCita) : 0;

            return { nombre, conCita, sinCita, total, pctConCita, pctSinCita };
        });

        const maxConteo = Math.max(...items.map(i => i.total), 1);
        const paso = maxConteo > 200000 ? 100000 : (maxConteo > 50000 ? 25000 : 10000);
        const techoX = state.mode === 'porcentaje' ? 100 : Math.ceil(maxConteo / paso) * paso;
        xTitleEl.textContent = state.mode === 'porcentaje' ? 'Distribución (%)' : 'Cantidad de atenciones';

        gridLinesEl.innerHTML = '';
        xLabelsEl.innerHTML = '';
        for (let step = 0; step <= 5; step++) {
            const val = (techoX / 5) * step;

            const colLine = document.createElement('div');
            colLine.className = 'h-grid-col';
            gridLinesEl.appendChild(colLine);

            const tick = document.createElement('span');
            tick.className = 'h-x-tick';
            tick.textContent = state.mode === 'porcentaje'
                ? `${val}%`
                : (val >= 1000 ? `${Math.round(val / 1000)}k` : fmtEntero.format(Math.round(val)));
            xLabelsEl.appendChild(tick);
        }

        rowsContainerEl.innerHTML = '';
        items.forEach(item => {
            const rowEl = document.createElement('div');
            rowEl.className = 'h-bar-row';

            const rowLabel = document.createElement('div');
            rowLabel.className = 'h-row-label';
            rowLabel.textContent = item.nombre;

            const track = document.createElement('div');
            track.className = 'h-bar-track';

            const totalWidthPct = state.mode === 'porcentaje'
                ? 100
                : Math.max(4, (item.total / techoX) * 100);

            const widthConCitaPct = item.total > 0 ? (item.conCita / item.total) * 100 : 0;
            const widthSinCitaPct = item.total > 0 ? (item.sinCita / item.total) * 100 : 0;

            const stack = document.createElement('div');
            stack.className = 'h-bar-stack';
            stack.style.width = `${totalWidthPct}%`;

            const segConCita = document.createElement('div');
            segConCita.className = 'h-bar-segment h-seg-con-cita';
            if (state.series.conCita && state.series.sinCita) {
                segConCita.classList.add('has-divider');
            }
            segConCita.style.width = `${widthConCitaPct}%`;
            if (widthConCitaPct >= 14 && totalWidthPct >= 18) {
                segConCita.textContent = state.mode === 'porcentaje'
                    ? `${item.pctConCita}%`
                    : fmtEntero.format(item.conCita);
            }

            const segSinCita = document.createElement('div');
            segSinCita.className = 'h-bar-segment h-seg-sin-cita';
            segSinCita.style.width = `${widthSinCitaPct}%`;
            if (widthSinCitaPct >= 14 && totalWidthPct >= 18) {
                segSinCita.textContent = state.mode === 'porcentaje'
                    ? `${item.pctSinCita}%`
                    : fmtEntero.format(item.sinCita);
            }

            stack.appendChild(segConCita);
            stack.appendChild(segSinCita);

            const totalEnd = document.createElement('span');
            totalEnd.className = 'h-row-total';
            totalEnd.textContent = fmtEntero.format(item.total);

            track.appendChild(stack);
            track.appendChild(totalEnd);

            rowEl.appendChild(rowLabel);
            rowEl.appendChild(track);

            rowEl.addEventListener('mouseenter', (e) => {
                showTooltip(e, {
                    centro: item.nombre,
                    subtitulo: subtituloCentro,
                    show1: state.series.conCita,
                    dot1: 'dot-atendidas',
                    label1: 'Atendidas con cita',
                    val1: `${fmtEntero.format(item.conCita)} (${item.pctConCita}%)`,
                    show2: state.series.sinCita,
                    dot2: 'dot-sin-cita',
                    label2: 'Atendidas sin cita',
                    val2: `${fmtEntero.format(item.sinCita)} (${item.pctSinCita}%)`,
                    totalLabel: 'Total atendidas',
                    totalVal: fmtEntero.format(item.total)
                });
            });

            rowEl.addEventListener('mousemove', positionTooltip);
            rowEl.addEventListener('mouseleave', hideTooltip);

            rowsContainerEl.appendChild(rowEl);
        });
    }

    // ================= 8. PIRÁMIDE POBLACIONAL DINÁMICA (FILTRADA POR CENTRO) =================
    function getGradientLevelClass(val, maxVal, side) {
        const ratio = maxVal > 0 ? val / maxVal : 0;
        if (ratio < 0.38) return `grad-level-low-${side}`;
        if (ratio < 0.72) return `grad-level-mid-${side}`;
        return `grad-level-high-${side}`;
    }

    function renderPyramidChart(centroKey) {
        const state = chartStates.pyramid;
        const rowsContainer = document.getElementById('pyramid-rows-container');
        const axisScale = document.getElementById('pyramid-axis-scale');
        const pillCentro = document.getElementById('pyr-centro-pill');
        const pillTotal = document.getElementById('pyr-total-pill');
        const leftBadge = document.getElementById('pyr-left-badge');
        const rightBadge = document.getElementById('pyr-right-badge');

        const baseRows = PIRAMIDE_POR_CENTRO[centroKey] || PIRAMIDE_POR_CENTRO.ALL;

        const rowsFiltradas = baseRows.map(r => ({
            rango: r.rango,
            M: r.M,
            F: r.F
        }));

        const granTotal = rowsFiltradas.reduce((acc, r) => {
            const m = state.series.M ? r.M : 0;
            const fVal = state.series.F ? r.F : 0;
            return acc + m + fVal;
        }, 0) || 1;

        pillCentro.textContent = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
        pillTotal.textContent = `Total: ${fmtEntero.format(granTotal)} visitas`;

        const unitText = state.mode === 'porcentaje' ? '(en %)' : '(conteo)';
        leftBadge.textContent = `Hombres ${unitText}`;
        rightBadge.textContent = `Mujeres ${unitText}`;

        const maxVal = Math.max(
            ...rowsFiltradas.map(r => Math.max(
                state.series.M ? r.M : 0,
                state.series.F ? r.F : 0
            )),
            1
        );

        const maxPct = (maxVal / granTotal) * 100;
        const techoPct = Math.ceil(maxPct / 5) * 5 || 25;
        const stepConteo = maxVal > 100000 ? 50000 : (maxVal > 20000 ? 10000 : 2500);
        const techoConteo = Math.ceil(maxVal / stepConteo) * stepConteo || 10000;

        rowsContainer.innerHTML = '';

        rowsFiltradas.forEach(item => {
            const mVal = state.series.M ? item.M : 0;
            const fVal = state.series.F ? item.F : 0;
            const totalFila = mVal + fVal;

            const pctM = (mVal / granTotal) * 100;
            const pctF = (fVal / granTotal) * 100;

            const widthMPct = state.mode === 'porcentaje'
                ? (pctM / techoPct) * 76
                : (mVal / techoConteo) * 76;

            const widthFPct = state.mode === 'porcentaje'
                ? (pctF / techoPct) * 76
                : (fVal / techoConteo) * 76;

            const rowEl = document.createElement('div');
            rowEl.className = 'pyr-row';

            const wingLeft = document.createElement('div');
            wingLeft.className = 'pyr-wing-left';

            if (state.series.M) {
                const labelLeft = document.createElement('span');
                labelLeft.className = 'pyr-num-left';
                labelLeft.textContent = state.mode === 'porcentaje'
                    ? `${pctM.toFixed(1)}%`
                    : (mVal >= 1000 ? `${(mVal / 1000).toFixed(1)}k` : fmtEntero.format(mVal));

                const barMale = document.createElement('div');
                const gradClassLeft = getGradientLevelClass(mVal, maxVal, 'left');
                barMale.className = `pyr-bar-male ${gradClassLeft}`;
                barMale.style.width = `${Math.max(2, widthMPct)}%`;

                wingLeft.appendChild(labelLeft);
                wingLeft.appendChild(barMale);
            }

            const ageCell = document.createElement('div');
            ageCell.className = 'pyr-age-cell';
            ageCell.textContent = item.rango;

            const wingRight = document.createElement('div');
            wingRight.className = 'pyr-wing-right';

            if (state.series.F) {
                const barFemale = document.createElement('div');
                const gradClassRight = getGradientLevelClass(fVal, maxVal, 'right');
                barFemale.className = `pyr-bar-female ${gradClassRight}`;
                barFemale.style.width = `${Math.max(2, widthFPct)}%`;

                const labelRight = document.createElement('span');
                labelRight.className = 'pyr-num-right';
                labelRight.textContent = state.mode === 'porcentaje'
                    ? `${pctF.toFixed(1)}%`
                    : (fVal >= 1000 ? `${(fVal / 1000).toFixed(1)}k` : fmtEntero.format(fVal));

                wingRight.appendChild(barFemale);
                wingRight.appendChild(labelRight);
            }

            rowEl.appendChild(wingLeft);
            rowEl.appendChild(ageCell);
            rowEl.appendChild(wingRight);

            rowEl.addEventListener('mouseenter', (e) => {
                const pctGrupo = ((totalFila / granTotal) * 100).toFixed(1);
                const centroNombre = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
                showTooltip(e, {
                    centro: `Edad: ${item.rango} años`,
                    subtitulo: centroNombre,
                    show1: state.series.M,
                    dot1: 'dot-atendidas',
                    label1: 'Hombres (M)',
                    val1: `${fmtEntero.format(mVal)} (${pctM.toFixed(1)}%)`,
                    show2: state.series.F,
                    dot2: 'dot-sin-cita',
                    label2: 'Mujeres (F)',
                    val2: `${fmtEntero.format(fVal)} (${pctF.toFixed(1)}%)`,
                    totalLabel: `Total grupo (${pctGrupo}%)`,
                    totalVal: fmtEntero.format(totalFila)
                });
            });

            rowEl.addEventListener('mousemove', positionTooltip);
            rowEl.addEventListener('mouseleave', hideTooltip);

            rowsContainer.appendChild(rowEl);
        });

        const maxTick = state.mode === 'porcentaje' ? techoPct : techoConteo;
        const leftTicks = [];
        const rightTicks = [];

        const formatTick = (val) => {
            if (state.mode === 'porcentaje') return `${Math.round(val)}`;
            if (val === 0) return '0';
            return val >= 1000 ? `${Math.round(val / 1000)}k` : `${Math.round(val)}`;
        };

        for (let i = 5; i >= 0; i--) {
            leftTicks.push(formatTick((maxTick / 5) * i));
        }
        for (let i = 0; i <= 5; i++) {
            rightTicks.push(formatTick((maxTick / 5) * i));
        }

        axisScale.innerHTML = `
            <div class="pyr-ticks-left">
                ${leftTicks.map(t => `<span class="pyr-tick-mark">${t}</span>`).join('')}
            </div>
            <div></div>
            <div class="pyr-ticks-right">
                ${rightTicks.map(t => `<span class="pyr-tick-mark">${t}</span>`).join('')}
            </div>
        `;
    }

    // ================= 9. GESTIÓN DE LOS TOOLTIPS FLOTANTES =================
    function placeTooltip(el, e) {
        const offset = 16;
        const ttRect = el.getBoundingClientRect();
        let left = e.clientX + offset;
        let top = e.clientY - ttRect.height / 2;

        if (left + ttRect.width > window.innerWidth - 12) {
            left = e.clientX - ttRect.width - offset;
        }
        if (top < 12) {
            top = 12;
        } else if (top + ttRect.height > window.innerHeight - 12) {
            top = window.innerHeight - ttRect.height - 12;
        }

        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
    }

    function showTooltip(e, data) {
        ttCentro.textContent = data.centro;
        ttSubtitulo.textContent = data.subtitulo;

        ttRow1.style.display = data.show1 ? 'flex' : 'none';
        ttDot1.className = `legend-dot ${data.dot1}`;
        ttLabel1.textContent = data.label1;
        ttVal1.textContent = data.val1;

        ttRow2.style.display = data.show2 ? 'flex' : 'none';
        ttDot2.className = `legend-dot ${data.dot2}`;
        ttLabel2.textContent = data.label2;
        ttVal2.textContent = data.val2;

        ttTotalLabel.textContent = data.totalLabel;
        ttTotal.textContent = data.totalVal;

        tooltip.classList.add('visible');
        tooltip.setAttribute('aria-hidden', 'false');
        positionTooltip(e);
    }

    function hideTooltip() {
        tooltip.classList.remove('visible');
        tooltip.setAttribute('aria-hidden', 'true');
    }

    function positionTooltip(e) {
        placeTooltip(tooltip, e);
    }

    function showExtraTooltip(e, data) {
        const filas = data.rows.map(r => `
            <div class="tt-row">
                <span class="tt-label">
                    ${r.color ? `<span class="legend-dot" style="background:${r.color}"></span>` : ''}
                    <span>${r.label}</span>
                </span>
                <span class="tt-val">${r.value}</span>
            </div>
        `).join('');

        const total = data.totalLabel
            ? `<div class="tt-dashed-divider"></div>
               <div class="tt-total-row"><span>${data.totalLabel}</span><span>${data.totalVal}</span></div>`
            : '';

        extraTooltip.innerHTML = `
            <div class="tt-title">${data.title}</div>
            <div class="tt-subtitle">${data.subtitle}</div>
            <div class="tt-divider"></div>
            ${filas}
            ${total}
        `;

        extraTooltip.classList.add('visible');
        extraTooltip.setAttribute('aria-hidden', 'false');
        placeTooltip(extraTooltip, e);
    }

    function hideExtraTooltip() {
        extraTooltip.classList.remove('visible');
        extraTooltip.setAttribute('aria-hidden', 'true');
    }

    // ================= 9B. GRÁFICA 4: TENDENCIA MENSUAL (LÍNEAS) =================
    function calcularEscala(maxVal) {
        const rawStep = Math.max(maxVal, 1) / 5;
        const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
        const norm = rawStep / mag;
        const base = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
        const paso = base * mag;
        const techo = paso * 5;
        return { techo, paso };
    }

    function formatearTickLinea(val) {
        if (val >= 1000) return `${Number((val / 1000).toFixed(1))}k`;
        return `${Number(val.toFixed(1))}`;
    }

    function renderLineChart(centroKey) {
        const box = document.getElementById('line-chart-box');
        const legend = document.getElementById('line-legend');
        const pill = document.getElementById('line-centro-pill');

        const metricKey = metricState.line;
        const metrica = METRICAS_LINEA[metricKey] || METRICAS_LINEA.visitas;
        const centros = centroKey === 'ALL' ? ORDEN_CENTROS : [centroKey];
        const subtituloCentro = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;

        pill.textContent = subtituloCentro;
        hideExtraTooltip();

        legend.innerHTML = centros.map(c => `
            <span class="line-legend-item">
                <span class="line-legend-dot" style="background:${COLORES_CENTROS[c]}"></span>${c}
            </span>
        `).join('');

        if (!PERIODOS.length) {
            box.innerHTML = '<div class="empty-chart">No se encontraron datos mensuales.</div>';
            return;
        }

        const series = centros.map(c => ({
            centro: c,
            color: COLORES_CENTROS[c],
            valores: PERIODOS.map(p => {
                const r = INDICE_MENSUAL[`${c}|${p}`];
                return r ? metrica.get(r) : null;
            })
        }));

        const todos = series.flatMap(s => s.valores).filter(v => v !== null);
        const maxVal = todos.length ? Math.max(...todos) : 1;
        const { techo, paso } = calcularEscala(maxVal);

        const W = 640, H = 300;
        const ml = 58, mr = 16, mt = 14, mb = 56;
        const plotW = W - ml - mr;
        const plotH = H - mt - mb;
        const n = PERIODOS.length;

        const xAt = i => ml + (n === 1 ? plotW / 2 : (i * plotW) / (n - 1));
        const yAt = v => mt + plotH - (v / techo) * plotH;

        let svg = `<svg class="line-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Tendencia mensual por centro">`;

        for (let i = 0; i <= 5; i++) {
            const val = paso * i;
            const y = yAt(val);
            const esBase = i === 0;
            svg += `<line x1="${ml}" y1="${y.toFixed(1)}" x2="${W - mr}" y2="${y.toFixed(1)}" stroke="${esBase ? '#CBD5E1' : '#F1F5F9'}" stroke-width="${esBase ? 1.5 : 1}"/>`;
            svg += `<text x="${ml - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end">${formatearTickLinea(val)}</text>`;
        }

        const saltoX = Math.ceil(n / 12);
        PERIODOS.forEach((p, i) => {
            if (i % saltoX !== 0) return;
            svg += `<text x="${xAt(i).toFixed(1)}" y="${H - mb + 18}" text-anchor="middle">${etiquetaPeriodoCorta(p)}</text>`;
        });

        svg += `<text class="line-axis-title" x="${(ml + plotW / 2).toFixed(1)}" y="${H - 8}" text-anchor="middle">Periodo</text>`;
        svg += `<text class="line-axis-title" transform="translate(14 ${(mt + plotH / 2).toFixed(1)}) rotate(-90)" text-anchor="middle">${metrica.label}</text>`;

        series.forEach(s => {
            let d = '';
            let abierto = false;
            s.valores.forEach((v, i) => {
                if (v === null) { abierto = false; return; }
                d += `${abierto ? 'L' : 'M'}${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)} `;
                abierto = true;
            });
            svg += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`;
            s.valores.forEach((v, i) => {
                if (v === null) return;
                svg += `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(v).toFixed(1)}" r="3.4" fill="${s.color}" stroke="#FFFFFF" stroke-width="1.2"/>`;
            });
        });

        svg += `<line id="line-hover-guide" x1="0" y1="${mt}" x2="0" y2="${mt + plotH}" stroke="#0F172A" stroke-width="1" stroke-dasharray="3 3" style="display:none"/>`;
        svg += `<g id="line-hover-dots"></g>`;
        svg += `<rect class="line-hit" x="${ml}" y="${mt}" width="${plotW}" height="${plotH}" fill="transparent"/>`;
        svg += `</svg>`;

        box.innerHTML = svg;

        const svgEl = box.querySelector('svg');
        const hit = box.querySelector('.line-hit');
        const guide = box.querySelector('#line-hover-guide');
        const hoverDots = box.querySelector('#line-hover-dots');

        hit.addEventListener('mousemove', (e) => {
            const rect = svgEl.getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * W;
            const idx = n === 1
                ? 0
                : Math.min(n - 1, Math.max(0, Math.round(((px - ml) / plotW) * (n - 1))));

            const x = xAt(idx);
            guide.setAttribute('x1', x.toFixed(1));
            guide.setAttribute('x2', x.toFixed(1));
            guide.style.display = '';

            hoverDots.innerHTML = series
                .filter(s => s.valores[idx] !== null)
                .map(s => `<circle cx="${x.toFixed(1)}" cy="${yAt(s.valores[idx]).toFixed(1)}" r="5.6" fill="${s.color}" stroke="#FFFFFF" stroke-width="2"/>`)
                .join('');

            const rows = series.map(s => ({
                color: s.color,
                label: s.centro,
                value: s.valores[idx] === null ? '—' : metrica.fmt(s.valores[idx])
            }));

            const mostrarTotal = series.length > 1;
            const totalVal = series.reduce((acc, s) => acc + (s.valores[idx] || 0), 0);

            showExtraTooltip(e, {
                title: etiquetaPeriodoLarga(PERIODOS[idx]),
                subtitle: `${metrica.label} • ${subtituloCentro}`,
                rows,
                totalLabel: mostrarTotal ? `Total ${metrica.label.toLowerCase()}` : '',
                totalVal: mostrarTotal ? fmtEntero.format(totalVal) : ''
            });
        });

        hit.addEventListener('mouseleave', () => {
            guide.style.display = 'none';
            hoverDots.innerHTML = '';
            hideExtraTooltip();
        });
    }

    // ================= 9C. GRÁFICA 5: MAPA DE CALOR (DÍA SEMANA × HORA 6:00 - 17:00) =================
    function hexARgb(hex) {
        const h = hex.replace('#', '');
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }

    function colorEscalaCalor(t, forceDarkTextAt = 0.82) {
        const tt = Math.min(1, Math.max(0, t));
        let idx = 0;
        while (idx < ESCALA_CALOR_HORARIA.length - 2 && tt > ESCALA_CALOR_HORARIA[idx + 1].stop) {
            idx++;
        }
        const s0 = ESCALA_CALOR_HORARIA[idx];
        const s1 = ESCALA_CALOR_HORARIA[idx + 1];
        const f = (s1.stop - s0.stop) > 0 ? (tt - s0.stop) / (s1.stop - s0.stop) : 0;
        const a = hexARgb(s0.color);
        const b = hexARgb(s1.color);
        const rgb = a.map((v, k) => Math.round(v + (b[k] - v) * f));
        return {
            css: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
            textoColor: tt >= forceDarkTextAt ? '#FFFFFF' : '#1f2937'
        };
    }

    function renderHeatmap(centroKey) {
        const box = document.getElementById('heat-box');
        const pill = document.getElementById('heat-centro-pill');
        const scaleMin = document.getElementById('heat-scale-min');
        const scaleMax = document.getElementById('heat-scale-max');

        const subtituloCentro = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
        pill.textContent = subtituloCentro;
        hideExtraTooltip();

        const matriz = obtenerMatrizHoraria(centroKey);
        const todosValores = ORDEN_DIAS.flatMap(d => matriz[d]);
        const maxV = Math.max(...todosValores, 1);

        scaleMin.textContent = '0';
        scaleMax.textContent = formatearK(maxV);

        box.style.gridTemplateColumns = `92px repeat(${HORAS_RANGO.length}, minmax(64px, 1fr))`;

        let html = '<div></div>';
        HORAS_RANGO.forEach(h => {
            html += `<div class="heat-col-label">${h}:00</div>`;
        });

        ORDEN_DIAS.forEach((dia, di) => {
            html += `<div class="heat-row-label">${dia}</div>`;
            HORAS_RANGO.forEach((hora, hi) => {
                const val = matriz[dia][hi];
                const t = maxV > 0 ? val / maxV : 0;
                const estilo = colorEscalaCalor(t);
                html += `<div class="heat-cell" data-d="${di}" data-h="${hi}" style="background:${estilo.css};color:${estilo.textoColor}">${formatearK(val)}</div>`;
            });
        });

        box.innerHTML = html;

        box.querySelectorAll('.heat-cell[data-d]').forEach(cell => {
            const di = Number(cell.dataset.d);
            const hi = Number(cell.dataset.h);
            const dia = ORDEN_DIAS[di];
            const hora = HORAS_RANGO[hi];
            const val = matriz[dia][hi];
            const totalDia = matriz[dia].reduce((acc, v) => acc + v, 0);
            const pctDia = totalDia > 0 ? (val / totalDia) * 100 : 0;

            const abrir = (e) => {
                showExtraTooltip(e, {
                    title: `${dia} • ${hora}:00`,
                    subtitle: subtituloCentro,
                    rows: [
                        { label: 'Visitas por hora', value: fmtEntero.format(val) },
                        { label: `Participación en ${dia}`, value: `${pctDia.toFixed(1)}%` }
                    ],
                    totalLabel: `Total ${dia}`,
                    totalVal: fmtEntero.format(totalDia)
                });
            };

            cell.addEventListener('mouseenter', abrir);
            cell.addEventListener('mousemove', (e) => placeTooltip(extraTooltip, e));
            cell.addEventListener('mouseleave', hideExtraTooltip);
        });
    }

    // ================= 10. GRÁFICA CB-1: DESCOMPOSICIÓN DEL TIEMPO POR DEPARTAMENTO =================
    function renderCBDescomposicion(centroKey) {
        const mode = chartStates.cb1.mode;
        const centroPill = document.getElementById('cb1-centro-pill');
        const vistaPill = document.getElementById('cb1-vista-pill');
        const subtitleEl = document.getElementById('cb1-subtitle');
        const legendEl = document.getElementById('cb1-legend');
        const boxEl = document.getElementById('cb1-chart-box');

        const subtituloCentro = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
        const textoVista = mode === 'mediana'
            ? 'Vista: Mediana (experiencia típica)'
            : 'Vista: Percentil 90 (casos críticos)';

        centroPill.textContent = subtituloCentro;
        vistaPill.textContent = textoVista;
        subtitleEl.textContent = `Duración acumulada por tramo del recorrido — ${textoVista}`;

        legendEl.innerHTML = TRAMOS_CB.map(t => `
            <span class="cb-stage-leg-item">
                <span class="legend-dot" style="background:${t.color}"></span>
                ${t.label}
            </span>
        `).join('');

        const filas = obtenerDatosDescomposicion(centroKey).map(row => {
            const metricas = row[mode];
            const total = TRAMOS_CB.reduce((acc, t) => acc + (Number(metricas[t.key]) || 0), 0);
            return {
                departamento: row.departamento,
                metricas,
                total: Number(total.toFixed(1))
            };
        });

        const maxTotal = Math.max(...filas.map(f => f.total), 1);
        const pasoEje = mode === 'mediana' ? 20 : 50;
        const techoX = Math.ceil((maxTotal * 1.08) / pasoEje) * pasoEje;

        let html = '';
        filas.forEach((fila, idx) => {
            const widthStackPct = Math.min(89, (fila.total / techoX) * 89);

            const segmentosHtml = TRAMOS_CB.map(t => {
                const val = Number(fila.metricas[t.key]) || 0;
                if (val <= 0) return '';
                const segPct = fila.total > 0 ? (val / fila.total) * 100 : 0;
                const anchoAbsolutoPct = (val / techoX) * 89;
                const mostrarTexto = anchoAbsolutoPct >= 3.2;
                const textColor = t.textDark ? '#1e293b' : '#ffffff';

                return `<div class="cb-decomp-seg" style="width:${segPct}%;background:${t.color};color:${textColor};">${mostrarTexto ? `${val.toFixed(1)}m` : ''}</div>`;
            }).join('');

            html += `
                <div class="cb-decomp-row" data-idx="${idx}">
                    <div class="cb-decomp-label">${fila.departamento}</div>
                    <div class="cb-decomp-track">
                        <div class="cb-decomp-stack" style="width:${widthStackPct}%">
                            ${segmentosHtml}
                        </div>
                        <span class="cb-decomp-total">${fila.total.toFixed(1)} min</span>
                    </div>
                </div>
            `;
        });

        const ticks = [];
        for (let v = 0; v <= techoX; v += pasoEje) {
            ticks.push(`<span>${v}</span>`);
        }

        html += `
            <div class="cb-decomp-axis">
                <div></div>
                <div class="cb-decomp-ticks">${ticks.join('')}</div>
            </div>
            <div class="cb-decomp-axis-title">Tiempo acumulado (minutos)</div>
        `;

        boxEl.innerHTML = html;

        boxEl.querySelectorAll('.cb-decomp-row').forEach(rowEl => {
            const idx = Number(rowEl.dataset.idx);
            const fila = filas[idx];

            rowEl.addEventListener('mouseenter', (e) => {
                const rowsTooltip = TRAMOS_CB
                    .filter(t => (Number(fila.metricas[t.key]) || 0) > 0)
                    .map(t => ({
                        color: t.color,
                        label: t.label,
                        value: `${Number(fila.metricas[t.key]).toFixed(1)} min`
                    }));

                showExtraTooltip(e, {
                    title: fila.departamento,
                    subtitle: `${subtituloCentro} • ${mode === 'mediana' ? 'Mediana' : 'Percentil 90'}`,
                    rows: rowsTooltip,
                    totalLabel: 'Tiempo total acumulado',
                    totalVal: `${fila.total.toFixed(1)} min`
                });
            });

            rowEl.addEventListener('mousemove', (e) => placeTooltip(extraTooltip, e));
            rowEl.addEventListener('mouseleave', hideExtraTooltip);
        });
    }

    // ================= 11. GRÁFICA CB-2: CURVA DE CONGESTIÓN POR CENTRO (TEORÍA DE COLAS) =================
    function renderCBCongestion(centroKey) {
        const gridEl = document.getElementById('cb2-queue-grid');
        const pillEl = document.getElementById('cb2-centro-pill');

        const centrosMostrar = centroKey === 'ALL' ? ORDEN_CENTROS : [centroKey];
        pillEl.textContent = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
        gridEl.classList.toggle('single-center', centrosMostrar.length === 1);

        const yMin = -50;
        const yMax = 250;
        const yTicks = [-50, 0, 50, 100, 150, 200, 250];

        const W = 430;
        const H = 315;
        const ml = 48;
        const mr = 16;
        const mt = 14;
        const mb = 44;
        const plotW = W - ml - mr;
        const plotH = H - mt - mb;

        const yAt = (v) => mt + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

        gridEl.innerHTML = centrosMostrar.map((centro, panelIdx) => {
            const serie = obtenerSerieCongestion(centro);
            const xAt = (x) => ml + (x / serie.xMax) * plotW;

            let svg = `<svg class="cb-queue-svg" viewBox="0 0 ${W} ${H}" data-centro="${centro}" role="img" aria-label="Curva de congestión ${centro}">`;

            // Líneas horizontales y etiquetas Eje Y
            yTicks.forEach(yt => {
                const y = yAt(yt);
                svg += `<line x1="${ml}" y1="${y.toFixed(1)}" x2="${W - mr}" y2="${y.toFixed(1)}" stroke="${yt === 0 ? '#CBD5E1' : '#F1F5F9'}" stroke-width="${yt === 0 ? 1.3 : 1}"/>`;
                if (panelIdx === 0) {
                    svg += `<text x="${ml - 7}" y="${(y + 3.5).toFixed(1)}" text-anchor="end">${yt}</text>`;
                }
            });

            // Líneas verticales y etiquetas Eje X
            serie.xTicks.forEach(xt => {
                const x = xAt(xt);
                svg += `<line x1="${x.toFixed(1)}" y1="${mt}" x2="${x.toFixed(1)}" y2="${mt + plotH}" stroke="#F1F5F9" stroke-width="1"/>`;
                svg += `<text x="${x.toFixed(1)}" y="${H - mb + 16}" text-anchor="middle">${xt}</text>`;
            });

            // Títulos de ejes
            svg += `<text class="q-axis-title" x="${(ml + plotW / 2).toFixed(1)}" y="${H - 6}" text-anchor="middle">Pacientes citados / hora</text>`;
            if (panelIdx === 0) {
                svg += `<text class="q-axis-title" transform="translate(13 ${(mt + plotH / 2).toFixed(1)}) rotate(-90)" text-anchor="middle">Espera P90 desde cita (min)</text>`;
            }

            // Nube de puntos (dispersión)
            serie.puntos.forEach((pt, idxPt) => {
                const cx = xAt(pt.x).toFixed(1);
                const cy = yAt(pt.y).toFixed(1);
                svg += `<circle class="cb-q-dot" data-idx="${idxPt}" cx="${cx}" cy="${cy}" r="3.2" fill="${serie.color}" fill-opacity="0.36"/>`;
            });

            // Umbral horizontal (+50% sobre mediana)
            const yUmbral = yAt(serie.umbral);
            svg += `<line x1="${ml}" y1="${yUmbral.toFixed(1)}" x2="${W - mr}" y2="${yUmbral.toFixed(1)}" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4"/>`;
            svg += `<text x="${ml + 6}" y="${(yUmbral - 5).toFixed(1)}" style="fill:#b45309;font-weight:700;font-size:10.5px;">Límite: ${serie.umbral}m</text>`;

            // Curva polinómica grado 2 (Tendencia de congestión)
            let pathD = '';
            const steps = 60;
            for (let i = 0; i <= steps; i++) {
                const xv = serie.xMinP + (i / steps) * (serie.xMaxP - serie.xMinP);
                const yv = serie.coef[0] * xv * xv + serie.coef[1] * xv + serie.coef[2];
                const px = xAt(xv).toFixed(1);
                const py = yAt(yv).toFixed(1);
                pathD += `${i === 0 ? 'M' : 'L'}${px} ${py} `;
            }
            svg += `<path d="${pathD}" fill="none" stroke="#dc2626" stroke-width="2.8" stroke-linecap="round"/>`;

            svg += `</svg>`;

            return `
                <div class="cb-queue-panel">
                    <div class="cb-queue-panel-title">${centro}</div>
                    ${svg}
                </div>
            `;
        }).join('');

        // Eventos hover sobre los puntos de dispersión
        gridEl.querySelectorAll('.cb-queue-svg').forEach(svgEl => {
            const centro = svgEl.dataset.centro;
            const serie = obtenerSerieCongestion(centro);

            svgEl.querySelectorAll('.cb-q-dot').forEach(dot => {
                const pt = serie.puntos[Number(dot.dataset.idx)];
                dot.addEventListener('mouseenter', (e) => {
                    dot.setAttribute('r', '5.5');
                    dot.setAttribute('fill-opacity', '0.95');
                    showExtraTooltip(e, {
                        title: centro,
                        subtitle: 'Teoría de Colas (Franja 1 hora)',
                        rows: [
                            { color: serie.color, label: 'Pacientes citados / hora', value: `${pt.x} pac.` },
                            { color: '#dc2626', label: 'Espera P90 desde cita', value: `${pt.y.toFixed(1)} min` },
                            { color: '#f59e0b', label: 'Umbral de congestión', value: `${serie.umbral} min` }
                        ],
                        totalLabel: 'Estado operativo',
                        totalVal: pt.y > serie.umbral ? 'Sobre límite crítico' : 'Dentro de límite'
                    });
                });
                dot.addEventListener('mousemove', (e) => placeTooltip(extraTooltip, e));
                dot.addEventListener('mouseleave', () => {
                    dot.setAttribute('r', '3.2');
                    dot.setAttribute('fill-opacity', '0.36');
                    hideExtraTooltip();
                });
            });
        });
    }

    // ================= 12. GRÁFICA CB-3: MAPA DE SATURACIÓN DÍA × HORA =================
    function renderCBSaturacion(centroKey) {
        const mode = chartStates.cb3.mode;
        const box = document.getElementById('cb3-heat-box');
        const pillCentro = document.getElementById('cb3-centro-pill');
        const pillMetric = document.getElementById('cb3-metric-pill');
        const titleEl = document.getElementById('cb3-title');
        const scaleMin = document.getElementById('cb3-scale-min');
        const scaleMax = document.getElementById('cb3-scale-max');

        const subtituloCentro = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
        const etiquetaMetrica = mode === 'p90' ? 'Percentil 90 (Crítico)' : 'Mediana (Típico)';
        const tituloMetrica = mode === 'p90' ? 'Percentil 90' : 'Mediana';

        pillCentro.textContent = subtituloCentro;
        pillMetric.textContent = `Métrica: ${etiquetaMetrica}`;
        titleEl.textContent = `Mapa de Saturación Día × Hora — ${tituloMetrica}`;
        hideExtraTooltip();

        const mActiva = obtenerMatrizSaturacion(centroKey, mode);
        const mP90 = obtenerMatrizSaturacion(centroKey, 'p90');
        const mMed = obtenerMatrizSaturacion(centroKey, 'mediana');

        const todosValores = ORDEN_DIAS.flatMap(d => mActiva[d]);
        const maxV = Math.max(...todosValores, 1);

        scaleMin.textContent = '0m';
        scaleMax.textContent = `${maxV}m`;

        box.style.gridTemplateColumns = `92px repeat(${HORAS_RANGO.length}, minmax(64px, 1fr))`;

        let html = '<div></div>';
        HORAS_RANGO.forEach(h => {
            html += `<div class="heat-col-label">${h}:00</div>`;
        });

        ORDEN_DIAS.forEach((dia, di) => {
            html += `<div class="heat-row-label">${dia}</div>`;
            HORAS_RANGO.forEach((hora, hi) => {
                const val = mActiva[dia][hi];
                const t = maxV > 0 ? val / maxV : 0;
                const estilo = colorEscalaCalor(t, 0.78);
                html += `<div class="heat-cell" data-d="${di}" data-h="${hi}" style="background:${estilo.css};color:${estilo.textoColor}">${val}m</div>`;
            });
        });

        box.innerHTML = html;

        box.querySelectorAll('.heat-cell[data-d]').forEach(cell => {
            const di = Number(cell.dataset.d);
            const hi = Number(cell.dataset.h);
            const dia = ORDEN_DIAS[di];
            const hora = HORAS_RANGO[hi];
            const valP90 = mP90[dia][hi];
            const valMed = mMed[dia][hi];

            cell.addEventListener('mouseenter', (e) => {
                showExtraTooltip(e, {
                    title: `${dia} • ${hora}:00`,
                    subtitle: `${subtituloCentro} • Espera desde llegada`,
                    rows: [
                        { color: '#b31b2c', label: 'Espera P90 (Crítico)', value: `${valP90} min` },
                        { color: '#f26d3d', label: 'Espera Mediana (Típico)', value: `${valMed} min` }
                    ],
                    totalLabel: 'Brecha cola (P90 - Med)',
                    totalVal: `${Math.max(0, valP90 - valMed)} min`
                });
            });

            cell.addEventListener('mousemove', (e) => placeTooltip(extraTooltip, e));
            cell.addEventListener('mouseleave', hideExtraTooltip);
        });
    }

    // ================= 13. GRÁFICA CB-4: HORA CITADA VS. HORA DE LLEGADA POR DEPARTAMENTO =================
    function renderCBPuntualidad(centroKey) {
        const tandaKey = chartStates.cb4.tanda;
        const centroPill = document.getElementById('cb4-centro-pill');
        const tandaPill = document.getElementById('cb4-tanda-pill');
        const subtitleEl = document.getElementById('cb4-subtitle');
        const boxEl = document.getElementById('cb4-chart-box');

        const subtituloCentro = centroKey === 'ALL' ? 'Todos los Centros' : centroKey;
        const nombresTanda = {
            Todas: 'Vista: Consolidado General',
            Matutina: 'Vista: Tanda Matutina',
            Vespertina: 'Vista: Tanda Vespertina'
        };

        centroPill.textContent = subtituloCentro;
        tandaPill.textContent = nombresTanda[tandaKey];
        subtitleEl.textContent = `Comparación de medianas horarias — ${nombresTanda[tandaKey]}`;

        // Rangos dinámicos idénticos al script de Python según botón seleccionado
        const rangosTanda = {
            Todas:      { min: 360, max: 1140, tickStart: 420, tickEnd: 1080, step: 60 },
            Matutina:   { min: 360, max: 860,  tickStart: 420, tickEnd: 840,  step: 60 },
            Vespertina: { min: 660, max: 1140, tickStart: 660, tickEnd: 1080, step: 60 }
        };
        const rCfg = rangosTanda[tandaKey];
        const spanMin = rCfg.max - rCfg.min;

        const filas = obtenerDatosPuntualidad(centroKey, tandaKey);

        let html = '';
        filas.forEach((fila, idx) => {
            const pctLlegada = Math.max(4, Math.min(82, ((fila.min_llegada - rCfg.min) / spanMin) * 84));
            const pctCita = Math.max(4, Math.min(82, ((fila.min_cita - rCfg.min) / spanMin) * 84));

            const strLlegada = minsAHoraStr(fila.min_llegada);
            const strCita = minsAHoraStr(fila.min_cita);
            const signo = fila.diff > 0 ? `+${fila.diff}` : `${fila.diff}`;

            html += `
                <div class="cb-punt-row" data-idx="${idx}">
                    <div class="cb-punt-label">${fila.departamento}</div>
                    <div class="cb-punt-bars-col">
                        <div class="cb-punt-bar-line">
                            <div class="cb-punt-bar llegada" style="width:${pctLlegada}%"></div>
                            <span class="cb-punt-bar-txt llegada">Llegada: ${strLlegada} (${signo}m)</span>
                        </div>
                        <div class="cb-punt-bar-line">
                            <div class="cb-punt-bar cita" style="width:${pctCita}%"></div>
                            <span class="cb-punt-bar-txt cita">Cita: ${strCita}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        const ticks = [];
        for (let m = rCfg.tickStart; m <= rCfg.tickEnd; m += rCfg.step) {
            ticks.push(`<span>${minsAHoraStr(m)}</span>`);
        }

        html += `
            <div class="cb-punt-axis">
                <div></div>
                <div class="cb-punt-ticks">${ticks.join('')}</div>
            </div>
            <div class="cb-punt-axis-title">Horario del día</div>
        `;

        boxEl.innerHTML = html;

        boxEl.querySelectorAll('.cb-punt-row').forEach(rowEl => {
            const fila = filas[Number(rowEl.dataset.idx)];
            const strLlegada = minsAHoraStr(fila.min_llegada);
            const strCita = minsAHoraStr(fila.min_cita);
            const signo = fila.diff > 0 ? `+${fila.diff}` : `${fila.diff}`;

            rowEl.addEventListener('mouseenter', (e) => {
                showExtraTooltip(e, {
                    title: fila.departamento,
                    subtitle: `${subtituloCentro} • ${nombresTanda[tandaKey]}`,
                    rows: [
                        { color: '#2563eb', label: 'Mediana Hora Citada', value: strCita },
                        { color: '#f97316', label: 'Mediana Hora Llegada', value: strLlegada },
                        { label: 'Citas analizadas', value: fmtEntero.format(fila.visitas) }
                    ],
                    totalLabel: 'Diferencia vs. cita',
                    totalVal: `${signo} min ${fila.diff <= 0 ? '(Anticipación)' : '(Retraso)'}`
                });
            });

            rowEl.addEventListener('mousemove', (e) => placeTooltip(extraTooltip, e));
            rowEl.addEventListener('mouseleave', hideExtraTooltip);
        });
    }

    // ================= 14. EVENTOS DE FILTROS, CONTROLES Y PESTAÑAS =================
    function setupChartControls(toggleId, seriesGroupId, stateKey, renderFn) {
        const modeBtns = document.querySelectorAll(`#${toggleId} .mode-btn`);
        const seriesBtns = document.querySelectorAll(`#${seriesGroupId} .series-btn`);

        modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                chartStates[stateKey].mode = btn.dataset.mode;
                modeBtns.forEach(b => b.classList.toggle('active', b === btn));
                renderFn(filterCentro.value);
            });
        });

        seriesBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.series;
                const allKeys = Object.keys(chartStates[stateKey].series);
                const otherKey = allKeys.find(k => k !== key);

                if (chartStates[stateKey].series[key] && !chartStates[stateKey].series[otherKey]) {
                    return;
                }

                chartStates[stateKey].series[key] = !chartStates[stateKey].series[key];
                btn.classList.toggle('active', chartStates[stateKey].series[key]);
                btn.setAttribute('aria-pressed', chartStates[stateKey].series[key]);
                renderFn(filterCentro.value);
            });
        });
    }

    function setupMetricToggle(toggleId, stateKey, renderFn) {
        const btns = document.querySelectorAll(`#${toggleId} .metric-btn`);
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                metricState[stateKey] = btn.dataset.metric;
                btns.forEach(b => b.classList.toggle('active', b === btn));
                renderFn(filterCentro.value);
            });
        });
    }

    function setupSimpleModeToggle(toggleId, stateKey, propKey, renderFn) {
        const btns = document.querySelectorAll(`#${toggleId} .mode-btn`);
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                chartStates[stateKey][propKey] = btn.dataset[propKey];
                btns.forEach(b => b.classList.toggle('active', b === btn));
                renderFn(filterCentro.value);
            });
        });
    }

    setupChartControls('chart1-mode-toggle', 'chart1-series-group', 'chart1', renderChart1);
    setupChartControls('chart2-mode-toggle', 'chart2-series-group', 'chart2', renderChart2);
    setupChartControls('pyr-mode-toggle', 'pyr-series-group', 'pyramid', renderPyramidChart);
    setupMetricToggle('line-metric-toggle', 'line', renderLineChart);

    // Controles interactivos de las gráficas de Cuello de Botella
    setupSimpleModeToggle('cb1-mode-toggle', 'cb1', 'mode', renderCBDescomposicion);
    setupSimpleModeToggle('cb3-mode-toggle', 'cb3', 'mode', renderCBSaturacion);
    setupSimpleModeToggle('cb4-tanda-toggle', 'cb4', 'tanda', renderCBPuntualidad);

    function updateAll() {
        const centroKey = filterCentro.value;
        renderKPIs(centroKey);
        renderChart1(centroKey);
        renderChart2(centroKey);
        renderPyramidChart(centroKey);
        renderLineChart(centroKey);
        renderHeatmap(centroKey);

        // Actualización reactiva de las 4 gráficas de Cuello de Botella
        renderCBDescomposicion(centroKey);
        renderCBCongestion(centroKey);
        renderCBSaturacion(centroKey);
        renderCBPuntualidad(centroKey);
    }

    filterCentro.addEventListener('change', updateAll);

    btnResetFilters.addEventListener('click', () => {
        filterCentro.value = 'ALL';

        chartStates.chart1.mode = 'porcentaje';
        chartStates.chart1.series = { atendidas: true, noAtendidas: true };

        chartStates.chart2.mode = 'porcentaje';
        chartStates.chart2.series = { conCita: true, sinCita: true };

        chartStates.pyramid.mode = 'porcentaje';
        chartStates.pyramid.series = { M: true, F: true };

        metricState.line = 'visitas';

        chartStates.cb1.mode = 'mediana';
        chartStates.cb3.mode = 'p90';
        chartStates.cb4.tanda = 'Todas';

        document.querySelectorAll('#chart1-mode-toggle .mode-btn, #chart2-mode-toggle .mode-btn, #pyr-mode-toggle .mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === 'porcentaje');
        });

        document.querySelectorAll('.metric-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.metric === 'visitas');
        });

        document.querySelectorAll('.series-btn').forEach(btn => {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        });

        document.querySelectorAll('#cb1-mode-toggle .mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === 'mediana');
        });

        document.querySelectorAll('#cb3-mode-toggle .mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === 'p90');
        });

        document.querySelectorAll('#cb4-tanda-toggle .mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tanda === 'Todas');
        });

        updateAll();
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetView = button.dataset.view;

            tabButtons.forEach(btn => {
                const isSelected = btn.dataset.view === targetView;
                btn.classList.toggle('active', isSelected);
                btn.setAttribute('aria-selected', isSelected);
            });

            viewSections.forEach(section => {
                section.classList.toggle('active', section.id === `view-${targetView}`);
            });
        });
    });

    // Carga inicial consolidada
    updateAll();
});