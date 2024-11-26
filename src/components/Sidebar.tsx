"use client"
import { Urls } from '@/model/global'
import { GiReceiveMoney } from 'react-icons/gi'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { GiPayMoney } from 'react-icons/gi'
import { TbReportAnalytics } from 'react-icons/tb'
import { FaChartBar, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from 'next-themes'


const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { setTheme, theme } = useTheme()

    const menuItems = [
        { label: "Dashboard", icon: <FaChartBar size={isOpen ? 32 : 24} />, link: Urls.Dashboard },
        { label: "Gelirler", icon: <GiReceiveMoney size={isOpen ? 32 : 24} />, link: Urls.Income },
        { label: "Giderler", icon: <GiPayMoney size={isOpen ? 32 : 24} />, link: Urls.Expenses },
        { label: "İşlemler", icon: <TbReportAnalytics size={isOpen ? 32 : 24} />, link: Urls.Transactions },
    ]

    return (
        <>
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary dark:bg-dark-primary text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {<FaBars size={24} />}
            </button>

            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`
                fixed md:static
                inset-y-0 left-0
                bg-primary dark:bg-dark-secondary 
                px-3 py-10 h-full
                text-white z-50
                transition-transform duration-300
                w-64
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex justify-between items-center">
                    <Link href={Urls.Dashboard} className='w-min block'>
                        <div className="text-xl font-bold whitespace-nowrap">Budget App</div>
                    </Link>


                </div>

                <FaTimes size={24} className='fixed md:hidden top-4 right-4 cursor-pointer' onClick={() => setIsOpen(false)} />

                <nav className='mt-10'>
                    <ul className="flex flex-col gap-4">
                        {menuItems.map((menuItem, idx) => (
                            <Link
                                key={idx}
                                href={menuItem.link}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 p-2 rounded-lg transition-all duration-300 cursor-pointer
                                    hover:bg-primary-hover dark:hover:bg-dark-primary-hover
                                    ${pathname === menuItem.link ? "bg-primary-hover dark:bg-dark-primary-hover" : ""}
                                `}
                            >
                                <span className="text-lg">{menuItem.icon}</span>
                                <span>{menuItem.label}</span>
                            </Link>
                        ))}
                    </ul>
                </nav>

                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="absolute bottom-4 right-4 p-2 rounded-lg bg-primary-hover dark:bg-dark-primary-hover"
                >
                    {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
                </button>
            </div>
        </>
    )
}

export default Sidebar