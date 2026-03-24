import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">Página no encontrada</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        La ruta que buscas no existe o fue movida. Revisa la URL o vuelve a la página principal.
      </p>
      <div>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm hover:opacity-90"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
