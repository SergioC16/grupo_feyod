export default function NotFound() {
  return (
    <section className="px-6 py-16 text-center">
      <h1 className="text-3xl font-bold mb-3">Página no encontrada</h1>
      <p className="mb-6">La ruta que buscaste no existe.</p>
      <a href="/" className="underline">Volver al inicio</a>
    </section>
  );
}
