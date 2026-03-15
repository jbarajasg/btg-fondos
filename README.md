# BTG Fondos

Aplicación web interactiva para la gestión de fondos de inversión (FPV/FIC) de BTG Pactual. Permite al usuario visualizar fondos disponibles, suscribirse, cancelar su participación y consultar el historial de transacciones.

## 🚀 Tecnologías

| Tecnología       | Versión | Uso                                   |
| ---------------- | ------- | ------------------------------------- |
| **Angular**      | 21.x    | Framework principal                   |
| **TypeScript**   | 5.x     | Tipado estático                       |
| **Tailwind CSS** | v4      | Estilos y diseño responsivo           |
| **Jest**         | 29.x    | Pruebas unitarias                     |
| **RxJS**         | 7.x     | Programación reactiva con Observables |

## 🏗️ Arquitectura

El proyecto implementa la arquitectura **Core / Shared / Feature** recomendada.

```
src/app/
├── core/                    ← Infraestructura singleton
│   ├── interceptors/        ← Interceptor HTTP global
│   ├── services/            ← UserService, FundService
│   ├── models/              ← Interfaces TypeScript
│   └── mocks/               ← Datos simulados
├── shared/                  ← Reutilizable entre features
│   ├── components/          ← Navbar.
│   └── pipes/               ← CopCurrencyPipe
└── features/                ← Módulos lazy por dominio
    ├── funds/               ← Lista y suscripción de fondos
    ├── portfolio/           ← Fondos activos del usuario
    ├── transactions/        ← Historial de movimientos
```

## Funcionalidades

- Visualizar la lista de los 5 fondos disponibles
- Suscribirse a un fondo si cumple con el monto mínimo
- Cancelar la participación en un fondo
- Ver el saldo actualizado en tiempo real
- Seleccionar método de notificación (email o SMS)
- Historial completo de transacciones
- Mensajes de error si no hay saldo suficiente

## 📦 Requisitos previos

Antes de instalar el proyecto asegúrate de tener:

- **Node.js** v18 o superior → [descargar](https://nodejs.org)
- **Angular CLI** v21

```bash
npm install -g @angular/cli
```

---

## ⚙️ Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/jbarajasg/btg-fondos.git
cd btg-fondos

# 2. Instalar dependencias
npm install
```

---

## ▶️ Correr el proyecto

```bash
ng serve
```

La aplicación estará disponible en:

```
http://localhost:4200
```

> Para correr en un puerto diferente:
>
> ```bash
> ng serve --port 3000
> ```

---

## Pruebas unitarias

El proyecto usa **Jest** como framework de pruebas.

```bash
# Correr todos los tests
npm test

# Ver reporte de cobertura
npm run test:coverage
```
