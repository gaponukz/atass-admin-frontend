import { NavLink } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";

const HeaderNav = () => {
     return (
          <div className="h-[40px] flex flex-row p-7" >
               <Navbar bg="light" expand="lg">
                    <Container className='gap-3'>
                         <p className='text-2xl mt-3'>Панель адміністратора</p>
                         <NavLink to="/" className="mt-1">Маршрути</NavLink>
                         <NavLink to="/users" className="mt-1">Користувачі</NavLink>
                    </Container>
               </Navbar>
          </div>
     )
}

export default HeaderNav