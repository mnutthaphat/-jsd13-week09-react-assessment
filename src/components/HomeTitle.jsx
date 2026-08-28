// รับ props 'section' มาจาก Home.jsx เพื่อเอามาเช็คเงื่อนไขในการแสดงข้อความ
const HomeTitle = ({ section }) => {
    // 1. ตั้งค่าพื้นฐาน (Default) ให้ข้อความเป็น "React - Assessment"
    let title = "React - Assessment";

    // 2. ถ้า section ถูกเปลี่ยนเป็น 'user' ให้เปลี่ยนข้อความเป็นอีกแบบ
    if (section === "user") title = "Home - User Section";

    // 3. ถ้า section ถูกเปลี่ยนเป็น 'admin' ให้เปลี่ยนข้อความเป็นอีกแบบ
    if (section === "admin") title = "Home - Admin Section";

    return (
        // กล่องครอบข้อความ จัดให้อยู่ตรงกลาง (text-center) เว้นระยะบนล่าง (mt-10, mb-8)
        <div className="text-center mt-10 mb-8">
            {/* บรรทัดแรกคงที่เสมอ แสดงคำว่า Generation Thailand (ตัวใหญ่ หนา) */}
            <h1 className="text-4xl font-bold">Generation Thailand</h1>

            {/* บรรทัดที่สองใช้ตัวแปร {title} มาแสดงผล ซึ่งจะเปลี่ยนไปตามหน้า section 👆 */}
            <h1 className="text-4xl font-bold mt-2">{title}</h1>
        </div>
    );
};

// ส่ง Component นี้ออกไปให้ไฟล์อื่นเรียกใช้งานได้
export default HomeTitle;
