import React, { useState } from 'react';
import { 
  ArrowLeft,
  Plus,
  Search,
  Edit3,
  Phone,
  MapPin,
  CreditCard,
  TrendingUp,
  Bell,
  User,
  Trash2
} from 'lucide-react';

const App = () => {
  const [vista, setVista] = useState('lista');
  const [clienteEditando, setClienteEditando] = useState(null);
  const [clienteAnalytics, setClienteAnalytics] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Pérez',
      telefono: '+54 9 11 1234-5678',
      direccion: 'Av. Corrientes 1234, CABA',
      dni: '12.345.678',
      ultimaOperacion: '2024-12-15',
      totalOperaciones: 25,
      volumenTotal: 45000,
      operaciones: [
        { fecha: '2024-11-01' },
        { fecha: '2024-11-16' },
        { fecha: '2024-12-01' },
        { fecha: '2024-12-15' }
      ]
    },
    {
      id: 2,
      nombre: 'María',
      apellido: 'González',
      telefono: '+54 9 11 8765-4321',
      direccion: 'Belgrano 567, CABA',
      dni: '87.654.321',
      ultimaOperacion: '2024-11-20',
      totalOperaciones: 12,
      volumenTotal: 28000,
      operaciones: [
        { fecha: '2024-09-15' },
        { fecha: '2024-10-20' },
        { fecha: '2024-11-20' }
      ]
    },
    {
      id: 3,
      nombre: 'Carlos',
      apellido: 'Rodriguez',
      telefono: '+54 9 11 5555-1234',
      direccion: 'San Martín 890, CABA',
      dni: '11.222.333',
      ultimaOperacion: '2024-10-05',
      totalOperaciones: 8,
      volumenTotal: 15000,
      operaciones: [
        { fecha: '2024-08-10' },
        { fecha: '2024-09-25' },
        { fecha: '2024-10-05' }
      ]
    }
  ]);

  // Funciones principales
  const volverMenuPrincipal = () => {
    // Aquí iría la navegación real al menú principal
    // Por ahora simularemos que vuelve
    if (confirm('¿Volver al menú principal?')) {
      // En la app real, aquí se cambiaría la vista/ruta
      window.location.reload(); // Temporal para simular volver
    }
  };

  const crearNuevoCliente = () => {
    setClienteEditando(null);
    setVista('form');
  };

  const editarCliente = (cliente) => {
    setClienteEditando(cliente);
    setVista('form');
  };

  const verAnalytics = (cliente) => {
    setClienteAnalytics(cliente);
    setVista('analytics');
  };

  const eliminarCliente = (clienteId) => {
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente && confirm(`¿Eliminar a ${cliente.nombre} ${cliente.apellido}?`)) {
      setClientes(clientes.filter(c => c.id !== clienteId));
    }
  };

  const guardarCliente = (clienteData) => {
    if (clienteData.id && clientes.find(c => c.id === clienteData.id)) {
      setClientes(clientes.map(c => c.id === clienteData.id ? clienteData : c));
    } else {
      setClientes([...clientes, { ...clienteData, id: Date.now() }]);
    }
    setVista('lista');
    setClienteEditando(null);
  };

  const volverALista = () => {
    setVista('lista');
    setClienteEditando(null);
    setClienteAnalytics(null);
  };

  // Función para calcular frecuencia
  const calcularFrecuencia = (cliente) => {
    if (!cliente.operaciones || cliente.operaciones.length < 2) return 30;
    
    const fechas = cliente.operaciones.map(op => new Date(op.fecha)).sort((a, b) => a - b);
    let totalDias = 0;
    
    for (let i = 1; i < fechas.length; i++) {
      const diasEntre = Math.floor((fechas[i] - fechas[i-1]) / (1000 * 60 * 60 * 24));
      totalDias += diasEntre;
    }
    
    return Math.round(totalDias / (fechas.length - 1));
  };

  // Función para estado de contacto
  const getEstadoContacto = (cliente) => {
    if (!cliente.ultimaOperacion) return { color: 'bg-gray-100 text-gray-600', texto: 'Sin datos' };
    
    const dias = Math.floor((new Date() - new Date(cliente.ultimaOperacion)) / (1000 * 60 * 60 * 24));
    const frecuencia = calcularFrecuencia(cliente);
    
    if (dias > frecuencia * 1.5) return { color: 'bg-red-100 text-red-600', texto: 'Contactar urgente' };
    if (dias > frecuencia) return { color: 'bg-yellow-100 text-yellow-600', texto: 'Contactar pronto' };
    return { color: 'bg-green-100 text-green-600', texto: 'Activo' };
  };

  // Filtrar clientes
  const clientesFiltrados = clientes.filter(cliente =>
    `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.includes(busqueda) ||
    cliente.dni.includes(busqueda)
  );

  // VISTA FORMULARIO
  if (vista === 'form') {
    return <FormularioCliente cliente={clienteEditando} onSave={guardarCliente} onCancel={volverALista} />;
  }

  // VISTA ANALYTICS
  if (vista === 'analytics') {
    return <AnalyticsCliente cliente={clienteAnalytics} onBack={volverALista} />;
  }

  // VISTA PRINCIPAL - LISTA
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={volverMenuPrincipal} className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Clientes</h1>
          </div>
          <button onClick={crearNuevoCliente} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o DNI..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de clientes */}
      <div className="p-4 space-y-3">
        {clientesFiltrados.length === 0 ? (
          <div className="text-center py-8">
            <User size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No se encontraron clientes</p>
          </div>
        ) : (
          clientesFiltrados.map((cliente) => (
            <ClienteCard
              key={cliente.id}
              cliente={cliente}
              onEdit={editarCliente}
              onViewAnalytics={verAnalytics}
              onDelete={eliminarCliente}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Componente ClienteCard
const ClienteCard = ({ cliente, onEdit, onViewAnalytics, onDelete }) => {
  const calcularFrecuencia = (cliente) => {
    if (!cliente.operaciones || cliente.operaciones.length < 2) return 30;
    
    const fechas = cliente.operaciones.map(op => new Date(op.fecha)).sort((a, b) => a - b);
    let totalDias = 0;
    
    for (let i = 1; i < fechas.length; i++) {
      const diasEntre = Math.floor((fechas[i] - fechas[i-1]) / (1000 * 60 * 60 * 24));
      totalDias += diasEntre;
    }
    
    return Math.round(totalDias / (fechas.length - 1));
  };

  const getEstadoContacto = (cliente) => {
    if (!cliente.ultimaOperacion) return { color: 'bg-gray-100 text-gray-600', texto: 'Sin datos' };
    
    const dias = Math.floor((new Date() - new Date(cliente.ultimaOperacion)) / (1000 * 60 * 60 * 24));
    const frecuencia = calcularFrecuencia(cliente);
    
    if (dias > frecuencia * 1.5) return { color: 'bg-red-100 text-red-600', texto: 'Contactar urgente' };
    if (dias > frecuencia) return { color: 'bg-yellow-100 text-yellow-600', texto: 'Contactar pronto' };
    return { color: 'bg-green-100 text-green-600', texto: 'Activo' };
  };

  const getDiasDesdeUltimaOperacion = () => {
    if (!cliente.ultimaOperacion) return 'Nunca';
    const dias = Math.floor((new Date() - new Date(cliente.ultimaOperacion)) / (1000 * 60 * 60 * 24));
    return `${dias} días`;
  };

  const estado = getEstadoContacto(cliente);
  const frecuencia = calcularFrecuencia(cliente);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{cliente.nombre} {cliente.apellido}</h3>
          <div className="flex items-center gap-1 mt-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${estado.color}`}>
              {estado.texto}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onViewAnalytics(cliente)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <TrendingUp size={16} />
          </button>
          <button onClick={() => onEdit(cliente)} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Edit3 size={16} />
          </button>
          <button onClick={() => onDelete(cliente.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Phone size={14} />
          <span>{cliente.telefono}</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard size={14} />
          <span>DNI: {cliente.dni}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} />
          <span className="truncate">{cliente.direccion}</span>
        </div>
      </div>

      <div className="border-t pt-3 flex justify-between text-xs text-gray-500">
        <span>Última operación: {getDiasDesdeUltimaOperacion()}</span>
        <span>Cada {frecuencia} días • {cliente.totalOperaciones || 0} ops</span>
      </div>
    </div>
  );
};

// Componente Formulario
const FormularioCliente = ({ cliente, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: cliente?.nombre || '',
    apellido: cliente?.apellido || '',
    telefono: cliente?.telefono || '',
    direccion: cliente?.direccion || '',
    dni: cliente?.dni || ''
  });

  const handleSubmit = () => {
    if (!formData.nombre || !formData.apellido || !formData.telefono || !formData.dni || !formData.direccion) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    onSave({ ...cliente, ...formData, id: cliente?.id || Date.now() });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {cliente ? 'Editar Cliente' : 'Nuevo Cliente'}
          </h1>
        </div>
      </div>
      
      <div className="p-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={formData.apellido}
                  onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.dni}
                onChange={(e) => setFormData({...formData, dni: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">
                ℹ️ La frecuencia de operación se calculará automáticamente basándose en el historial.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={onCancel} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Cancelar
              </button>
              <button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Analytics
const AnalyticsCliente = ({ cliente, onBack }) => {
  const calcularFrecuencia = (cliente) => {
    if (!cliente.operaciones || cliente.operaciones.length < 2) return 30;
    
    const fechas = cliente.operaciones.map(op => new Date(op.fecha)).sort((a, b) => a - b);
    let totalDias = 0;
    
    for (let i = 1; i < fechas.length; i++) {
      const diasEntre = Math.floor((fechas[i] - fechas[i-1]) / (1000 * 60 * 60 * 24));
      totalDias += diasEntre;
    }
    
    return Math.round(totalDias / (fechas.length - 1));
  };

  const getRecomendacion = () => {
    if (!cliente.ultimaOperacion) return 'Contactar para primera operación';
    
    const dias = Math.floor((new Date() - new Date(cliente.ultimaOperacion)) / (1000 * 60 * 60 * 24));
    const frecuencia = calcularFrecuencia(cliente);
    
    if (dias > frecuencia * 1.5) return 'Contactar urgentemente - Cliente inactivo';
    if (dias > frecuencia) return 'Contactar esta semana';
    return 'Cliente activo - Seguimiento normal';
  };

  const frecuencia = calcularFrecuencia(cliente);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Análisis del Cliente</h1>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Análisis de {cliente.nombre} {cliente.apellido}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{cliente.totalOperaciones || 0}</div>
              <div className="text-sm text-blue-600">Operaciones totales</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">
                ${(cliente.volumenTotal || 0).toLocaleString()}
              </div>
              <div className="text-sm text-green-600">Volumen total</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-purple-500" />
              <span className="font-medium text-gray-900">Frecuencia Calculada</span>
            </div>
            <p className="text-sm text-purple-600">
              Opera cada <strong>{frecuencia} días</strong> en promedio
            </p>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Bell size={16} className="text-orange-500" />
              <span className="font-medium text-gray-900">Recomendación</span>
            </div>
            <p className="text-sm text-gray-600">{getRecomendacion()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;