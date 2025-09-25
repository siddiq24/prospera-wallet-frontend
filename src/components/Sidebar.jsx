import React from 'react'
import { Dashboard, Exit, History, Profile, TopUp, TransferMobile } from '../assets/Svg'

function Sidebar({ cName }) {
    const items = [
        { svg: <Dashboard isActive={true} />, text: "Dashboard", isActive: true },
        { svg: <TransferMobile />, text: "Transfer" },
        { svg: <History />, text: "History" },
        { svg: <TopUp />, text: "Top Up" },
        { svg: <Profile size={22} />, text: "Profile" },
        { svg: <Exit />, text: "Keluar" },
    ];

    return (
        <aside
            className={`fixed md:static text-[#4F5665] ${cName} p-3 ps-8 pt-5 border-r border-[#E8E8E8] z-9999 bg-white md:bg-transparent flex bottom-0 md:block w-screen md:w-min`}
        >
            {items.map((e, i) => {
                return <Item src={e.src} text={e.text} svg={e.svg} isActive={e.isActive} key={i} />
            })}
        </aside>
    )
}

function Item({ text, isActive, svg }) {
    return (
        <div
            className={`flex flex-col md:flex-row text-[#4F5665] items-center ${isActive ? "text-blue-800 md:bg-[#2948ff] md:text-white" : "hover:border-[#c3c3c3]"} border border-transparent cursor-pointer ${text == "Keluar" && "text-[#D00000] hidden md:flex"} gap-2 md:gap-3 p-2 px-2.5 rounded-md w-48 `}
        >
            {svg}
            < p
            > {text}</p >
        </div >
    )
}

export default Sidebar