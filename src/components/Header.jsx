import React from 'react'

function Header({ title, img, Icon = () => { } }) {
    if (window.innerWidth > 768) {
        return (
            <div className="px-10 py-8">
                <div className="flex items-center gap-3">
                    <img src={img} alt="" />
                    {Icon(35, '#2948FF')}
                    <h1 className="text-xl font-semibold text-gray-900">
                        {title}
                    </h1>
                </div>
            </div>
        )
    } else {
        return <div className="bg-blue-600 flex gap-3 text-white p-4">
            {Icon(25, '#ffffff')}
            <h1 className="text-lg font-semibold text-left">
                {title}
            </h1>
        </div>
    }
}

export default Header