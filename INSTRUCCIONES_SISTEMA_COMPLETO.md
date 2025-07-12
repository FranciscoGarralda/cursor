# 🏢 Alliance F&R - Sistema Integral de Operaciones

## 📋 Descripción General

**Alliance F&R** es un sistema integral que combina tres módulos principales:

1. **🏠 Menú Principal** - Navegación central del sistema
2. **💰 Sistema de Operaciones** - Gestión de transacciones financieras
3. **👥 Sistema de Clientes** - Gestión completa de clientes con analytics

---

## 🚀 Acceso al Sistema

### Opción 1: Archivo Local
```bash
# Abre directamente el archivo en tu navegador
open demo-completo.html
```

### Opción 2: Servidor Local
```bash
# Usando Python (recomendado)
python -m http.server 8080
# Luego abre: http://localhost:8080/demo-completo.html
```

---

## 📱 Funcionalidades del Sistema

### 🏠 **MENÚ PRINCIPAL**

**Layout:** Grid 3x3 + 1 elemento centrado
- **Botones coloridos** con efectos hover
- **Navegación fluida** entre secciones
- **Feedback visual** al seleccionar opciones

#### Opciones Disponibles:
1. **➕ Nuevo Movimiento** → Abre sistema de operaciones
2. **💼 Saldos** → Próximamente
3. **📋 Movimientos** → Próximamente  
4. **🏢 Cuentas Corrientes** → Próximamente
5. **🔄 Arbitraje** → Próximamente
6. **📈 Utilidad** → Próximamente
7. **💰 Comisiones** → Próximamente
8. **💳 Prestamistas** → Próximamente
9. **🧾 Gastos** → Próximamente
10. **👥 Clientes** → Abre sistema de clientes

---

### 💰 **SISTEMA DE OPERACIONES**

#### 🔹 **Características Principales:**
- **Autocompletado de clientes** mientras escribes
- **Lógica progresiva** - campos aparecen según selección
- **Cálculos automáticos** para transacciones
- **Validación en tiempo real**
- **Resumen en tiempo real**

#### 🔹 **Tipos de Operaciones:**

**1. 💱 TRANSACCIONES**
- **COMPRA**: Monto (INGRESO) → Total (EGRESO)
- **VENTA**: Monto (EGRESO) → Total (INGRESO)
- **ARBITRAJE**: Operación de arbitraje

**2. 🤝 CUENTAS CORRIENTES**
- **ALL**: Todas las cuentas
- **ME**: Cuenta propia
- **SS**: Cuenta SS
- **AL**: Cuenta AL

**3. 👥 SOCIOS**
- **Ingreso**: Ingreso de socio
- **Salida**: Salida de socio
- **Prestamo**: Préstamo a socio
- **Devolución**: Devolución de socio

#### 🔹 **Campos Dinámicos:**
- **Cliente**: Autocompletado con base de datos
- **Fecha**: Selector con día de la semana
- **Operación**: Dropdown con iconos
- **Detalle**: Aparece según operación seleccionada
- **Moneda**: 🇦🇷 PESO, 💵 USD, 🇪🇺 EURO, ₿ USDT
- **TC**: Tipo de cambio
- **Total**: Calculado automáticamente (monto × TC)

#### 🔹 **Panel Lateral:**
- **📊 Resumen**: Contador de operaciones
- **📋 Recientes**: Últimas 3 operaciones guardadas

---

### 👥 **SISTEMA DE CLIENTES**

#### 🔹 **Lista de Clientes:**
- **🔍 Búsqueda**: Por nombre, teléfono o DNI
- **Estados automáticos**: Activo, Contactar pronto, Contactar urgente
- **Información completa**: Teléfono, DNI, dirección
- **Estadísticas**: Frecuencia de operaciones, total de operaciones

#### 🔹 **Estados de Contacto Automáticos:**
- **🟢 Activo**: Cliente operando normalmente
- **🟡 Contactar pronto**: Supera su frecuencia normal
- **🔴 Contactar urgente**: Inactivo por mucho tiempo

#### 🔹 **Cálculos Automáticos:**
- **Frecuencia de operaciones**: Días promedio entre operaciones
- **Días desde última operación**: Contador automático
- **Recomendaciones**: Basadas en patrones históricos

#### 🔹 **Funcionalidades:**
- **➕ Crear cliente**: Formulario completo
- **✏️ Editar cliente**: Modificar información
- **🗑️ Eliminar cliente**: Con confirmación
- **📊 Analytics**: Estadísticas detalladas (pendiente)

---

## 🎯 **Flujo de Trabajo Típico**

### 1. **📝 Crear Nueva Operación**
```
Menu Principal → Nuevo Movimiento → Completar formulario → Guardar
```

### 2. **👤 Gestionar Clientes**
```
Menu Principal → Clientes → Ver lista → Crear/Editar/Eliminar
```

### 3. **🔍 Buscar Cliente**
```
Sistema Clientes → Buscar por nombre/teléfono/DNI
```

### 4. **📈 Ver Estado de Clientes**
```
Sistema Clientes → Ver estados automáticos (colores)
```

---

## 💡 **Funcionalidades Avanzadas**

### 🔄 **Autocompletado Inteligente**
- Mientras escribes el nombre del cliente
- Filtra en tiempo real
- Selección con click o Enter

### 🧮 **Cálculos Automáticos**
- **Transacciones**: Monto × TC = Total
- **Etiquetas dinámicas**: INGRESO/EGRESO según tipo
- **Validación**: Campos obligatorios

### 📊 **Analytics de Clientes**
- **Frecuencia**: Días promedio entre operaciones
- **Estado**: Basado en última operación vs frecuencia
- **Recomendaciones**: Cuándo contactar

### 🎨 **Interfaz Moderna**
- **Diseño responsive**: Funciona en móvil y desktop
- **Animaciones suaves**: Transiciones fluidas
- **Feedback visual**: Confirmaciones y estados
- **Colores intuitivos**: Verde (activo), Amarillo (alerta), Rojo (urgente)

---

## 🔧 **Configuración Técnica**

### 📦 **Dependencias**
- **React 18**: Framework principal
- **Tailwind CSS**: Estilos
- **Iconos SVG**: Componentes customizados
- **Sin backend**: Funciona totalmente en frontend

### 💾 **Almacenamiento**
- **Estado local**: Datos se mantienen durante la sesión
- **Clientes predefinidos**: Juan Pérez, María González
- **Operaciones**: Se guardan en memoria

### 🎯 **Compatibilidad**
- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, tablet, móvil
- **Responsive**: Adapta a diferentes tamaños

---

## 🔮 **Próximas Funcionalidades**

### 📋 **Pendientes de Implementar**
- **Saldos**: Consulta de saldos por moneda
- **Movimientos**: Historial de operaciones
- **Cuentas Corrientes**: Gestión de cuentas
- **Reportes**: Generación de informes
- **Exportación**: PDF, Excel
- **Backup**: Guardar/restaurar datos

### 🚀 **Mejoras Planificadas**
- **Base de datos real**: Persistencia
- **Autenticación**: Login/logout
- **Permisos**: Diferentes niveles de acceso
- **Notificaciones**: Alertas automáticas
- **Dashboard**: Métricas principales

---

## 📞 **Soporte y Contacto**

### 🔧 **Problemas Comunes**
1. **No carga**: Verificar conexión a internet para CDN
2. **Lento**: Usar servidor local en lugar de archivo directo
3. **Errores**: Actualizar navegador

### 💬 **Feedback**
- El sistema está en desarrollo continuo
- Sugerencias y mejoras son bienvenidas
- Reportar bugs para pronta solución

---

## 🏆 **Características Destacadas**

### ✅ **Completado**
- ✅ Navegación fluida entre módulos
- ✅ Sistema de operaciones completo
- ✅ Gestión de clientes con analytics
- ✅ Autocompletado inteligente
- ✅ Cálculos automáticos
- ✅ Estados de contacto automáticos
- ✅ Interfaz moderna y responsive
- ✅ Validaciones en tiempo real

### 🔄 **En Desarrollo**
- 🔄 Módulos adicionales del menú
- 🔄 Persistencia de datos
- 🔄 Analytics avanzados
- 🔄 Reportes y exportación

---

**🎯 ¡El sistema está listo para usar y será tu herramienta perfecta para gestionar operaciones financieras y clientes de manera eficiente!**