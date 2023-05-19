import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [carros, setCarros] = useState([]);
  const [motos, setMotos] = useState([]);
  const [caminhoes, setCaminhoes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCarro = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        const resMoto = await fetch('https://parallelum.com.br/fipe/api/v1/motos/marcas');
        const resCaminhao = await fetch('https://parallelum.com.br/fipe/api/v1/caminhoes/marcas');
        setCarros(await resCarro.json());
        setMotos(await resMoto.json());
        setCaminhoes(await resCaminhao.json());
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='flex items-center flex-col h-screen bg-zinc-900'>
      <div className='container flex flex-col justify-around h-full'>
        <h1 className='text-6xl title font-medium text-center text-zinc-50'>Oficina do Emerson</h1>

        <div className='bg-zinc-800 rounded-2xl p-4 grid grid-cols-3 gap-4 h-[80vh] overflow-auto'>
          <h2 className='text-lg bg-zinc-700 text-zinc-50 rounded-full py-2 px-4 w-fit'>Carros</h2>
          <h2 className='text-lg bg-zinc-700 text-zinc-50 rounded-full py-2 px-4 w-fit'>Motos</h2>
          <h2 className='text-lg bg-zinc-700 text-zinc-50 rounded-full py-2 px-4 w-fit'>Caminhoes</h2>

          <div className='bg-zinc-700 text-zinc-50 p-4 rounded-md overflow-y-auto'>
            {carros.map((carro: any) => (
              <p className='py-2'>
                {carro.codigo} - {carro.nome}
              </p>
            ))}
          </div>
          <div className='bg-zinc-700 text-zinc-50 p-4 rounded-md overflow-y-auto'>
            {motos.map((moto: any) => (
              <p className='py-2'>
                {moto.codigo} - {moto.nome}
              </p>
            ))}
          </div>
          <div className='bg-zinc-700 text-zinc-50 p-4 rounded-md overflow-y-auto'>
            {caminhoes.map((caminhao: any) => (
              <p className='py-2'>
                {caminhao.codigo} - {caminhao.nome}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
