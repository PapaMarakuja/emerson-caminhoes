import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [carros, setCarros] = useState([]);
  const [motos, setMotos] = useState([]);
  const [caminhoes, setCaminhoes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resCarro, resMoto, resCaminhao] = await Promise.all([
          fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas'),
          fetch('https://parallelum.com.br/fipe/api/v1/motos/marcas'),
          fetch('https://parallelum.com.br/fipe/api/v1/caminhoes/marcas'),
        ]);

        const carros = await resCarro.json();
        const motos = await resMoto.json();
        const caminhoes = await resCaminhao.json();

        setCarros(carros);
        setMotos(motos);
        setCaminhoes(caminhoes);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function LoadingTemplate() {
    return (
      <div className='flex justify-center h-[70%]'>
        <div role='status'>
          <svg
            aria-hidden='true'
            className='w-32 h-32 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center flex-col h-screen bg-zinc-900'>
      <div className='container flex flex-col justify-around h-full'>
        <h1 className='text-6xl title font-medium text-center text-zinc-50'>Oficina do Emerson</h1>

        {loading && <LoadingTemplate />}
        {!loading && (
          <div className='bg-zinc-800 rounded-2xl p-4 grid grid-cols-3 gap-4 h-[80vh] overflow-auto'>
            <h2 className='text-lg bg-zinc-700 text-zinc-50 rounded-full py-2 px-4 w-fit'>Carros</h2>
            <h2 className='text-lg bg-zinc-700 text-zinc-50 rounded-full py-2 px-4 w-fit'>Motos</h2>
            <h2 className='text-lg bg-zinc-700 text-zinc-50 rounded-full py-2 px-4 w-fit'>Caminhoes</h2>

            <div className='bg-zinc-700 text-zinc-50 p-4 rounded-md overflow-y-auto'>
              {carros.map((carro: any) => (
                <p key={carro.codigo} className='py-2'>
                  {carro.codigo} - {carro.nome}
                </p>
              ))}
            </div>
            <div className='bg-zinc-700 text-zinc-50 p-4 rounded-md overflow-y-auto'>
              {motos.map((moto: any) => (
                <p key={moto.codigo} className='py-2'>
                  {moto.codigo} - {moto.nome}
                </p>
              ))}
            </div>
            <div className='bg-zinc-700 text-zinc-50 p-4 rounded-md overflow-y-auto'>
              {caminhoes.map((caminhao: any) => (
                <p key={caminhao.codigo} className='py-2'>
                  {caminhao.codigo} - {caminhao.nome}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
