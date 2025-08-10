import React from "react";
import LoginForm from "./LoginForm";
import Header from "../Header";
import Footer from "../Footer";


const LoginPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center bg-gray-100">
                <LoginForm />
            </main>
            <Footer />
        </div>
    )
}

export default LoginPage;