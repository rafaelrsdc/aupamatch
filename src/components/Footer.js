/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const list = [
    "Sobre",
    "Ajuda",
    "Acessibilidade", 
    "Contato",
    "Parceiros"
]

const listItems = list.map((item) =>
    <a className="text-gray-500 hover:text-gray-900" key={item}>
      {item}
    </a>
);

export default function Footer() {
    return (
        <div className="mx-auto max-w-7xl bg-white py-8">
            <div className="list flex justify-center gap-10">
                {listItems} 
            </div>
        </div>
    )   
}

