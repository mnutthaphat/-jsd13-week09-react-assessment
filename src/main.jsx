import React from 'react' // นำเข้าไลบรารีหลักของ React
import ReactDOM from 'react-dom/client' // นำเข้าตัวจัดการ DOM สำหรับฝั่ง Client (เบราว์เซอร์)
import App from './App.jsx' // นำเข้า App ซึ่งคือ Root Component 
import './index.css' // นำเข้าสไตล์ CSS (ซึ่งโหลด Tailwind CSS v4 เอาไว้ในนั้น)

// สั่งเอา <App /> ไปเสียบลงใน tag <div> ที่มี id="root" ในหน้า index.html
ReactDOM.createRoot(document.getElementById('root')).render(
    // StrictMode ช่วยเช็ค Error ต่างๆ ตอนเขียนโค้ด (ทำงาน 2 รอบตอน Dev mode เพื่อให้หาง่ายขึ้น)
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
