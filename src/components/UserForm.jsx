const UserForm = ({ formData, setFormData, handleCreate }) => {
    return (
        <div className="w-full max-w-4xl mx-auto mb-10">
            <h2 className="text-xl font-bold mb-4 font-sans text-gray-800">Create User Here</h2>

            {/* เมื่อผู้ใช้กดปุ่ม Save (type="submit") หรือกด Enter จะเป็นการ trigger onSubmit มอบหมายไปเรียกใช้ handleCreate ฝั่งแม่ */}
            <form onSubmit={handleCreate} className="flex gap-4 items-center">

                {/* Controlled Components ถือไว้ทั้ง value เพื่ออ่านจาก state และ onChange เพื่อเขียนค่ากลับไปที่ state */}
                <input
                    type="text"
                    placeholder="Name"
                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={formData.name} // ล็อคค่าที่แสดงผลให้ตรงกับ state formData.name เสมอ
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} // ถ้าผู้ใช้พิมพ์ ก็อัดค่าใหม่ (e.target.value) เข้าไปทับ property 'name' ของ formData
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} // อัปเดตเฉพาะนามสกุล (...formData คือรักษาค่าเก่าของ name, position ไว้)
                />

                <input
                    type="text"
                    placeholder="Position"
                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })} // อัปเดตเฉพาะตำแหน่ง
                />

                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-md hover:bg-indigo-600 focus:outline-none"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default UserForm;
