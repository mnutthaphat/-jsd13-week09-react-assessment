// Component นี้มีหน้าที่แค่แสดงปุ่ม 2 ปุ่ม และรับ Function setSection เอาไว้สำหรับเปลี่ยน State เมื่อถูกคลิก
const SectionButtons = ({ setSection }) => {
    return (
        // กล่องครอบปุ่ม จัดให้อยู่ตรงกลาง (justify-center) และห่างกัน (gap-16)
        <div className="flex justify-center gap-16 mt-8 mb-12">

            {/* ปุ่มแรก: เมื่อกดแล้ว (onClick) ให้รัน setSection เปลี่ยนค่าเป็น "user" */}
            <button
                onClick={() => setSection("user")}
                className="px-6 py-3 bg-white text-black font-semibold rounded-md shadow-md border hover:bg-gray-50 shadow-gray-400/50"
            >
                User Home Section
            </button>

            {/* ปุ่มที่สอง: เมื่อกดแล้ว (onClick) ให้รัน setSection เปลี่ยนค่าเป็น "admin" */}
            <button
                onClick={() => setSection("admin")}
                className="px-6 py-3 bg-white text-black font-semibold rounded-md shadow-md border hover:bg-gray-50 shadow-gray-400/50"
            >
                Admin Home Section
            </button>

        </div>
    );
};

export default SectionButtons;
