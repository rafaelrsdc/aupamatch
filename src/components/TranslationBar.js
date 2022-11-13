/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";

import { useTranslation } from "react-i18next";

import BRFLAG from "../assets/brasil-flag.svg"
import USFLAG from "../assets/eua-flag.svg"

export default function TranslationBar() {
  const { i18n} = useTranslation();

  const changeLanguage = (ln) => {
    return() => {

      i18n.changeLanguage(ln)
    }
  }

  const getlanguage = () => {
    return(

      i18n.language
    )
    
  }
  
  return (

          <div className="flex w-10">
          <img src={BRFLAG} className="mr-1" alt="my image" onClick={changeLanguage("pt")}/>
            <img src={USFLAG} className="ml-1" alt="my image" onClick={changeLanguage("en")}/> 
          </div>
        
  )
}
