# My Understanding: React Assessment

ไฟล์นี้จัดทำขึ้นเพื่ออธิบายแนวคิดและการออกแบบทางเทคนิค (Technical Design Decisions) ที่ใช้ในการสร้างโปรเจกต์ React Assessment นี้ครับ

---

### 1. Explain how and why you divided the app's UI into components
**ตอบ:** ผมแบ่ง UI ของแอปออกเป็น Component ย่อยๆ ได้แก่ `HomeTitle`, `SectionButtons`, `MemberTable`, และ `UserForm` รวมไปถึง Component สำหรับโครงสร้างพื้นฐานอย่าง `NavBar` และ `Layout`
**เหตุผล:** เพื่อให้โค้ดแต่ละส่วนทำหน้าที่อย่างใดอย่างหนึ่ง (Single Responsibility) ทำให้โค้ดไม่รกรุงรังอยู่ในไฟล์ `Home.jsx` ไฟล์เดียว การแบ่ง Component ช่วยให้อ่านโค้ดง่ายขึ้น แก้ไขหรือหาบั๊กได้รวดเร็วขึ้น รวมถึงสามารถนำ Component กลับมาใช้ซ้ำ (Reusable) ในอนาคตได้ง่าย

### 2. What state variables did you create and why?
**ตอบ:** ผมสร้าง State ไว้ดูแลข้อมูล 3 ตัวหลักๆ ภายใน Custom Hook (`useMembers.jsx`) ดังนี้:
- `section`: เก็บค่าสถานะ ('normal', 'user', 'admin') เพื่อนำไปใช้เช็คเงื่อนไขว่าตอนนี้ผู้ใช้อยู่หน้าที่ต้องแสดงผลตารางหรือแสดงผลแบบฟอร์ม (Conditional Rendering)
- `members`: เก็บข้อมูลรายชื่อพนักงานแบบ Array เพื่อเวลามีการดึงข้อมูลจาก API มาใหม่ จะได้นำมาวนลูปแสดงผลบนตารางได้ทันที
- `formData`: เก็บข้อมูลชั่วคราวเป็น Object `{ name, lastName, position }` จากช่อง `<input>` เพื่อเตรียมรวบรวมส่งไปบันทึกผ่าน API 

### 3. How did you manage these states? Was it via Passing Props or React Context, why?
**ตอบ:** ผมจัดการ State ด้วยการโอนผ่านตัวแปร (Passing Props) จาก `Home.jsx` ลงไปยัง Component ลูกๆ ครับ
**เหตุผล:** ในโปรเจกต์ขนาดเล็กถึงปานกลาง โครงสร้างความลึกของ Component ยังไม่ได้ซ้อนกันหลายชั้น (ไม่เกิดปัญหา Prop Drilling) การส่ง Props ลงไปตรงๆ ทำให้เรามองเห็นการเคลื่อนที่ของข้อมูลจากแม่ไปลูกได้ชัดเจนกว่า และง่ายต่อการเขียนและทำความเข้าใจครับ ในขณะที่ React Context จะเหมาะกับแอปขนาดใหญ่ที่มี UI ซ้อนกันลึกมากและต้องใช้ State รวมกันบ่อยๆ

### 4. Explain how and why you used the useEffect hook?
**ตอบ:** ผมใช้ `useEffect` โดยกำหนด Dependency Array คลุมไว้เป็นค่าว่าง `[]` เพื่อสั่งให้ฟังก์ชัน `getMembers()` ซึ่งทำหน้าดึงข้อมูลสมาชิกจาก API ทำงาน **เพียงแค่ 1 ครั้งแรกเท่านั้น** ทันทีที่ Component ถูกโชว์ขึ้นมาบนหน้าเว็บปุ๊บ (Mount) ถ้าไม่มี useEffect การเรียก API จะถูกผูกกับ Render Cycle ปกติ ซึ่งจะทำให้ React เผลอยิง API รัวๆ ซ้ำๆ แบบไม่รู้จบทุกครั้งที่ State เปลี่ยนแปลงครับ

### 5. Explain whether you could and why, you would use fetch() without using useEffect?
**ตอบ:** ทำได้ครับ ปกติเราสามารถใช้ `fetch()` (หรือ `axios.get/post`) นอก `useEffect` ได้ในกรณีที่การเชื่อมต่อ API นั้น **ถูกสั่งการทำงานผ่านเหตุการณ์ที่ผู้ใช้เป็นคนกระทำ (Event Handler)** อย่างเช่นในฟังก์ชัน `handleCreate` และ `handleDelete` ที่ผมออกแบบไว้ ตัวแอปจะยังไม่ส่งคำสั่ง Fetch ไปจนกว่าผู้ใช้จะกดปุ่ม (onClick/onSubmit) จึงไม่ต้องพึ่งพา Lifecycle อย่าง useEffect เลยครับ

### 6. Explain whether the use of fetch() should be synchronous or asynchronous JavaScript, why?
**ตอบ:** การใช้ `fetch()` จำเป็นต้องเป็น **Asynchronous (อซิงโครนัส)** เสมอครับ
**เหตุผล:** การคุยกับเซิร์ฟเวอร์ย่อมเกิดความล่าช้า (Network Delay) หากเราใช้แบบ Synchronous หน้าเว็บเราจะโหลดค้างหรือค้างชะงัก (Block the UI) ระหว่างรอคำตอบจากเซิร์ฟเวอร์ การใช้แบบ Asynchronous (เช่นการใช้ `async/await`) จะช่วยให้เบราว์เซอร์สามารถประมวลผลวาดหน้า UI อื่นต่อไปได้ขณะที่กำลังรอหลังบ้านส่งข้อมูลกลับมา ทำให้ผู้ใช้ยังกดเล่นเว็บได้ลื่นไหลครับ

### 7. Include any other notes about React and Frontend Web Development you want to use to summarize your understanding of this technical domain.
**ตอบ:** จาก Assessment นี้ ทำให้ผมเข้าใจวงจรชีวิตและการผสมผสานเครื่องมือหลัก 4 อย่างให้เข้ากัน ได้แก่: 
1. **React Router** สำหรับการสลับหน้าไปมาโดยไม่ต้องรีเฟรช สร้างประสบการณ์ใช้งานที่รวดเร็ว (SPA)
2. **State & Effect** การแยกแยะว่าตอนไหนควรจับข้อมูลเก็บไว้ และตอนไหนควรปล่อยให้หน้าเว็บวิ่งไปโหลดข้อมูลใหม่
3. **Controlled Component** การล็อก Input ในฟอร์มด้วย React State เป็นเทคนิคที่สำคัญที่สุดในการจัดการฟอร์ม
4. **Tailwind CSS** การเขียน Design ให้ออกมาจัดเรียงง่าย อ่านง่าย และตอบโจทย์ Responsive ทันที

**ข้อสงสัยส่วนตัว (Questions I have):** อยากศึกษาเพิ่มเติมเกี่ยวกับการจัดการ State ระดับโกลบอลด้วย Redux Toolkit หรือ Zustand เพื่อรันแอปพลิเคชันที่มีความซับซ้อนและมี Section ย่อยมากกว่านี้ในอนาคตครับ
