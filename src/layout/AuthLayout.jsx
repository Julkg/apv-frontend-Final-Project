import { Outlet } from "react-router-dom"

//El shorcut de rafce me permite construir toda la estructura basica de un componente
const AuthLayout = () => {
  return (
    <>
      
          <main className="container mx-auto md:grid md:grid-cols-2 mt-12 p-10 gap-9 items-center">
            <Outlet />
          </main> 

      </>
  )
}

export default AuthLayout