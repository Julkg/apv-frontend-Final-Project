import { useEffect, useState } from "react";
//use Params nos permite leer datos de la url, recuerda que en express usamos req.params que es parecido, en react usamos useParams
import { useParams } from "react-router-dom";
import Alerta from '../components/Alerta';
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios" 



const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState();

    const params = useParams();
    const { id } = params;
    console.log(id);
    console.log('hola')


    //vamos a leer el token/id con un useEffect() para que ejecute el código una vez que el componente este listo
    useEffect(() => {
      const confirmarCuenta = async () => {
        try {
            const url = `/veterinarios/confirmar/${id}`
            const { data } = await clienteAxios(url);

            setCuentaConfirmada(true);
            setAlerta({
                msg: data.msg
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
          }
          
          setCargando(false);
        }
        confirmarCuenta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) //<=== Le ponemos una dependencia con un arreglo vacío, para que se ejecute una sola vez el cuando el componente este listo

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl tex">
                    Confirma tu Cuenta y Comienza a Administrar{""}
                <span className="text-black">tus Pacientes</span>
                </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
                {!cargando &&
                    <Alerta
                    alerta={alerta}
                    />}
                
                {cuentaConfirmada &&
                    (<Link
                        className="block text-center my-5 text-gray-700 hover:underline" to="/">Iniciar Sesión
                    </Link>
                    
                    )}
            </div>
        </>
    )
  }
  
  export default ConfirmarCuenta