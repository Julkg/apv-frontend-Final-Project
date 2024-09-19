import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider= ({children}) => {
  
    //Le agregamos el cargando para que no haga otras cosas mientras se ejecuta el codigo, proque estamos evaluando que el auth tenga algo, y por defecto esta vacio, por ende no pasa la validacion
    const [cargando, setCargando] = useState(true)
    //Una de las maneras en las que podemos extraer el auth del provider es crear una carpeta en nuestro src llamada hooks
    const [auth, setAuth] = useState({})

    //Ya que el authProvider rodea todo nuestra App.jsx sirve como autenticación, para esto utilizamos un useEffect para cuando cargue la app, revise si el usuario esta autenticado

    useEffect(() => {
      const autenticarUsuario= async () => {
          const token = localStorage.getItem('token');

          //Ya que se va a ejecutar una vez y me va a dar un objeto vacio el token no va a pasar la validacion, entonces le decimos que si no hay token, simplemente pongamos el cargando en false y retornemos, para que no nos devuelva
          if (!token) {
              setCargando(false)
              return
          }
          
          //Esta es la configuración para el bearer con el que configuramos la autenticación del token
          const config = {
              //los headers se envían antes de la peticiones, 
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
              //Los solicitamos como Bearer, porque el token escogimos usar esa convención
          }
          
          try {
              const { data } = await clienteAxios('/veterinarios/perfil', config)
              //Recuerda, te arroja en data, el perfil del usuario porque ya autentico con el localStorage
              setAuth(data)
          } catch (error) {
              console.log(error.response.data.msg)
              setAuth({})
          }

          setCargando(false);
          
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false)
            return
        }
        const config = {
            //los headers se envían antes de la peticiones, 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
            //Los solicitamos como Bearer, porque el token escogimos usar esa convención
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            await clienteAxios.put(url, datos, config);
            
            return {
                msg: 'Almacenado Correctamente',
                error:false
            }
            
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error:true
            }
        } 
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false)
            return
        }
        const config = {
            //los headers se envían antes de la peticiones, 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
            //Los solicitamos como Bearer, porque el token escogimos usar esa convención
        }

        try {
            const url = '/veterinarios/actualizar-password'

            const { data } = await clienteAxios.put(url, datos, config)
            console.log(data)

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error:true
            }
        }
    }
    
    //Si usamos el useAuth como tal nos arroja un error que nos pide el value dentro del context.provide por eso se lo agregamos a continuación line:13 || como valor le vamos a pasar un objeto dentro de las llaves recuerda que las primeras llaves son para declara el js y la dentro las segundas llaves nos indican un objeto
    return (
        <AuthContext.Provider 
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext