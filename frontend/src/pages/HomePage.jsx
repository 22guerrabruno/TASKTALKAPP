import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const HomePage = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  return (
    <div className='h-screenflex flex-col items-center overflow-auto p-5'>
      <div className="text-center max-w 7xl p-6 mt-40">
        <h1 className='pb-10 text-5xl font-bold text-orange-500 max-w-6xl mx-auto'>
          Todo tu equipo en un grupo, para lograr la máxima eficiencia, rapidez y comodidad en la comunicación y el trabajo.
        </h1>
        <h2 className='text-xl text-gray-900 max-w-6xl mx-auto items-center'>
          Con <b className="font-bold text-orange-500">TaskTalk</b> puedes tener un grupo con cada equipo con el que trabajas, en él podrás <span> </span>
          <span className="text-blue-500 font-bold">chatear</span>, hacer <span className="font-bold text-blue-500"> videollamadas </span><br /> y tener un 
          <span className="text-blue-500 font-bold"> dashboard de tareas </span>
          con el que poder visualizar el progreso en tu proyecto. Comunícate de forma efectiva y utiliza el dashboard de tareas para sacar el máximo partido a tu equipo.
        </h2>
        {isAuthenticated ? <button onClick={() => { navigate('/profile-page') }} className='bg-orange-500 mt-10 text-white font-bold py-4 px-7 rounded-md hover:bg-orange-800'>Ve a tu perfil</button> : <button onClick={() => { navigate('/register-page') }} className='bg-orange-600 mt-8 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-800'>Regístrate aquí</button>}
        <br />
      </div>
    </div>
  );
};

export default HomePage;
