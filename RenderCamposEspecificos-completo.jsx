import React from 'react';

// Utilidades para labels dinámicos
const getLabels = (subOperacion) => {
  if (subOperacion === 'COMPRA') return { 
    monto: 'MONTO (INGRESO)', 
    total: 'TOTAL (EGRESO)',
    cuentaMonto: 'CUENTA (INGRESO)',
    cuentaTotal: 'CUENTA (EGRESO)'
  };
  if (subOperacion === 'VENTA') return { 
    monto: 'MONTO (EGRESO)', 
    total: 'TOTAL (INGRESO)',
    cuentaMonto: 'CUENTA (EGRESO)',
    cuentaTotal: 'CUENTA (INGRESO)'
  };
  return { 
    monto: 'MONTO', 
    total: 'TOTAL',
    cuentaMonto: 'CUENTA',
    cuentaTotal: 'CUENTA'
  };
};

// Componente para campos de COMPRA
const CamposCompra = ({ formData, handleInputChange, monedas, cuentas, estados, socios }) => {
  const labels = getLabels('COMPRA');
  
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            {labels.monto} *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.monto}
            onChange={(e) => handleInputChange('monto', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            MONEDA *
          </label>
          <select
            value={formData.moneda}
            onChange={(e) => handleInputChange('moneda', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          >
            {monedas.map((moneda) => (
              <option key={moneda.value} value={moneda.value}>
                {moneda.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            TC *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.tc}
            onChange={(e) => handleInputChange('tc', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            placeholder="Tipo de cambio"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            MONEDA *
          </label>
          <select
            value={formData.monedaTC}
            onChange={(e) => handleInputChange('monedaTC', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          >
            {monedas.map((moneda) => (
              <option key={moneda.value} value={moneda.value}>
                {moneda.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-2">
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          {labels.cuentaMonto} *
        </label>
        <select
          value={formData.cuenta}
          onChange={(e) => handleInputChange('cuenta', e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
        >
          {cuentas.map((cuenta) => (
            <option key={cuenta.value} value={cuenta.value}>
              {cuenta.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2">
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          {labels.total} *
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.total}
          onChange={(e) => handleInputChange('total', e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          placeholder="0.00"
        />
      </div>

      <div className="mt-2">
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          {labels.cuentaTotal} *
        </label>
        <select
          value={formData.cuentaEgreso}
          onChange={(e) => handleInputChange('cuentaEgreso', e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
        >
          {cuentas.map((cuenta) => (
            <option key={cuenta.value} value={cuenta.value}>
              {cuenta.label}
            </option>
          ))}
        </select>
      </div>

      <PagoDiferidoSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
        cuentas={cuentas} 
      />

      <EstadoYPorSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
        estados={estados} 
        socios={socios} 
      />
    </>
  );
};

// Componente para campos de VENTA
const CamposVenta = ({ formData, handleInputChange, monedas, cuentas, estados, socios }) => {
  const labels = getLabels('VENTA');
  
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            {labels.monto} *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.monto}
            onChange={(e) => handleInputChange('monto', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            MONEDA *
          </label>
          <select
            value={formData.moneda}
            onChange={(e) => handleInputChange('moneda', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          >
            {monedas.map((moneda) => (
              <option key={moneda.value} value={moneda.value}>
                {moneda.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            TC *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.tc}
            onChange={(e) => handleInputChange('tc', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            placeholder="Tipo de cambio"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">
            MONEDA *
          </label>
          <select
            value={formData.monedaTC}
            onChange={(e) => handleInputChange('monedaTC', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          >
            {monedas.map((moneda) => (
              <option key={moneda.value} value={moneda.value}>
                {moneda.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-2">
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          {labels.cuentaMonto} *
        </label>
        <select
          value={formData.cuenta}
          onChange={(e) => handleInputChange('cuenta', e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
        >
          {cuentas.map((cuenta) => (
            <option key={cuenta.value} value={cuenta.value}>
              {cuenta.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2">
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          {labels.total} *
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.total}
          onChange={(e) => handleInputChange('total', e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          placeholder="0.00"
        />
      </div>

      <div className="mt-2">
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          {labels.cuentaTotal} *
        </label>
        <select
          value={formData.cuentaEgreso}
          onChange={(e) => handleInputChange('cuentaEgreso', e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
        >
          {cuentas.map((cuenta) => (
            <option key={cuenta.value} value={cuenta.value}>
              {cuenta.label}
            </option>
          ))}
        </select>
      </div>

      <EstadoYPorSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
        estados={estados} 
        socios={socios} 
      />
    </>
  );
};

// Componente para ARBITRAJE
const CamposArbitraje = ({ formData, handleInputChange, monedas, cuentas }) => {
  return (
    <>
      {/* Operación 1 */}
      <div className="bg-gray-50 p-3 rounded-lg space-y-2">
        <div className="text-xs font-semibold text-gray-700 mb-2">OPERACIÓN 1</div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO</label>
            <input
              type="number"
              step="0.01"
              value={formData.montoCompra}
              onChange={(e) => handleInputChange('montoCompra', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
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
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">TOTAL</label>
            <input
              type="number"
              step="0.01"
              value={formData.totalCompra}
              onChange={(e) => handleInputChange('totalCompra', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA</label>
            <select
              value={formData.monedaCompra}
              onChange={(e) => handleInputChange('monedaCompra', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {monedas.map((moneda) => (
                <option key={moneda.value} value={moneda.value}>
                  {moneda.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Operación 2 */}
      <div className="bg-gray-50 p-3 rounded-lg space-y-2 mt-2">
        <div className="text-xs font-semibold text-gray-700 mb-2">OPERACIÓN 2</div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO</label>
            <input
              type="number"
              step="0.01"
              value={formData.montoVenta}
              onChange={(e) => handleInputChange('montoVenta', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
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
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">TOTAL</label>
            <input
              type="number"
              step="0.01"
              value={formData.totalVenta}
              onChange={(e) => handleInputChange('totalVenta', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA</label>
            <select
              value={formData.monedaVenta}
              onChange={(e) => handleInputChange('monedaVenta', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {monedas.map((moneda) => (
                <option key={moneda.value} value={moneda.value}>
                  {moneda.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comisión */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">COMISIÓN</label>
          <input
            type="number"
            step="0.01"
            value={formData.comisionArbitraje}
            onChange={(e) => handleInputChange('comisionArbitraje', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">CUENTA COMISIÓN</label>
          <select
            value={formData.cuentaComision}
            onChange={(e) => handleInputChange('cuentaComision', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          >
            {cuentas.map((cuenta) => (
              <option key={cuenta.value} value={cuenta.value}>
                {cuenta.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

// Componente para Pago Diferido (SOLO PARA COMPRA)
const PagoDiferidoSection = ({ formData, handleInputChange, cuentas }) => {
  return (
    <>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="pagoDiferido"
          checked={formData.pagoDiferido}
          onChange={(e) => handleInputChange('pagoDiferido', e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="pagoDiferido" className="text-xs font-medium text-gray-700">
          Pago con dos cuentas diferentes
        </label>
      </div>

      {formData.pagoDiferido && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              MONTO *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.montoDiferido}
              onChange={(e) => handleInputChange('montoDiferido', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              CUENTA *
            </label>
            <select
              value={formData.cuentaDiferida}
              onChange={(e) => handleInputChange('cuentaDiferida', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {cuentas.map((cuenta) => (
                <option key={cuenta.value} value={cuenta.value}>
                  {cuenta.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

// Componente para Estado y Por
const EstadoYPorSection = ({ formData, handleInputChange, estados, socios }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          ESTADO *
        </label>
        <select
          value={formData.estado}
          onChange={(e) => handleInputChange('estado', e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
        >
          {estados.map((estado) => (
            <option key={estado.value} value={estado.value}>
              {estado.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">
          POR *
        </label>
        <select
          value={formData.por}
          onChange={(e) => handleInputChange('por', e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
        >
          {socios.map((socio) => (
            <option key={socio.value} value={socio.value}>
              {socio.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// COMPONENTE PRINCIPAL COMPLETO (100% de tu código original + mejoras)
const RenderCamposEspecificos = ({
  formData,
  handleInputChange,
  monedas,
  cuentas,
  estados,
  socios
}) => {
  // COMPRA
  if (formData.subOperacion === 'COMPRA') {
    return (
      <CamposCompra 
        formData={formData} 
        handleInputChange={handleInputChange} 
        monedas={monedas} 
        cuentas={cuentas}
        estados={estados}
        socios={socios}
      />
    );
  }

  // VENTA
  if (formData.subOperacion === 'VENTA') {
    return (
      <CamposVenta 
        formData={formData} 
        handleInputChange={handleInputChange} 
        monedas={monedas} 
        cuentas={cuentas}
        estados={estados}
        socios={socios}
      />
    );
  }

  // ARBITRAJE
  if (formData.subOperacion === 'ARBITRAJE') {
    return (
      <CamposArbitraje 
        formData={formData} 
        handleInputChange={handleInputChange} 
        monedas={monedas} 
        cuentas={cuentas}
      />
    );
  }

  // CUENTAS CORRIENTES
  if (formData.operacion === 'CUENTAS_CORRIENTES' && formData.subOperacion) {
    return (
      <>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">TIPO *</label>
          <select
            value={formData.tipoCC || ''}
            onChange={(e) => handleInputChange('tipoCC', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          >
            <option value="">Seleccionar tipo</option>
            <option value="ingreso">INGRESO</option>
            <option value="salida">SALIDA</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO *</label>
            <input
              type="number"
              step="0.01"
              value={formData.monto}
              onChange={(e) => handleInputChange('monto', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA *</label>
            <select
              value={formData.moneda}
              onChange={(e) => handleInputChange('moneda', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {monedas.map((moneda) => (
                <option key={moneda.value} value={moneda.value}>
                  {moneda.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">COMISIÓN</label>
            <input
              type="number"
              step="0.01"
              value={formData.comision}
              onChange={(e) => handleInputChange('comision', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA COMISIÓN</label>
            <select
              value={formData.monedaComision}
              onChange={(e) => handleInputChange('monedaComision', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {monedas.map((moneda) => (
                <option key={moneda.value} value={moneda.value}>
                  {moneda.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    );
  }

  // ADMINISTRATIVAS → AJUSTES Y GASTOS
  if (formData.operacion === 'ADMINISTRATIVAS' && formData.subOperacion) {
    if (formData.subOperacion === 'Ajustes') {
      return (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">TIPO *</label>
              <select
                value={formData.tipoCC || ''}
                onChange={(e) => handleInputChange('tipoCC', e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              >
                <option value="">Seleccionar tipo</option>
                <option value="ingreso">INGRESO</option>
                <option value="salida">SALIDA</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA *</label>
              <select
                value={formData.moneda || ''}
                onChange={(e) => handleInputChange('moneda', e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              >
                {monedas.map((moneda) => (
                  <option key={moneda.value} value={moneda.value}>
                    {moneda.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-2">
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO *</label>
            <input
              type="number"
              step="0.01"
              value={formData.monto}
              onChange={(e) => handleInputChange('monto', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>

          <div className="mt-2">
            <label className="text-xs font-medium text-gray-700 mb-1 block">CUENTA *</label>
            <select
              value={formData.cuenta || ''}
              onChange={(e) => handleInputChange('cuenta', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {cuentas.map((cuenta) => (
                <option key={cuenta.value} value={cuenta.value}>
                  {cuenta.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2">
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              MOTIVO DEL AJUSTE *
            </label>
            <input
              type="text"
              value={formData.motivoAjuste || ''}
              onChange={(e) => handleInputChange('motivoAjuste', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="Explicación del ajuste..."
            />
          </div>
        </>
      );
    }

    if (formData.subOperacion === 'Gastos') {
      return (
        <>
          <div className="mt-2">
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO *</label>
            <input
              type="number"
              step="0.01"
              value={formData.monto}
              onChange={(e) => handleInputChange('monto', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>

          <div className="mt-2">
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA *</label>
            <select
              value={formData.moneda || ''}
              onChange={(e) => handleInputChange('moneda', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {monedas.map((moneda) => (
                <option key={moneda.value} value={moneda.value}>
                  {moneda.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2">
            <label className="text-xs font-medium text-gray-700 mb-1 block">
              DETALLE DEL GASTO *
            </label>
            <input
              type="text"
              value={formData.detalle || ''}
              onChange={(e) => handleInputChange('detalle', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="Descripción del gasto..."
            />
          </div>
        </>
      );
    }
  }

  // PRESTAMISTAS
  if (formData.operacion === 'PRESTAMISTAS' && formData.subOperacion) {
    return (
      <>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO *</label>
            <input
              type="number"
              step="0.01"
              value={formData.monto}
              onChange={(e) => handleInputChange('monto', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA *</label>
            <select
              value={formData.moneda}
              onChange={(e) => handleInputChange('moneda', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {monedas.map((moneda) => (
                <option key={moneda.value} value={moneda.value}>
                  {moneda.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-2">
          <label className="text-xs font-medium text-gray-700 mb-1 block">INTERÉS (%)</label>
          <input
            type="number"
            step="0.01"
            value={formData.interesPorcentaje}
            onChange={(e) => handleInputChange('interesPorcentaje', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            placeholder="0.00"
          />
        </div>

        <div className="mt-2">
          <label className="text-xs font-medium text-gray-700 mb-1 block">LAPSO</label>
          <input
            type="text"
            value={formData.lapsoPrestamo || ''}
            onChange={(e) => handleInputChange('lapsoPrestamo', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            placeholder="Ej. 30 días"
          />
        </div>
      </>
    );
  }

  // SOCIOS
  if (formData.operacion === 'SOCIOS' && formData.subOperacion) {
    return (
      <>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONTO *</label>
            <input
              type="number"
              step="0.01"
              value={formData.monto}
              onChange={(e) => handleInputChange('monto', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">MONEDA *</label>
            <select
              value={formData.moneda}
              onChange={(e) => handleInputChange('moneda', e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
            >
              {monedas.map((moneda) => (
                <option key={moneda.value} value={moneda.value}>
                  {moneda.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-2">
          <label className="text-xs font-medium text-gray-700 mb-1 block">CUENTA *</label>
          <select
            value={formData.cuenta}
            onChange={(e) => handleInputChange('cuenta', e.target.value)}
            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg"
          >
            {cuentas.map((cuenta) => (
              <option key={cuenta.value} value={cuenta.value}>
                {cuenta.label}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  return null;
};

export default RenderCamposEspecificos;