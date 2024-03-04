import './adminDashBoard.css'
import SideBar from '../sidebar/sidebarComponent'; 
import NavBar from '../navbar/navbarNewComponent';


interface AdminDashBoardProps {
    children: React.ReactNode;
  }

const AdminDashBoardLayout : React.FC<AdminDashBoardProps> = ({children}) =>{
  return (
    <div className='mainAdminDashBoardLayout' style={{display: 'flex', flexDirection: 'column'}}>
      {/* <NavBar/> */}
      <SideBar/>
      <main >{children}</main>
    </div>
  );
};

export default AdminDashBoardLayout
