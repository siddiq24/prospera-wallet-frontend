import React from 'react'

function Header({ title, img, Icon = null }) {
    if (window.innerWidth > 768) {
        return (
            <div className="py-8">
                <div className="flex items-center gap-3">
                    <img src={img} alt="" />
                     {Icon && <Icon size={35} color="#2948FF" />}
                    <h1 className="text-xl font-semibold text-gray-900">
                        {title}
                    </h1>
                </div>
            </div>
        )
    } else {
        return <div className="bg-blue-600 flex gap-3 text-white px-8 py-4">
            {Icon && <Icon size={25} color="#FFFFFF" />}
            <h1 className="text-lg font-semibold text-left">
                {title}
            </h1>
        </div>
    }
}

export default Header