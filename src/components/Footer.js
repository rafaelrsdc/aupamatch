/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useTranslation } from 'react-i18next'

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


export default function Section() {
  const {t, i18n} = useTranslation();
    return (
        <section class="bg-white">
            <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
                <nav class="flex flex-wrap justify-center -mx-5 -my-2">
                    <div class="px-4 py-2">
                        <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                        {t("about")}
                        </a>
                    </div>
                    <div class="px-4 py-2">
                        <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                        {t("help")}
                        </a>
                    </div>
                    <div class="px-4 py-2">
                        <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                        {t("family")}
                        </a>
                    </div>
                    <div class="px-4 py-2">
                        <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                        {t("accessibility")}
                        </a>
                    </div>
                    <div class="px-4 py-2">
                        <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                        {t("contact")}
                        </a>
                    </div>
                    <div class="px-4 py-2">
                        <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                        {t("partners")}
                        </a>
                    </div>
                </nav>
                
                <p class="mt-8 text-base leading-6 text-center text-gray-400">
                    {t("@aupamatch")}
                </p>
            </div>
        </section>
    )   
}

