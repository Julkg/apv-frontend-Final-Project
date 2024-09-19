import { useEffect, useState } from "react"
import AdminNav from "../components/AdminNav"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"


const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {
      setPerfil(auth)
    }, [auth]) //Le pasamos como instancia auth para que a penas cargue la pagina setee los campos del form, pero no modifique el state como tal

    const handleSubmit = async e => {
        e.preventDefault()
        
        const { nombre, email } = perfil
        if ([nombre, email].includes('')) {
            setAlerta({
                msg: 'Email y Nombre son obligatorios',
                error: true
            })
            return
        }
        //Tenemos que hacerlo asíncrona porque actualizar perfil es asincrona asi que intentaria tirar una alerta sin antes tener una respuesta y generaria un error
        const resultado = await actualizarPerfil(perfil)
        
        setAlerta(resultado);
    }

    const {msg} = alerta
    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Información aquí</span></p>
            
            <div className="flex justify-center mx-10 md:mx-0">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    
                    {msg && <Alerta
                        alerta={alerta}
                    />}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Nombre</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name='nombre'
                                value={perfil.nombre || ''} //O auth.paciente pero en los dos casos arroja un error
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })} //Esta es una syntaxis especial que va a tomar una copia lo que esta en el state, pero va a reescribir en el campo del objeto en el cual nos encontramos y esta asociado con el input

                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name='web'
                                value={perfil.web || ''} //O auth.paciente pero en los dos casos arroja un error
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Telefono</label>
                            <input
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name='telefono'
                                value={perfil.telefono || ''} //O auth.paciente pero en los dos casos arroja un error
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name='email'
                                value={perfil.email || ''} //O auth.paciente pero en los dos casos arroja un error
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-600 hover:bg-indigo-800 transition-colors px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        
                        />
                    </form>
                </div>
            </div>




        </>

        
    )
}

export default EditarPerfil