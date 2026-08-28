import NavBar from "./NavBar";
import { Outlet } from "react-router-dom"; // โหลด Outlet มาใช้

const Layout = () => {
    return (
        <div className="min-h-screen">
            <NavBar />
            {/* Outlet จะทำหน้าที่เป็นเหมือนรูปลั๊กเสียบ Component ลูกๆ (เช่น Home, Owner) จาก React Router */}
            <main className="w-full flex-grow flex flex-col">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
