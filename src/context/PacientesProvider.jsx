import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios'
import useAuth from "../hooks/useAuth";


const PacientesContext = createContext()

// eslint-disable-next-line react/prop-types
const PacientesProvider = ({children}) => {
    
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const { auth } = useAuth();

    useEffect(() => {
      const obtenerPacientes=async () => {
        
          try {
              const token = localStorage.getItem('token')
              if (!token) return
            
              const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
              }
              const { data } = await clienteAxios('/pacientes', config)

              setPacientes(data)
          } catch (error) {
            console.log(error)
          }
        }
        obtenerPacientes()
    },[auth])


    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)

                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                
                setPacientes(pacienteActualizado)

                console.log(data);
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                
                //Recuerda que cuando es un url que necesita autenticación, es necesario pasarle en el tercer parámetro la configuración
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
    
                /*Para eliminar elementos de un objeto se puede hacer asi o
                delete data.__V o como en line:26
                */
                // eslint-disable-next-line no-unused-vars
                const { __v, ...pacienteAlmacenado } = data
    
                //Tomamos pacienteAlmacenado y le agregamos una copia de pacientes
                setPacientes([pacienteAlmacenado,...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }


        
    }
    
    const setEdicion = (paciente) => {
      setPaciente(paciente)
    }

    const eliminarPaciente = async (id, nombre) => {
        const confirmar = confirm(`¿Confirmas que deseas eliminar el paciente ${nombre}?`);

        if (confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                
                await clienteAxios.delete(`/pacientes/${id}`, config)
                
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)

                setPacientes(pacientesActualizado);
                
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
        }}>
            {children}
        </PacientesContext.Provider>
  )
}

export {
    PacientesProvider
}

export default PacientesContext
