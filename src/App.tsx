import './App.css'
import Navbar from "./components/Navbar.tsx";
import TopHeader from "./components/TopHeader/TopHeader.tsx";
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Login/Login.tsx";

function App() {


    return (
        <>
            <Routes>
                <Route path="/" element={
                    <>
                        <TopHeader/>
                        <Navbar/>
                    </>
                }/>
                {/* Add more routes here */}
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </>
    )
}

export default App
