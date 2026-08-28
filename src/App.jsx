import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ใช้โครงสร้าง Router แบบใหม่ตามโค้ดเก่า
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import NotFoundPage from "./pages/NotFoundPage";

// สร้าง Router ต้นไม้หลัก (Tree)
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,       // โครงหน้าเว็บหลัก
        errorElement: <NotFoundPage />, // หน้า 404 (ดักทุกหน้าที่มี Error ในลูกๆ)
        children: [
            { path: "", element: <Home /> },        // หน้าแรก
            { path: "owner", element: <Owner /> }  // หน้า /owner
        ]
    }
]);

function App() {
    // โยน router ที่เราสร้างเข้าไปใน Provider
    return <RouterProvider router={router} />;
}

export default App;
