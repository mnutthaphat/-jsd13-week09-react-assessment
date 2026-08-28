import { Link } from "react-router-dom"; // นำเข้า Link เพื่อใช้สำหรับกดเปลี่ยนหน้าโดยที่เว็บไม่รีเฟรช (SPA)

const NavBar = () => {
    return (
        // แถบเมนูด้านบน จัดให้อยู่ชิดขวา (justify-end) สีพื้นหลังเทา (bg-gray-200)
        <nav className="flex justify-end py-4 px-10 bg-gray-200 w-full left-0 border-b border-gray-300">
            <div className="flex gap-8 font-bold text-black font-sans">
                {/* ลิงก์ที่ 1: วิ่งไปหน้า Home (path = '/') */}
                <Link to="/" className="hover:text-gray-700">Home</Link>

                {/* ลิงก์ที่ 2: วิ่งไปหน้า Owner (path = '/owner') */}
                <Link to="/owner" className="hover:text-gray-700">Owner</Link>
            </div>
        </nav>
    );
};

export default NavBar;
