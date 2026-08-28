import HomeTitle from "../components/HomeTitle"; // นำเข้า Component ส่วนหัว (แสดงข้อความ Generation Thailand...)
import UserForm from "../components/UserForm"; // นำเข้า Component แบบฟอร์มเพิ่มผู้ใช้
import MemberTable from "../components/MemberTable"; // นำเข้า Component ตารางรายชื่อ
import SectionButtons from "../components/SectionButtons"; // นำเข้า Component ปุ่มเมนูหลัก (User / Admin)
import { useMembers } from "../hooks/useMembers"; // นำเข้า Hook ของเราที่สร้างไว้จัดการ State และ API 

const Home = () => {
    // แตกตัวแปรและฟังก์ชันทั้งหมดที่ return มาจากกล่อง (hook) เพื่อเอามาใช้ในหน้านี้แบบง่ายๆ
    const {
        section, // ค่า State สำหรับสลับหน้า
        setSection, // ฟังก์ชันใช้สลับหน้าไปมา
        members, // รายชื่่อพนักงานทั้งหมดจาก API/หรือ Local State
        formData, // ข้อมูลในฟอร์ม ณ ตอนนี้
        setFormData, // เปลียนข้อมูลในฟอร์มตอนพิมพ์
        handleCreate, // ฟังก์ชันกด Save
        handleDelete, // ฟังก์ชันกด Delete เพื่อลบ
    } = useMembers();

    return (
        // div ที่จัดการจัดวางให้อยู่ตรงกลางหน้า (Tailwind CSS)
        <div className="w-full px-4 flex flex-col items-center">

            {/* 1) แสดงหัว Title ตลอดเวลา และส่ง State ไปเพื่อเช็คว่าจะโชว์คำทักทายของ User หรือ Admin */}
            <HomeTitle section={section} />

            {/* 2) แสดงปุ่มกด ส่ง setSection ไปให้ปุ่มสลับหน้าได้ */}
            <SectionButtons setSection={setSection} />

            {/* 3) การแสดงผลแบบมีเงื่อนไข (Conditional Rendering) */}
            {/* จะโชว์ <UserForm /> ก็ต่อเมื่อ section เป็นค่า "admin" เท่านั้น (เงื่อนไขเป็นจริง) */}
            {section === "admin" && (
                <UserForm
                    formData={formData} // ส่ง Object ฟอร์มไป
                    setFormData={setFormData} // เอาไปจับ Event onChange ให้ตัวหนังสือเปลี่ยนตามนิ้วพิมพ์
                    handleCreate={handleCreate} // เอาไปผูกตอนกด submit
                />
            )}

            {/* 4) จะโชว์ตารางก็ต่อเมื่อหน้า section ไม่เท่ากับ "normal" */}
            {/* หมายความว่าตารางนี้จะขึ้นมาโชว์ในกรณีที่เป็นหน้า user หรือ admin เท่านั้นนะ! */}
            {section !== "normal" && (
                <MemberTable
                    members={members} // ส่งรายชื่อคนทั้งหมดไปทำการวนลูป map เป็นตาราง
                    section={section} // ส่ง section ไปเช็คเงื่อนไขย่อย (ในตารางถ้าเป็นโหมดแอดมิน จะเปิดปุ่มถังขยะ)
                    handleDelete={handleDelete} // มอบปุ่ม Delete ส่งไปที่ Component ย่อย
                />
            )}
        </div>
    );
};

export default Home; // ส่งออกเพื่อให้ App.jsx ดึงไปใส่ Router ได้
