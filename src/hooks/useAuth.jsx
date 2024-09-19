//Recuerda que en \src\context\AuthProvider.jsx creamos el context con createContext y aqui para llamar ese context usamos use context from react
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
    //Cuando usemos el hook useAuth retorna el AuthContext que es el que creamos en AuthProvider
  return useContext(AuthContext)
}
export default useAuth

/*
///IMPORTANTE///
La importancia de este hook global, es que lo podremos utilizar en cualquier componente de nuestra app, simplemente importándolo y utilizando lo que hemos puesto a disposición en src\context\AuthProvider.jsx\(line:8 y el valor declarado de ese "state" en line:14)
*/