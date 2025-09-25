import React from 'react'
import { Dashboard, Exit, History, Profile, TopUp, TransferMobile } from '../assets/Svg'
import { Link } from 'react-router-dom';

function Sidebar({ cName }) {
    const sz = (window.innerWidth<768)? '30%':'20';
    const items = [
        { svg: <Dashboard isActive={true} size={sz}/>, text: "Dashboard", isActive: true, link:'/dashboard' },
        { svg: <TransferMobile size={sz}/>, text: "Transfer", link:'/' },
        { svg: <History size={sz}/>, text: "History", link:'/' },
        { svg: <TopUp size={sz}/>, text: "Top Up", link:'/' },
        { svg: <Profile size={sz} />, text: "Profile", link:'/profile/edit' },
        { svg: <Exit size={sz}/>, text: "Keluar", link:'/' },
    ];

    return (
        <aside
            className={`fixed md:static text-[3vw] border-t md:text-[18px] text-[#4F5665] ${cName} p-3 md:ps-8 pt-5 border-r border-[#E8E8E8] z-9999 bg-white md:bg-transparent flex bottom-0 md:block w-screen md:w-min justify-between`}
        >
            {items.map((e, i) => {

                return (
                    <Link to={e.link}>
                        <Item src={e.src} text={e.text} svg={e.svg} isActive={e.isActive} key={i} />
                    </Link>
                )
            })}
        </aside>
    )
}

function Item({ text, isActive, svg }) {
    return (
        <div
            className={`flex flex-col md:flex-row text-[#4F5665] items-center ${isActive ? "text-blue-800 md:bg-[#2948ff] md:text-white" : "hover:border-[#c3c3c3]"} border border-transparent cursor-pointer ${text == "Keluar" && "text-[#D00000] hidden md:flex"} gap-2 md:gap-3 p-2 px-2 rounded-md w-fit md:w-48 `}
        >
            {svg}
            < p
            > {text}</p >
        </div >
    )
}

export default Sidebar