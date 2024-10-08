import usePacientes from "../hooks/usePacientes"
import Paciente from "./Paciente"

const ListadoPacientes = () => {

  const { pacientes } = usePacientes()
  return (
    <>
      {pacientes.length ?
        (
      
          <>
            
            <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
            
            <p className="text-xl mt-5 mb-10 text-center">
              Administra tus {''}
              <span className="text-indigo-600 font-bold">y Pacientes y Citas </span>
            </p>

            
            {/* Recordar que cuando hacemos un .map la syntaxis es distinta, serai array.map((parametroVareable)=>(Argumento,IMPORTANTE!!! ENTRE PARÉNTESIS NO SON LLAVES!!!))  */}
            {pacientes.map((paciente) => (
              <Paciente
                key={paciente._id}
                paciente={paciente}
              />
            ))}

          </>

      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
          
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {''}
            <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes