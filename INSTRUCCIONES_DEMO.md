# 🚀 Cómo Ver la Aplicación Funcionando

## 📋 **Pasos Simples:**

### 1️⃣ **Abrir la Demo:**
- Busca el archivo `demo.html` en tu directorio
- Haz **doble click** en él
- Se abrirá automáticamente en tu navegador

### 2️⃣ **Probar las Funcionalidades:**

#### ✅ **Lógica Progresiva:**
1. Escribe un cliente (ej: "Juan")
2. Selecciona **OPERACIÓN** → `💱 TRANSACCIONES`
3. Selecciona **DETALLE OPERACIÓN** → `COMPRA`
4. ¡Observa cómo aparecen los campos dinámicamente!

#### ✅ **Labels Dinámicos:**
- **COMPRA**: Los labels dicen "INGRESO" y "EGRESO"
- **VENTA**: Los labels se invierten automáticamente
- **ARBITRAJE**: Muestra secciones separadas de COMPRA y VENTA

#### ✅ **Cálculos Automáticos:**
1. En **COMPRA/VENTA**: Llena MONTO y TC
2. El TOTAL se calcula automáticamente (Monto × TC)
3. En **ARBITRAJE**: La comisión se calcula automáticamente

#### ✅ **Autocompletado de Clientes:**
1. Escribe "Juan" en el campo cliente
2. Aparecerán sugerencias automáticamente
3. Haz click en cualquier sugerencia

## 🎯 **Funcionalidades Implementadas:**

### **Campos Base (siempre visibles):**
- ✅ Cliente con autocompletado
- ✅ Fecha con día de la semana
- ✅ Detalle opcional
- ✅ Operación

### **Operaciones Disponibles:**
- ✅ **TRANSACCIONES** (COMPRA, VENTA, ARBITRAJE)
- ✅ **CUENTAS_CORRIENTES** (ALL, ME, SS, AL)  
- ✅ **SOCIOS** (Ingreso, Salida, Préstamo, Devolución)
- ✅ **ADMINISTRATIVAS** (Ajustes, Gastos)
- ✅ **PRESTAMISTAS** (Préstamo, Retiro)

### **Características Especiales:**
- ✅ **Cálculos automáticos** en tiempo real
- ✅ **Labels dinámicos** según tipo de operación
- ✅ **Formato de monedas** con símbolos
- ✅ **Guardar borradores** para operaciones incompletas
- ✅ **Panel lateral** con resumen en tiempo real
- ✅ **Animaciones** y efectos visuales
- ✅ **Responsive design** (funciona en móvil y desktop)

## 🧪 **Prueba Estas Operaciones:**

### **Ejemplo 1: COMPRA Simple**
1. Cliente: "María García"
2. Operación: TRANSACCIONES → COMPRA
3. Monto: 100 (INGRESO)
4. Moneda: USD
5. TC: 1000
6. Moneda TC: PESO
7. ¡Verás el total calculado automáticamente!

### **Ejemplo 2: ARBITRAJE**
1. Cliente: "Carlos López"  
2. Operación: TRANSACCIONES → ARBITRAJE
3. COMPRA: Monto 100, TC 1000
4. VENTA: Monto 100, TC 1050
5. ¡La comisión se calcula automáticamente!

### **Ejemplo 3: SOCIOS**
1. Cliente: "Pedro Rodriguez"
2. Operación: SOCIOS → Ingreso
3. Monto: 5000
4. Moneda: PESO
5. Cuenta: Efectivo

## 💡 **Tips:**
- Los campos aparecen **progresivamente** según lo que selecciones
- Los **totales se calculan solos** - no los toques!
- Usa **"Guardar Borrador"** si no terminaste la operación
- El **panel lateral** muestra estadísticas en tiempo real
- La aplicación **guarda todo en memoria** (se pierde al refrescar)

## 🎨 **Características de la Demo:**
- **Diseño profesional** con gradientes y animaciones
- **Totalmente funcional** - todos los cálculos funcionan
- **Sin dependencias** - solo abrir el archivo HTML
- **Responsive** - funciona en cualquier pantalla
- **Datos simulados** - usa una base de datos falsa

---

## 🔥 **¡A Probarlo!**

**Simplemente abre `demo.html` en tu navegador y empieza a probar la aplicación.**

La aplicación está **100% funcional** y muestra exactamente cómo funcionará en producción.