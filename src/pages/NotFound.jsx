import Button from '../shared/components/atoms/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
        <Button to="/" variant="primary">
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
