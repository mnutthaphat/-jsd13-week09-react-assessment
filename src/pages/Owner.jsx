// Component หน้า Owner สำหรับโชว์ข้อความแนะนำตัวง่ายๆ
const Owner = () => {
    return (
        // กล่องครอบข้อความ จัดให้อยู่ตรงกลาง (items-center) และดันลงมา 20 หน่วย (mt-20)
        <div className="flex flex-col items-center mt-20">
            <h1 className="text-4xl font-bold flex items-center gap-4">
                React Assessment <span role="img" aria-label="muscle">💪</span>
            </h1>
        </div>
    );
};

export default Owner;
