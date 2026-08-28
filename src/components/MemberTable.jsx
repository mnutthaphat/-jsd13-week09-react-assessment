const MemberTable = ({ members, section, handleDelete }) => {
    // สร้างตัวแปรเช็คว่าสถานะตอนนี้หน้าเว็บเป็น admin หรือไม่ สังเกตจากค่าของ section
    const isAdmin = section === "admin";

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="text-gray-500 mb-2 font-medium">Table 1</div>

            {/* โครงสร้างตาราง HTML */}
            <div className="bg-white rounded border overflow-hidden">
                <table className="w-full text-center border-collapse">

                    {/* หัวตาราง */}
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="py-3 px-4 border-r border-gray-200">Name</th>
                            <th className="py-3 px-4 border-r border-gray-200">Last Name</th>
                            <th className="py-3 px-4 border-r border-gray-200">Position</th>
                            {/* แสดงคอลัมน์ Action ก็ต่อเมื่อ isAdmin เป็นจริงเท่านั้น (เป็นแอดมิน) */}
                            {isAdmin && <th className="py-3 px-4">Action</th>}
                        </tr>
                    </thead>

                    {/* เนื้อหาในตาราง */}
                    <tbody>
                        {/* เช็คว่ามี members ส่งมามั้ย และมีความยาวอาเรย์มากกว่า 0 หรือเปล่า (แปลว่ามีข้อมูล) */}
                        {members && members.length > 0 ? (
                            // เอา array อาเรย์มาวนลูป (map) เพื่อวาดแถว <tr> ทีละคน
                            members.map((member) => (
                                // เวลา map ต้องใส่ prop key เสมอเพื่อให้ React ระบุตัวตนได้
                                <tr key={member.id} className="border-b">
                                    <td className="py-3 px-4 border-r border-gray-200">{member.name}</td>
                                    <td className="py-3 px-4 border-r border-gray-200">{member.lastName}</td>
                                    <td className="py-3 px-4 border-r border-gray-200">{member.position}</td>

                                    {/* ถ้าเป็นแอดมิน ให้โชว์คอลัมน์สุดท้ายที่เป็นปุ่ม Delete */}
                                    {isAdmin && (
                                        <td className="py-3 px-4">
                                            <button
                                                // เวลาถูกคลิก ให้เรียกใช้งาน handleDelete พร้อมแนบรหัส ID ของคนนั้นไปด้วย
                                                onClick={() => handleDelete(member.id)}
                                                className="text-red-500 font-semibold hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            // กรณีที่ขวาของเงื่อนไข (ไม่มีข้อมูลคนเลย) เราจะวนลูปสร้างตารางเปล่าขึ้นมา 3 แถว เฉยๆ เพื่อความสวยงามเหมือนใน Mockup
                            [1, 2, 3].map((_, i) => (
                                <tr key={i} className="border-b last:border-b-0 h-10">
                                    <td className="border-r border-gray-200"></td>
                                    <td className="border-r border-gray-200"></td>
                                    <td className="border-r border-gray-200"></td>
                                    {/* ถ้าเป็นแอดมินก็ต้องสร้างคอลัมน์เปล่าๆ แถมเผื่อไว้ด้วย 1 ช่อง */}
                                    {isAdmin && <td></td>}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MemberTable;
