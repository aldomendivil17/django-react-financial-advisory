import finanzas from '../assets/images/finanzas2.png'

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-xl md:max-w-2xl flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg p-4 md:p-6 md:gap-x-12">

        {/* Columna 1 */}
        <div className="flex-1 flex flex-col items-center justify-center text-center md:text-left md:items-end">
          <img src={finanzas} alt="Finanzas" className="w-42 h-42 object-contain" />
        </div>

        {/* Columna 2 */}
        <div className="flex-1 flex flex-col items-center justify-center text-center md:text-left md:items-start">
          <h1 className="text-4xl font-bold mb-4">Asesor Financiero</h1>
          <p className="mb-6 text-lg">Administra tus finanzas de manera simple.</p>
          <div>
            <a className="text-white px-4 py-2 rounded mr-2" href="/login" style={{backgroundColor: '#461D93'}}>Comenzar ahora</a>
            {/* <a className="text-white px-4 py-2 rounded" href="/register"  style={{backgroundColor: '#c6cfe6ff'}}>Registrarse</a> */}
          </div>
        </div>

      </div>
    </div>
  );
}
