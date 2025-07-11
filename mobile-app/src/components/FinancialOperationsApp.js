import React, { useState, useEffect } from 'react';
import { DollarSign, Check, AlertCircle, Calendar, Search } from 'lucide-react';

const FinancialOperationsApp = () => {
  // Base de datos simulada de clientes
  const clientesDB = [
    'Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez',
    'Pedro Rodriguez', 'Laura Fernández', 'Diego Sánchez', 'Sofía González',
    'Miguel Torres', 'Carmen Ruiz', 'Jorge Herrera', 'Valentina Silva'
  ];

  const monedas = [
    { value: '', label: 'Seleccionar moneda' },
    { value: 'PESO', label: '🇦🇷 PESO' },
    { value: 'USD', label: '💵 USD' },
    { value: 'EURO', label: '🇪🇺 EURO' },
    { value: 'USDT', label: '₿ USDT' },
    { value: 'REAL', label: '🇧🇷 REAL' },
    { value: 'LIBRA', label: '🇬🇧 LIBRA' },
    { value: 'CL', label: '🇨🇱 CL' }
  ];

  const cuentas = [
    { value: '', label: 'Seleccionar cuenta' },
    { value: 'efectivo', label: 'Efectivo' },
    { value: 'bancaria_socio1', label: 'Cuenta Bancaria Socio1' },
    { value: 'bancaria_socio2', label: 'Cuenta Bancaria Socio2' },
    { value: 'bancaria_alliance', label: 'Cuenta Bancaria Alliance' },
    { value: 'usdt_socio1', label: 'Cuenta Socio1 (USDT)' },
    { value: 'usdt_socio2', label: 'Cuenta Socio2 (USDT)' },
    { value: 'cliente', label: 'Cliente' }
  ];

  const socios = [
    { value: '', label: 'Seleccionar quien realizó' },
    { value: 'socio1', label: 'Socio 1' },
    { value: 'socio2', label: 'Socio 2' },
    { value: 'otro', label: 'Otro' }
  ];

  const estados = [
    { value: '', label: 'Seleccionar estado' },
    { value: 'realizado', label: 'Realizado' },
    { value: 'pendiente', label: 'Pendiente' }
  ];

  const operaciones = {
    'TRANSACCIONES': { 
      icon: '💱', 
      subMenu: ['COMPRA', 'VENTA', 'ARBITRAJE'] 
    },
    'CUENTAS_CORRIENTES': { 
      icon: '🤝', 
      subMenu: ['ALL', 'ME', 'SS', 'AL'] 
    },
    'SOCIOS': { 
      icon: '👥', 
      subMenu: ['Ingreso', 'Salida', 'Prestamo', 'Devolución'] 
    },
    'ADMINISTRATIVAS': { 
      icon: '🔧', 
      subMenu: ['Ajustes', 'Gastos'] 
    },
    'PRESTAMISTAS': { 
      icon: '🏦', 
      subMenu: ['Prestamo', 'Retiro'] 
    }
  };

  const [formData, setFormData] = useState({
    // Campos base
    cliente: '',
    fecha: new Date().toISOString().split('T')[0],
    detalle: '',
    operacion: '',
    subOperacion: '',
    
    // Campos para transacciones
    monto: '',
    moneda: '',
    tc: '',
    monedaTC: '',
    cuenta: '',
    total: '',
    cuentaEgreso: '',
    pagoDiferido: false,
    montoDiferido: '',
    cuentaDiferida: '',
    
    // Campos para arbitraje
    montoCompra: '',
    monedaCompra: '',
    tcCompra: '',
    totalCompra: '',
    montoVenta: '',
    monedaVenta: '',
    tcVenta: '',
    totalVenta: '',
    comisionArbitraje: '',
    cuentaComision: '',
    
    // Campos para cuentas corrientes
    montoIngreso: '',
    monedaIngreso: '',
    cuentaIngreso: '',
    montoEgreso: '',
    monedaEgreso: '',
    cuentaEgresoCC: '',
    
    // Campos para socios
    montoSocio: '',
    monedaSocio: '',
    cuentaSocio: '',
    
    // Campos para administrativas
    montoAjuste: '',
    monedaAjuste: '',
    cuentaAjuste: '',
    motivoAjuste: '',
    
    // Campos para prestamistas
    montoPrestamista: '',
    monedaPrestamista: '',
    cuentaPrestamista: '',
    interesPorcentaje: '',
    lapsoPrestamo: '',
    
    // Campos comunes
    comision: '',
    monedaComision: '',
    estado: '',
    por: '',
    nombreOtro: '',
    
    // Estado del formulario
    borrador: false
  });

  const [clientesSugeridos, setClientesSugeridos] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [operacionesGuardadas, setOperacionesGuardadas] = useState([]);

  // Obtener el nombre del día
  const getNombreDia = (fecha) => {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date(fecha + 'T00:00:00');
    return dias[date.getDay()];
  };

  // Filtrar clientes mientras escribe
  const handleClienteChange = (value) => {
    setFormData(prev => ({ ...prev, cliente: value }));
    
    if (value.length > 0) {
      const sugerencias = clientesDB.filter(cliente => 
        cliente.toLowerCase().includes(value.toLowerCase())
      );
      setClientesSugeridos(sugerencias);
      setMostrarSugerencias(true);
    } else {
      setMostrarSugerencias(false);
    }
  };

  // Seleccionar cliente de las sugerencias
  const seleccionarCliente = (cliente) => {
    setFormData(prev => ({ ...prev, cliente }));
    setMostrarSugerencias(false);
  };

  // Calcular total para compra/venta
  useEffect(() => {
    if (formData.subOperacion === 'COMPRA' || formData.subOperacion === 'VENTA') {
      const monto = parseFloat(formData.monto) || 0;
      const tc = parseFloat(formData.tc) || 0;
      
      if (monto > 0 && tc > 0) {
        const total = (monto * tc).toFixed(2);
        setFormData(prev => ({ ...prev, total }));
      }
    }
  }, [formData.monto, formData.tc, formData.subOperacion]);

  // Calcular totales de arbitraje
  useEffect(() => {
    if (formData.subOperacion === 'ARBITRAJE') {
      // Total compra
      const montoCompra = parseFloat(formData.montoCompra) || 0;
      const tcCompra = parseFloat(formData.tcCompra) || 0;
      if (montoCompra > 0 && tcCompra > 0) {
        setFormData(prev => ({ ...prev, totalCompra: (montoCompra * tcCompra).toFixed(2) }));
      }
      
      // Total venta
      const montoVenta = parseFloat(formData.montoVenta) || 0;
      const tcVenta = parseFloat(formData.tcVenta) || 0;
      if (montoVenta > 0 && tcVenta > 0) {
        setFormData(prev => ({ ...prev, totalVenta: (montoVenta * tcVenta).toFixed(2) }));
      }
    }
  }, [formData.montoCompra, formData.tcCompra, formData.montoVenta, formData.tcVenta, formData.subOperacion]);

  // Calcular comisión para arbitraje
  useEffect(() => {
    if (formData.subOperacion === 'ARBITRAJE') {
      const totalCompra = parseFloat(formData.totalCompra) || 0;
      const totalVenta = parseFloat(formData.totalVenta) || 0;
      
      if (totalCompra > 0 && totalVenta > 0) {
        const comision = Math.abs(totalVenta - totalCompra).toFixed(2);
        setFormData(prev => ({ ...prev, comisionArbitraje: comision }));
      }
    }
  }, [formData.totalCompra, formData.totalVenta, formData.subOperacion]);

  const handleInputChange = (field, value) => {
    if (field === 'operacion') {
      setFormData(prev => ({
        ...prev,
        [field]: value,
        subOperacion: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const guardarBorrador = () => {
    const borrador = { ...formData, borrador: true, id: Date.now() };
    setOperacionesGuardadas(prev => [...prev, borrador]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const formatCurrency = (value, moneda) => {
    if (!value) return '';
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    const symbols = {
      'PESO': '$',
      'USD': 'US$',
      'EURO': '€',
      'USDT': '₿',
      'REAL': 'R$',
      'LIBRA': '£',
      'CL': 'CL$'
    };
    
    return `${symbols[moneda] || ''}${num.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de validación y guardado
    console.log('Guardando operación:', formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Función para determinar los labels dinámicos
  const getLabels = () => {
    if (formData.subOperacion === 'COMPRA') {
      return {
        montoLabel: 'MONTO (INGRESO)',
        totalLabel: 'TOTAL (EGRESO)',
        cuentaLabel: 'CUENTA (INGRESO)',
        cuentaEgresoLabel: 'CUENTA (EGRESO)',
        pagoDiferidoLabel: 'EGRESO'
      };
    } else if (formData.subOperacion === 'VENTA') {
      return {
        montoLabel: 'MONTO (EGRESO)',
        totalLabel: 'TOTAL (INGRESO)',
        cuentaLabel: 'CUENTA (EGRESO)',
        cuentaEgresoLabel: 'CUENTA (INGRESO)',
        pagoDiferidoLabel: 'INGRESO'
      };
    }
    return {
      montoLabel: 'MONTO',
      totalLabel: 'TOTAL',
      cuentaLabel: 'CUENTA',
      cuentaEgresoLabel: 'CUENTA',
      pagoDiferidoLabel: 'MONTO'
    };
  };

  const labels = getLabels();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-2">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">Operaciones Financieras</h1>
            </div>
            <div className="text-sm text-gray-600">
              {operacionesGuardadas.length} registradas
            </div>
          </div>
        </div>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-3 flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span className="text-sm">Operación guardada exitosamente</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-4">
          <div className="space-y-4">
            
            {/* CAMPOS BASE - SIEMPRE VISIBLES */}
            
            {/* CLIENTE con autocompletado */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">CLIENTE *</label>
              <input
                type="text"
                value={formData.cliente}
                onChange={(e) => handleClienteChange(e.target.value)}
                onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Buscar cliente..."
              />
              {mostrarSugerencias && clientesSugeridos.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto">
                  {clientesSugeridos.map((cliente, index) => (
                    <div
                      key={index}
                      onClick={() => seleccionarCliente(cliente)}
                      className="px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                    >
                      {cliente}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FECHA con día de la semana */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                FECHA * - {getNombreDia(formData.fecha)}
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => handleInputChange('fecha', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DETALLE (opcional) */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">DETALLE (opcional)</label>
              <input
                type="text"
                value={formData.detalle}
                onChange={(e) => handleInputChange('detalle', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción adicional..."
              />
            </div>

            {/* OPERACIÓN */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">OPERACIÓN *</label>
              <select
                value={formData.operacion}
                onChange={(e) => handleInputChange('operacion', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar operación</option>
                {Object.entries(operaciones).map(([key, op]) => (
                  <option key={key} value={key}>
                    {op.icon} {key.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* CAMPOS PROGRESIVOS SEGÚN OPERACIÓN */}
            
            {/* SUB-OPERACIÓN - Solo aparece si hay operación seleccionada */}
            {formData.operacion && operaciones[formData.operacion] && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">DETALLE OPERACIÓN *</label>
                <select
                  value={formData.subOperacion}
                  onChange={(e) => handleInputChange('subOperacion', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar detalle</option>
                  {operaciones[formData.operacion].subMenu.map(subOp => (
                    <option key={subOp} value={subOp}>
                      {subOp}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* TRANSACCIONES - COMPRA */}
            {formData.operacion === 'TRANSACCIONES' && formData.subOperacion === 'COMPRA' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">{labels.montoLabel} *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.monto}
                      onChange={(e) => handleInputChange('monto', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.moneda}
                      onChange={(e) => handleInputChange('moneda', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">TC *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.tc}
                      onChange={(e) => handleInputChange('tc', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tipo de cambio"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.monedaTC}
                      onChange={(e) => handleInputChange('monedaTC', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{labels.cuentaLabel} *</label>
                  <select
                    value={formData.cuenta}
                    onChange={(e) => handleInputChange('cuenta', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {labels.totalLabel} *
                    {formData.total && formData.monedaTC && (
                      <span className="ml-2 text-blue-600">
                        = {formatCurrency(formData.total, formData.monedaTC)}
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.total}
                    readOnly
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-blue-50"
                    placeholder="Calculado automáticamente"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{labels.cuentaEgresoLabel} *</label>
                  <select
                    value={formData.cuentaEgreso}
                    onChange={(e) => handleInputChange('cuentaEgreso', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pagoDiferido"
                    checked={formData.pagoDiferido}
                    onChange={(e) => handleInputChange('pagoDiferido', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="pagoDiferido" className="text-sm font-medium text-gray-700">
                    Pago con dos cuentas diferentes
                  </label>
                </div>

                {formData.pagoDiferido && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">MONTO ({labels.pagoDiferidoLabel}) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.montoDiferido}
                        onChange={(e) => handleInputChange('montoDiferido', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">CUENTA *</label>
                      <select
                        value={formData.cuentaDiferida}
                        onChange={(e) => handleInputChange('cuentaDiferida', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {cuentas.map(cuenta => (
                          <option key={cuenta.value} value={cuenta.value}>
                            {cuenta.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">ESTADO *</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {estados.map(estado => (
                        <option key={estado.value} value={estado.value}>
                          {estado.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">POR *</label>
                    <select
                      value={formData.por}
                      onChange={(e) => handleInputChange('por', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {socios.map(socio => (
                        <option key={socio.value} value={socio.value}>
                          {socio.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* TRANSACCIONES - VENTA */}
            {formData.operacion === 'TRANSACCIONES' && formData.subOperacion === 'VENTA' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">{labels.montoLabel} *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.monto}
                      onChange={(e) => handleInputChange('monto', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.moneda}
                      onChange={(e) => handleInputChange('moneda', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">TC *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.tc}
                      onChange={(e) => handleInputChange('tc', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tipo de cambio"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.monedaTC}
                      onChange={(e) => handleInputChange('monedaTC', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{labels.cuentaLabel} *</label>
                  <select
                    value={formData.cuenta}
                    onChange={(e) => handleInputChange('cuenta', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {labels.totalLabel} *
                    {formData.total && formData.monedaTC && (
                      <span className="ml-2 text-blue-600">
                        = {formatCurrency(formData.total, formData.monedaTC)}
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.total}
                    readOnly
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-blue-50"
                    placeholder="Calculado automáticamente"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">{labels.cuentaEgresoLabel} *</label>
                  <select
                    value={formData.cuentaEgreso}
                    onChange={(e) => handleInputChange('cuentaEgreso', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pagoDiferido"
                    checked={formData.pagoDiferido}
                    onChange={(e) => handleInputChange('pagoDiferido', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="pagoDiferido" className="text-sm font-medium text-gray-700">
                    Pago con dos cuentas diferentes
                  </label>
                </div>

                {formData.pagoDiferido && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">MONTO ({labels.pagoDiferidoLabel}) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.montoDiferido}
                        onChange={(e) => handleInputChange('montoDiferido', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">CUENTA *</label>
                      <select
                        value={formData.cuentaDiferida}
                        onChange={(e) => handleInputChange('cuentaDiferida', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {cuentas.map(cuenta => (
                          <option key={cuenta.value} value={cuenta.value}>
                            {cuenta.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">ESTADO *</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {estados.map(estado => (
                        <option key={estado.value} value={estado.value}>
                          {estado.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">POR *</label>
                    <select
                      value={formData.por}
                      onChange={(e) => handleInputChange('por', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {socios.map(socio => (
                        <option key={socio.value} value={socio.value}>
                          {socio.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* TRANSACCIONES - ARBITRAJE */}
            {formData.operacion === 'TRANSACCIONES' && formData.subOperacion === 'ARBITRAJE' && (
              <>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">COMPRA</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.montoCompra}
                        onChange={(e) => handleInputChange('montoCompra', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">TC</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.tcCompra}
                        onChange={(e) => handleInputChange('tcCompra', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">TOTAL</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.totalCompra}
                        readOnly
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-blue-50"
                        placeholder="Auto"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA</label>
                    <select
                      value={formData.monedaCompra}
                      onChange={(e) => handleInputChange('monedaCompra', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">VENTA</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.montoVenta}
                        onChange={(e) => handleInputChange('montoVenta', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">TC</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.tcVenta}
                        onChange={(e) => handleInputChange('tcVenta', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1 block">TOTAL</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.totalVenta}
                        readOnly
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-blue-50"
                        placeholder="Auto"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA</label>
                    <select
                      value={formData.monedaVenta}
                      onChange={(e) => handleInputChange('monedaVenta', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      COMISIÓN
                      {formData.comisionArbitraje && (
                        <span className="ml-2 text-green-600">
                          = {formatCurrency(formData.comisionArbitraje, formData.monedaCompra)}
                        </span>
                      )}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.comisionArbitraje}
                      readOnly
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-green-50"
                      placeholder="Calculado automáticamente"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">CUENTA COMISIÓN *</label>
                    <select
                      value={formData.cuentaComision}
                      onChange={(e) => handleInputChange('cuentaComision', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {cuentas.map(cuenta => (
                        <option key={cuenta.value} value={cuenta.value}>
                          {cuenta.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">ESTADO *</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {estados.map(estado => (
                        <option key={estado.value} value={estado.value}>
                          {estado.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">POR *</label>
                    <select
                      value={formData.por}
                      onChange={(e) => handleInputChange('por', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {socios.map(socio => (
                        <option key={socio.value} value={socio.value}>
                          {socio.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* CUENTAS CORRIENTES */}
            {formData.operacion === 'CUENTAS_CORRIENTES' && formData.subOperacion && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONTO INGRESO *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.montoIngreso}
                      onChange={(e) => handleInputChange('montoIngreso', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.monedaIngreso}
                      onChange={(e) => handleInputChange('monedaIngreso', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">CUENTA INGRESO *</label>
                  <select
                    value={formData.cuentaIngreso}
                    onChange={(e) => handleInputChange('cuentaIngreso', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONTO EGRESO *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.montoEgreso}
                      onChange={(e) => handleInputChange('montoEgreso', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.monedaEgreso}
                      onChange={(e) => handleInputChange('monedaEgreso', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">CUENTA EGRESO *</label>
                  <select
                    value={formData.cuentaEgresoCC}
                    onChange={(e) => handleInputChange('cuentaEgresoCC', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">COMISIÓN</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.comision}
                      onChange={(e) => handleInputChange('comision', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA</label>
                    <select
                      value={formData.monedaComision}
                      onChange={(e) => handleInputChange('monedaComision', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">ESTADO *</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {estados.map(estado => (
                        <option key={estado.value} value={estado.value}>
                          {estado.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">POR *</label>
                    <select
                      value={formData.por}
                      onChange={(e) => handleInputChange('por', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {socios.map(socio => (
                        <option key={socio.value} value={socio.value}>
                          {socio.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* SOCIOS */}
            {formData.operacion === 'SOCIOS' && formData.subOperacion && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONTO *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.montoSocio}
                      onChange={(e) => handleInputChange('montoSocio', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.monedaSocio}
                      onChange={(e) => handleInputChange('monedaSocio', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">CUENTA *</label>
                  <select
                    value={formData.cuentaSocio}
                    onChange={(e) => handleInputChange('cuentaSocio', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">ESTADO *</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {estados.map(estado => (
                        <option key={estado.value} value={estado.value}>
                          {estado.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">POR *</label>
                    <select
                      value={formData.por}
                      onChange={(e) => handleInputChange('por', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {socios.map(socio => (
                        <option key={socio.value} value={socio.value}>
                          {socio.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* ADMINISTRATIVAS */}
            {formData.operacion === 'ADMINISTRATIVAS' && formData.subOperacion && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONTO *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.montoAjuste}
                      onChange={(e) => handleInputChange('montoAjuste', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Positivo o negativo"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.monedaAjuste}
                      onChange={(e) => handleInputChange('monedaAjuste', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">CUENTA *</label>
                  <select
                    value={formData.cuentaAjuste}
                    onChange={(e) => handleInputChange('cuentaAjuste', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">MOTIVO *</label>
                  <input
                    type="text"
                    value={formData.motivoAjuste}
                    onChange={(e) => handleInputChange('motivoAjuste', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Explicar por qué se hace el ajuste"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">ESTADO *</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {estados.map(estado => (
                        <option key={estado.value} value={estado.value}>
                          {estado.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">POR *</label>
                    <select
                      value={formData.por}
                      onChange={(e) => handleInputChange('por', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {socios.map(socio => (
                        <option key={socio.value} value={socio.value}>
                          {socio.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* PRESTAMISTAS */}
            {formData.operacion === 'PRESTAMISTAS' && formData.subOperacion && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONTO *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.montoPrestamista}
                      onChange={(e) => handleInputChange('montoPrestamista', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">MONEDA *</label>
                    <select
                      value={formData.monedaPrestamista}
                      onChange={(e) => handleInputChange('monedaPrestamista', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {monedas.map(moneda => (
                        <option key={moneda.value} value={moneda.value}>
                          {moneda.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">CUENTA *</label>
                  <select
                    value={formData.cuentaPrestamista}
                    onChange={(e) => handleInputChange('cuentaPrestamista', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cuentas.map(cuenta => (
                      <option key={cuenta.value} value={cuenta.value}>
                        {cuenta.label}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.subOperacion === 'Prestamo' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">INTERÉS (%) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.interesPorcentaje}
                        onChange={(e) => handleInputChange('interesPorcentaje', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="5.00"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">LAPSO (días) *</label>
                      <input
                        type="number"
                        value={formData.lapsoPrestamo}
                        onChange={(e) => handleInputChange('lapsoPrestamo', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="30"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">ESTADO *</label>
                    <select
                      value={formData.estado}
                      onChange={(e) => handleInputChange('estado', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {estados.map(estado => (
                        <option key={estado.value} value={estado.value}>
                          {estado.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">POR *</label>
                    <select
                      value={formData.por}
                      onChange={(e) => handleInputChange('por', e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {socios.map(socio => (
                        <option key={socio.value} value={socio.value}>
                          {socio.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Campo adicional para "Otro" */}
            {formData.por === 'otro' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">NOMBRE *</label>
                <input
                  type="text"
                  value={formData.nombreOtro}
                  onChange={(e) => handleInputChange('nombreOtro', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el nombre"
                />
              </div>
            )}

            {/* BOTONES - Solo aparecen si hay sub-operación seleccionada */}
            {formData.subOperacion && (
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={guardarBorrador}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>Guardar Borrador</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Guardar Operación</span>
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Resumen de operaciones recientes */}
        {operacionesGuardadas.length > 0 && (
          <div className="mt-4 bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Últimas operaciones</h2>
            <div className="space-y-3">
              {operacionesGuardadas.slice(-3).reverse().map((op) => (
                <div key={op.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-gray-900">{op.cliente}</span>
                    <span className="text-sm text-gray-600">{op.fecha}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{op.operacion}</span> - {op.subOperacion}
                  </div>
                  {op.borrador && (
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mt-1">
                      Borrador
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialOperationsApp;