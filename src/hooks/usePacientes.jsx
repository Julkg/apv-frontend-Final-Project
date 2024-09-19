import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";


const usePacientes = () => {
    //Cuando usemos el hook useAuth retorna el AuthContext que es el que creamos en AuthProvider
  return useContext(PacientesContext)
}
export default usePacientes