import { useState } from "react"
import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"


const AdministrarPacientes = () => {

  const [mostrarFormulario, setMostrarFormulario]= useState(false)
  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
        onClick={() => {
          setMostrarFormulario(!mostrarFormulario)
          //Recuerda que mostrarFormulario es un boolean, por ende con el ! siempre cambiara el estado al contrario del que tiene
          //Se tiene que mandar a llamar como callback porque tiene una parámetro
        }}
      >
        {mostrarFormulario ? 'Ocultar Formulario' : 'Registra tus pacientes aquí'}
      </button>
      <div className={`${mostrarFormulario ? 'block'  : 'hidden' } md:block md:w-1/2 lg:w-2/5 `}>
        <Formulario/>
      </div>
      
      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes/>
      </div>
    </div>
  )
}

export default AdministrarPacientes