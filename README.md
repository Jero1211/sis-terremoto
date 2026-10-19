# SIS-TERREMOTO | Sistema de Control de Evacuación y Triaje de Emergencia

> **Proyecto Académico & Práctico:** Ingeniería de Software / Informática II  
> **Docente Evaluador:** Prof. Feibert Guzmán  
> **Institución:** Corporación Universitaria Lasallista (UniLasallista)  
> **Versión:** v1.5 (Edición Táctica Resiliente Offline)  
> **Desarrollado por:** Jero — Estudiante de 6.º semestre de Ingeniería de Software  

![Estado](https://img.shields.io/badge/Estado-Operativo%20Offline-emerald?style=flat-square)
![Docente](https://img.shields.io/badge/Docente-Prof.%20Feibert%20Guzm%C3%A1n-blue?style=flat-square)
![Institución](https://img.shields.io/badge/UniLasallista-Medell%C3%ADn-purple?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=flat-square&logo=javascript)
![Offline](https://img.shields.io/badge/Resiliencia-100%25%20Offline-green?style=flat-square)

---

## 📌 1. Nombre del Proyecto
**SIS-TERREMOTO** *(Sistema de Información Sísmica, Pase de Asistencia Táctico y Triaje de Emergencia)*.

---

## 📖 2. Descripción General
**SIS-TERREMOTO** es una solución de software táctica de respuesta rápida diseñada para gestionar el **censo, pase de lista en tiempo real, georreferenciación de personas y triaje médico START** de estudiantes, docentes y personal administrativo durante simulacros o situaciones reales de terremoto/sismo.

El sistema está concebido bajo el principio de **resiliencia total offline**: ante el colapso de redes eléctricas, torres celulares o servicio de Internet durante una catástrofe, la plataforma opera de manera 100% autónoma en cualquier dispositivo (computadoras portátiles, tablets o celulares), garantizando que las brigadas y docentes clasifiquen a las personas a salvo, identifiquen a los heridos y entreguen coordenadas exactas de las personas atrapadas a los cuerpos de socorro (Bomberos, Cruz Roja, Defensa Civil).

---

## ⚠️ 3. Problema que Resuelve
Durante un movimiento telúrico en campus universitarios e instituciones educativas se presentan fallas críticas en los protocolos tradicionales de evacuación:
1. **Listas en Papel Ineficientes y Vulnerables:** Las planillas físicas se mojan, se destruyen o se quedan dentro de las aulas colapsadas al momento de evacuar.
2. **Caída de Conectividad e Infraestructura:** Las plataformas web convencionales en la nube quedan inaccesibles cuando fallan los routers, módems o torres de telefonía.
3. **Dispersión de la Población:** Al sonar la alarma, muchos estudiantes no se encuentran en sus aulas de origen (están en cafeterías, laboratorios, baños o pasillos), lo que genera incertidumbre sobre su paradero.
4. **Falta de Triaje Médico Inmediato:** No existe un registro estandarizado que clasifique a los heridos según su gravedad ni que informe al Centro de Operaciones de Emergencia (COE) quiénes requieren rescate urgente.
5. **Retraso en la Consolidación de Reportes:** Consolidar manualmente los datos de decenas de grupos demora horas valiosas para los equipos de rescate.

---

## 🎯 4. Objetivos

### 4.1. Objetivo General
Diseñar e implementar un sistema web resiliente que funcione de forma 100% autónoma y offline para el registro, conteo y clasificación médica (triaje START) de la comunidad universitaria durante y después de un sismo.

### 4.2. Objetivos Específicos
- Permitir la carga ágil de listados académicos mediante planillas estándar de **Excel (.xlsx)**.
- Proveer un buscador predictivo y escáner rápido por número de documento o código estudiantil.
- Integrar la metodología de triaje médico **START** (Verde / Leve, Amarillo / Moderado, Rojo / Inmediato, Negro / Fallecido).
- Generar exportaciones automáticas en múltiples formatos: **Excel oficial multi-hoja (.xlsx)**, **CSV**, **JSON estructurado** y scripts de base de datos **SQL (DDL/DML)**.
- Facilitar el despliegue tanto en red local cableada/WiFi como a través de túnel seguro con Cloudflare Tunnel para brigadistas móviles.

---

## 🛠️ 5. Stack Tecnológico

| Capa / Componente | Tecnología |
| :--- | :--- |
| **Frontend** | HTML5 Semántico, CSS3 Puro con tema oscuro táctico, JavaScript Vanilla (ES6+) |
| **Procesamiento Excel** | SheetJS (`xlsx.full.min.js`) local sin CDN |
| **Almacenamiento Local** | LocalStorage API del navegador (persistencia sin base de datos externa) |
| **Alertas Sonoras** | Web Audio API (síntesis de sirenas y tonos de emergencia sin archivos mp3 externos) |
| **Servidor Local** | Node.js (`server.js`) con HTTP nativo |
| **Acceso Móvil Remoto** | Cloudflare Tunnel (`cloudflared`) |

---

## 📁 6. Estructura del Repositorio

```text
├── assets/
│   └── logo_unilasallista.png          # Escudo e identidad institucional
├── css/
│   └── styles.css                      # Interfaz táctica de alto contraste y reglas de impresión
├── js/
│   ├── app.js                          # Lógica del censo, triaje START y Web Audio
│   └── excel-handler.js                # Lector, validador y exportador de Excel/CSV/JSON/SQL
├── index.html                          # Tablero táctico principal del Centro de Operaciones
├── server.js                           # Servidor HTTP ligero en Node.js
├── iniciar_servidor_local.bat          # Script de arranque en 1 clic para Windows
├── iniciar_con_tunel_cloudflare.bat    # Script de arranque con túnel público seguro
└── README.md                           # Documentación completa del proyecto
```

---

## 🚀 7. Modos de Ejecución

### Opción A: Despliegue Local Autónomo (Recomendado en Emergencias Offline)
Haz doble clic en el archivo:
```cmd
iniciar_servidor_local.bat
```
El script iniciará el servidor en el puerto 3000 y abrirá automáticamente tu navegador web en `http://localhost:3000`.

### Opción B: Despliegue Móvil con Cloudflare Tunnel
Haz doble clic en el archivo:
```cmd
iniciar_con_tunel_cloudflare.bat
```
El script creará un enlace HTTPS público temporal para que los brigadistas puedan acceder desde sus celulares sin configuración compleja de red.

---

## 👨‍💻 Créditos y Autoría
- **Autor:** Jero — Estudiante de 6.º semestre de Ingeniería de Software.
- **GitHub:** [@Jero1211](https://github.com/Jero1211)
- **Asignatura:** Informática II / Ingeniería de Software.
- **Docente:** Prof. Feibert Guzmán.
- **Institución:** Corporación Universitaria Lasallista (UniLasallista).
