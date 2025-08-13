import React from "react";
import RegistrationForm from "./RegistrationForm";



const RegistrationPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            
            <main className="flex-grow flex items-center justify-center bg-gray-100">
                <RegistrationForm />
            </main>
           
        </div>
    )
}

export default RegistrationPage;