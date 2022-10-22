/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default function Footer() {
    return (
        <div className="mx-auto max-w-7xl bg-white py-8">
            <div className="flex justify-center gap-10 text-gray-600">
                <a>Sobre</a> 
                <a>Ajuda</a> 
                <a>Acessibilidade</a> 
                <a>Contato</a>
                <a>Parceiros</a>
            </div>
            <p className="flex justify-center mt-8 text-sm text-gray-500">© 2022 Workflow, Inc. All rights reserved.</p>
        </div>
    )   
}