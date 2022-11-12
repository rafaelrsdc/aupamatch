/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { Popover } from '@headlessui/react'
import { useMediaQuery } from 'usehooks-ts'
import { Link } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useTranslation } from "react-i18next";


import BRFLAG from "../assets/brasil-flag.svg"
import USFLAG from "../assets/eua-flag.svg"
import TranslationBar from "./TranslationBar";


const styles = {
  container: isZIndex => ({
    zIndex: 20
  })
}



export default function Topbar() {
  const isZIndex = useMediaQuery('(min-width: 375px)');
  const {t, i18n} = useTranslation();

  const changeLanguage = (ln) => {
    return() => {
      i18n.changeLanguage(ln)
    }
  }
  
  const handleSelectChange = event => {
  
    changeLanguage(event.target.value)
    console.log(event.target.value)
  
    window.location = window.location
  
  }

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 border-b-2 border-gray-100 ">
        <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/home" className="text-xl font-semibold mx-5 my-3 text-black hover:text-black" style={{ textDecoration: 'none' }}>AupaMatch</Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <Link to={"/login"} style={{textDecoration: 'none'}}>
              <a 
                href="#" 
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                {t("login")}
              </a>
            </Link>
            <Link to={"/register"} className="mr-4">
              <a
                href="#"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600"
              >
                {t("signup")}
              </a>
            </Link>
            <TranslationBar/>

          </div>
          

        </div>
        
        
      </div>

        <Popover.Panel focus 
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          style={styles.container(isZIndex)}>
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <Link to={"/register"}>
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600"
                    >
                      Cadastre-se
                    </a>
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Já possui uma conta?{' '}
                    <Link to={"/login"}>
                      <a href="#" 
                        className="text-indigo-600 hover:text-indigo-600"
                      >
                        Entrar
                      </a>
                    </Link>
                  </p>
                  <TranslationBar/>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
    </Popover>
  )
}
