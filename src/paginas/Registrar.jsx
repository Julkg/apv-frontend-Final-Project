import {useState} from 'react'
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios" 



const Registrar =  () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState('');

    const handleSumbit = async (e) => {
        e.preventDefault();

        //Validar formulario
        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({ msg: 'Hay campos vacíos', error: true });
            return
        } 

        if (password !== repetirPassword) {
            setAlerta({ msg: 'Los passwords no son iguales', error: true });
            return
        }

        if (password.length < 6) {
            setAlerta({ msg: 'El password es muy corto, agrega mínimo 6 caracteres', error: true });
            return
            
        }

        //Borramos el ocntenido del objeto pero siguen estando las clases por eso creamos una variable en line 37
        setAlerta({});

        /*Crear usuario en la API
            Podemos llamar las APIS desde el fetch que es nativo de js o con alguna libreria como axios npm i axios
        
        
            La url asi como tal no deberia funcionar, por un tema de los cors, los cuales 
            Esto es algotenemos que intalar en el backend npm i cors
                Y lo importamos en nuetro  \backend\index.js
        */

        try {
            await clienteAxios.post('/veterinarios', { nombre, email, password });
            setAlerta({ msg: 'Creado Correctamente, revisa tu email', error: false });
        } catch (error) {
            setAlerta({ msg:error.response.data.msg, error: true });;
        }

    }
    //Extraemos mensaje para porder interactuar con el line=50
    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl tex">
                    Crea tu Cuenta y Administra{" "}
                <span className="text-black">tus Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {/* Encerramos en corchetes para poder interactuar
                seria si hay mensaje ahi si mostrar la alerta, entonces cuando llenamos bien el formulario se elimina la alerta porque no cumple con la condicion */}
                {msg && <Alerta
                    alerta={alerta}
                />}
                <form
                onSubmit={handleSumbit}
                >
                    <div className="my-5">
                        <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        >
                        Nombre
                        </label>
                        <input 
                            type="text"
                            placeholder="Tu Nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e=>setNombre(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        >
                        Email
                        </label>
                        <input 
                            type="email"
                            placeholder="Email de Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        >
                        Password
                        </label>
                        <input 
                            type="password"
                            placeholder="Tu Password *****"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                        >
                        Repetir password
                        </label>
                        <input 
                            type="password"
                            placeholder="Repite tu Password"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange={e=>setRepetirPassword(e.target.value)}
                        />
                    </div>


                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-700 w-full block mx-auto xlg:flex py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 "
                    />
                    <nav className="mt-10 lg:flex lg:justify-between">
                        <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesión.</Link>
                        <Link className="block text-center my-5 text-gray-500"  to="/olvide-password">Olvide mi Password</Link>
                    </nav>
                </form>
            </div>
        </>
    )
  }
  
  export default Registrar