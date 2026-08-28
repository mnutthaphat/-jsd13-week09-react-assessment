import { useState, useEffect } from "react"; // นำเข้า hook จาก React เพื่อใช้จัดการ State และ Life cycle
import axios from "axios"; // นำเข้าไลบรารี axios สำหรับดึงและส่งข้อมูลกับ API

// ⚠️ ใส่ URL ของ MockAPI ของคุณที่นี่
const API_URL = "https://6a9132b07751d35ce47e45ca.mockapi.io/members"; // เป็นตัวแปรเก็บที่อยู่ API (Endpoint)

export const useMembers = () => {
    // 1. setState สำหรับกำหนดว่าตอนนี้อยู่หน้าไหน (normal, user, admin)
    const [section, setSection] = useState("normal");

    // 2. setState สำหรับเก็บข้อมูลรายชื่อสมาชิกในตาราง (เริ่มต้นเป็น array ว่าง array รอเก็บ Object ของ user)
    const [members, setMembers] = useState([]);

    // 3. setState สำหรับเก็บข้อมูลที่ผู้ใช้พิมพ์ลงใน Form (รับค่า name, lastName, position)
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        position: "",
    });

    // ฟังก์ชันสำหรับดึงข้อมูล (Read) รายชื่อสมาชิกทั้งหมดจาก API
    const getMembers = async () => {
        try {
            // ดัก Error ในกรณีที่นักเรียนยังไม่ได้เปลี่ยน URL
            if (API_URL.includes("your-project-id")) return;

            // รอ (await) การดึงข้อมูลจาก API แบบ GET request
            const response = await axios.get(API_URL);

            // พอได้ข้อมูลมาแล้ว (response.data) ให้เอาไปใส่ใน State ทันทีเพื่อให้แสดงบนหน้าจอ
            setMembers(response.data);
        } catch (error) {
            console.error("เกิดข้อผิดพลาดตอนดึงข้อมูลสมาชิก:", error);
        }
    }

    // useEffect ทำงานแบบไม่มีเงื่อนไข [ ] แปลว่าจะทำแค่ครั้งแรกตอนที่ถูก render (เริ่มเรียกข้อมูลทันทีที่เปิดแอป)
    useEffect(() => {
        getMembers(); // เรียกใช้ฟังก์ชันด้านบนเพื่อดึงข้อมูล API 
    }, []);

    // ฟังก์ชันสำหรับสร้างสมาชิกใหม่ (Create) ผูกกับปุ่ม Save
    const handleCreate = async (e) => {
        e.preventDefault(); // ป้องกันการ Refresh หน้าเว็บทุกครั้งที่กด Submit Form

        // เช็คความถูกต้อง (Validation) ถ้ายังไม่กรอกช่องใดช่องหนึ่ง ให้หยุดการทำงาน (return) กลับไปเลย
        if (!formData.name || !formData.lastName || !formData.position) return;

        try {
            if (!API_URL.includes("your-project-id")) {
                // ถ้ามี URL ให้เอาค่าใน formData ไปส่งเข้า Database (API_URL) ผ่าน method POST
                await axios.post(API_URL, formData);

                // หลังจากล้างค่าเก่า ให้รีเซ็ตค่า formData เป็นค่าว่าง (เคลียร์ช่องกรอกข้อความ)
                setFormData({ name: "", lastName: "", position: "" });

                // เรียก getMembers เพื่อไป fetch ข้อมูลทุกตัวมาใหม่ ทำให้ข้อมูลบนตารางอัปเดตแบบเรียลไทม์
                getMembers();
            } else {
                // โค้ดส่วนดักจำลอง ถ้ายังไม่ได้โยง API (สร้าง ID จำลอง + ดัน formData เข้า state members สดๆ)
                setMembers([
                    ...members,
                    {
                        id: crypto.randomUUID(),
                        name: formData.name,
                        lastName: formData.lastName,
                        position: formData.position,
                    },
                ]);
                setFormData({ name: "", lastName: "", position: "" });
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดตอนสร้างสมาชิก:", error);
        }
    };

    // ฟังก์ชันลบสมาชิก (Delete) เอา id จากปุ่ม Delete ส่งเข้ามาทำงาน
    const handleDelete = async (id) => {
        try {
            if (!API_URL.includes("your-project-id")) {
                // ต่อ Endpoint URL ย่อย โดยเอา ID ไปต่อท้าย (เช่น URL/15) แล้วใช้ method DELETE
                await axios.delete(`${API_URL}/${id}`);
                // เรียกรันฟังก์ชันดึงค่าซ้ำ เพื่ออัปเดตหน้า UI หลังจากลบไปแล้ว
                getMembers();
            } else {
                // ลบแบบ Local: แยกร่าง array เดิม คัดเลือก (filter) เอาตัวที่รหัส id ไม่ตรงกับตัวที่จะลบกลับมา
                setMembers(members.filter((member) => member.id !== id));
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาดตอนลบสมาชิก:", error);
        }
    };

    // จัดกลุ่มการประกาศ state และ methods ส่งออก (return) ไปให้ Component อื่นใช้งาน
    return {
        section,
        setSection,
        members,
        formData,
        setFormData,
        handleCreate,
        handleDelete,
    };
};
