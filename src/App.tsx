import './App.css'
import {Footer} from './components/Footer/Footer.tsx';
import {Login} from './components/Login/Login.tsx';
import TopHeader from "./components/TopHeader/TopHeader.tsx";
import {Route, Routes} from "react-router-dom";

function App() {


    return (
        <>
            <TopHeader/>
            <Routes>
                <Route path="/" element={<h1>Home</h1>}/>
            {/*    <Route path="/about" element={<h1>About</h1>}/>*/}
            {/*    <Route path="/services" element={<h1>Services</h1>}/>*/}
            {/*    <Route path="/contact" element={<h1>Contact</h1>}/>*/}
                <Route path="/login" element={<Login/>}/>
            </Routes>
            <Footer></Footer>
        </>
    )
}

export default App
