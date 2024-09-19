import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"


const CambiarPassword = () => {

    const { guardarPassword } = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
    })

    //Al usar ,some line:17 el va a revisar que en el objeto haya un string vacíos, pero como en el objeto no hay nada, detecta que efectivamente no hay strings vacíos, porque simplemente no hay string, entonces en line: 9 y 8  declaramos valores iniciales de strings vacíos para que asi el .some pueda verificar
    const handleSubmit = async e => {
        e.preventDefault()
        
        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error :true
            })
            return
        }

        if (password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: 'El Password debe tener mínimo 6 caracteres',
                error: true
            })
            return
        }

        const respuesta = await guardarPassword(password);

        setAlerta(respuesta)
    }

    const {msg} = alerta 
    return (
    <>
        <AdminNav />
        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Password aquí</span></p>

        <div className="flex justify-center mx-10 md:mx-0">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    
                    {msg && <Alerta
                        alerta={alerta}
                    />}
                    <form
                        onSubmit={handleSubmit}
                    >
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Password Actual</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name='pwd_actual'
                            placeholder="Escribe tu password actual"
                            onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label className="uppercase font-bold text-gray-600">Nuevo Password</label>
                        <input
                            type="password"
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            name='pwd_nuevo'
                            placeholder="Escribe tu nueva password"
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>
                        
                    <input
                        type="submit"
                        value="Actualizar Password"
                        className="bg-indigo-600 hover:bg-indigo-800 transition-colors px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />
                </form>
            </div>
        </div>
    </>
)
}

export default CambiarPassword