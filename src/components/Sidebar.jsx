import React from 'react'
import { Dashboard, Exit, History, Profile, TopUp, TransferMobile } from '../assets/Svg'
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ cName }) {
    const location = useLocation();
    const sz = (window.innerWidth < 768) ? '30%' : '20';

    const items = [
        { svg: <Dashboard isActive={location.pathname.startsWith('/dashboard')} size={sz} />, text: "Dashboard", link: '/dashboard' },
        { svg: <TransferMobile isActive={location.pathname.startsWith('/transaction/transfer')} size={sz} />, text: "Transfer", link: 'transaction/transfer' },
        { svg: <History isActive={location.pathname.startsWith('/transaction/history')} size={sz} />, text: "History", link: 'transaction/history' },
        { svg: <TopUp isActive={location.pathname.startsWith('/transaction/topup')} size={sz} />, text: "Top Up", link: 'transaction/topup' },
        { svg: <Profile isActive={location.pathname.startsWith('/profile/edit')} size={sz} />, text: "Profile", link: '/profile/edit' },
        { svg: <Exit isActive={location.pathname.startsWith('/')} size={sz} color='#f00' />, text: "Keluar", link: '/' },
    ];

    return (
        <aside
            className={`fixed md:static text-[3vw] border-t md:text-[18px] text-[#4F5665] ${cName} p-3 md:ps-[5%] pt-10 border-r border-[#E8E8E8] z-9999 bg-white md:bg-transparent flex bottom-0 md:flex-col w-screen md:w-full md:max-w-xs justify-between md:justify-start md:gap-8`}
        >
            {items.map((e) => {
                const isActive = location.pathname.startsWith(e.link);
                return (
                    <Link to={e.link} key={e.id}>
                        <Item
                            text={e.text}
                            svg={e.svg}
                            isActive={e.link != '/' && isActive}
                        />
                    </Link>
                )
            })}
        </aside>
    )
}

function Item({ text, isActive, svg }) {
    return (
        <div
            className={`flex flex-col md:flex-row items-center border border-transparent cursor-pointer gap-2 md:gap-3 p-2 rounded-md w-fit md:w-[90%]
        ${isActive ? "text-blue-800 md:bg-[#2948ff] md:text-white" : "text-[#4F5665] hover:border-[#c3c3c3]"}
        ${text === "Keluar" ? "text-[#D00000] hidden md:flex" : ""}`}
        >
            {svg}
            <p>{text}</p>
        </div>
    )
}

export default Sidebar
