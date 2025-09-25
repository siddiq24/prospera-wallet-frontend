import React from 'react'

const BurgerMenu = ({ size, cName, openMenu, setOpenMenu }) => {
    return <svg width={size} height={size} viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={cName} onClick={() => setOpenMenu(!openMenu)}>
        <path d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H15C15.2652 0 15.5196 0.105357 15.7071 0.292893C15.8946 0.48043 16 0.734784 16 1C16 1.26522 15.8946 1.51957 15.7071 1.70711C15.5196 1.89464 15.2652 2 15 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1Z" fill="white" />
        <path d="M0 13C0 12.7348 0.105357 12.4804 0.292893 12.2929C0.48043 12.1054 0.734784 12 1 12H15C15.2652 12 15.5196 12.1054 15.7071 12.2929C15.8946 12.4804 16 12.7348 16 13C16 13.2652 15.8946 13.5196 15.7071 13.7071C15.5196 13.8946 15.2652 14 15 14H1C0.734784 14 0.48043 13.8946 0.292893 13.7071C0.105357 13.5196 0 13.2652 0 13Z" fill="white" />
        <path d="M7 6C6.73478 6 6.48043 6.10536 6.29289 6.29289C6.10536 6.48043 6 6.73478 6 7C6 7.26522 6.10536 7.51957 6.29289 7.70711C6.48043 7.89464 6.73478 8 7 8H15C15.2652 8 15.5196 7.89464 15.7071 7.70711C15.8946 7.51957 16 7.26522 16 7C16 6.73478 15.8946 6.48043 15.7071 6.29289C15.5196 6.10536 15.2652 6 15 6H7Z" fill="white" />
    </svg>
}

const Dashboard = ({ size = 20, isActive }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`
            ${isActive ? "text-[#2948FF] md:text-white" : "text-[#4F5665]"}`}
        >
            <path d="M4.92265 5.43523L6.4874 7M22 12.5C22 18.0229 17.5229 22.5 12 22.5C6.47715 22.5 2 18.0229 2 12.5H22ZM22 12.5H20H22ZM22 12.5C22 9.7418 20.8833 7.24435 19.0774 5.43523L22 12.5ZM2 12.5H4H2ZM2 12.5C2 9.74175 3.1167 7.24435 4.92265 5.43523L2 12.5ZM12 2.5V4.5V2.5ZM12 2.5C14.7646 2.5 17.2672 3.62189 19.0774 5.43523L12 2.5ZM12 2.5C9.2354 2.5 6.7328 3.62189 4.92265 5.43523L12 2.5ZM19.0774 5.43523L17.5126 7L19.0774 5.43523Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 10.5V16.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.926 18.598C18.0976 20.9711 15.2273 22.5 11.9999 22.5C8.77248 22.5 5.90218 20.9711 4.07373 18.598C6.41033 17.2629 9.11603 16.5 11.9999 16.5C14.8837 16.5 17.5894 17.2629 19.926 18.598Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const TransferMobile = ({ size = 20, isActive }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isActive ? "text-[#2948FF] md:text-white" : "text-[#4F5665]"}`}>
            <path fillRule="evenodd" clipRule="evenodd" d="M18.0039 0.577294C18.6889 0.378019 19.431 0.570249 19.934 1.08253C20.437 1.5938 20.623 2.33957 20.418 3.02999L19.169 7.23188C19.05 7.63144 18.6339 7.85789 18.2359 7.73913C17.8389 7.61936 17.6129 7.19867 17.7319 6.80012L18.981 2.59722C19.051 2.36171 18.9259 2.2027 18.8689 2.14533C18.8119 2.08696 18.6519 1.96014 18.4209 2.02758L2.32937 6.70652C2.07336 6.781 2.01736 6.99537 2.00536 7.08394C1.99436 7.1725 1.99036 7.39392 2.21837 7.53482L5.60449 9.61816C5.9575 9.83555 6.0695 10.3005 5.85249 10.6568C5.71149 10.8883 5.46548 11.0171 5.21247 11.0171C5.07947 11.0171 4.94446 10.9819 4.82246 10.9064L1.43634 8.82206C0.765318 8.40942 0.413305 7.66667 0.518309 6.88265C0.623313 6.09762 1.15833 5.47464 1.91336 5.25523L18.0039 0.577294ZM16.5282 10.8492C16.6482 10.4487 17.0652 10.2212 17.4622 10.342C17.8592 10.4618 18.0852 10.8824 17.9662 11.282L15.6441 19.096C15.4191 19.8519 14.7971 20.3833 14.0201 20.4829C13.9331 20.495 13.8471 20.5 13.7611 20.5C13.083 20.5 12.463 20.1518 12.102 19.5539L8.00187 12.7645C7.82286 12.4666 7.86786 12.0841 8.11287 11.8386L13.9341 5.98007C14.2271 5.68518 14.7011 5.68518 14.9941 5.98007C15.2871 6.27496 15.2871 6.75302 14.9941 7.04791L9.58992 12.4877L13.3841 18.7699C13.5221 18.9984 13.7391 18.9964 13.8291 18.9863C13.9171 18.9742 14.1301 18.9199 14.2061 18.6643L16.5282 10.8492Z" fill="currentColor"/>
        </svg>
    )
}

const History = ({ size = 20, isActive }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isActive ? "text-[#2948FF] md:text-white" : "text-[#4F5665]"}`}>
            <path d="M2.90918 3.86365V7.5H6.54556" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12.5C2 18.0229 6.47715 22.5 12 22.5C17.5229 22.5 22 18.0229 22 12.5C22 6.97715 17.5229 2.5 12 2.5C8.299 2.5 5.06755 4.51056 3.33839 7.49905" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.0026 6.5L12.002 12.5044L16.2417 16.7441" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const TopUp = ({ size = 20, isActive }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isActive ? "text-[#2948FF] md:text-white" : "text-[#4F5665]"}`}>
            <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="7" width="20" height="15">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 7.2941H20V21.0381H0V7.2941Z" fill="white"/>
            </mask>
            <g mask="url(#mask0)">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.5655 21.0381H4.43549C1.99049 21.0381 0 19.0491 0 16.6031V11.7281C0 9.2831 1.99049 7.2941 4.43549 7.2941H5.36849C5.78249 7.2941 6.11849 7.6301 6.11849 8.0441C6.11849 8.4581 5.78249 8.7941 5.36849 8.7941H4.43549C2.81649 8.7941 1.50049 10.1101 1.50049 11.7281V16.6031C1.50049 18.2221 2.81649 19.5381 4.43549 19.5381H15.5655C17.1835 19.5381 18.5005 18.2221 18.5005 16.6031V11.7191C18.5005 10.1061 17.1885 8.7941 15.5765 8.7941H14.6335C14.2195 8.7941 13.8835 8.4581 13.8835 8.0441C13.8835 7.6301 14.2195 7.2941 14.6335 7.2941H15.5765C18.0155 7.2941 20.0005 9.2791 20.0005 11.7191V16.6031C20.0005 19.0491 18.0105 21.0381 15.5655 21.0381Z" fill="currentColor"/>
            </g>
            <mask id="mask1" maskUnits="userSpaceOnUse" x="9" y="0" width="2" height="15">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.25 0.5H10.75V14.041H9.25V0.5Z" fill="white"/>
            </mask>
            <g mask="url(#mask1)">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 14.041C9.586 14.041 9.25 13.705 9.25 13.291V1.25C9.25 0.836 9.586 0.5 10 0.5C10.414 0.5 10.75 0.836 10.75 1.25V13.291C10.75 13.705 10.414 14.041 10 14.041Z" fill="currentColor"/>
            </g>
            <path fillRule="evenodd" clipRule="evenodd" d="M7.0852 4.92868C6.8942 4.92868 6.7022 4.85568 6.5562 4.70968C6.2632 4.41768 6.2612 3.94368 6.5542 3.64968L9.4692 0.72168C9.7502 0.43868 10.2502 0.43868 10.5312 0.72168L13.4472 3.64968C13.7392 3.94368 13.7382 4.41768 13.4452 4.70968C13.1512 5.00168 12.6772 5.00168 12.3852 4.70768L10.0002 2.31368L7.6162 4.70768C7.4702 4.85568 7.2772 4.92868 7.0852 4.92868Z" fill="currentColor"/>
        </svg>
    )
}

const Profile = ({ size = 20, isActive }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isActive ? " text-blue-600 md:text-white" : "text-[#4F5665]"}`}>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.59151 15.7068C13.2805 15.7068 16.4335 16.2658 16.4335 18.4988C16.4335 20.7318 13.3015 21.3068 9.59151 21.3068C5.90151 21.3068 2.74951 20.7528 2.74951 18.5188C2.74951 16.2848 5.88051 15.7068 9.59151 15.7068Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.59157 12.5198C7.16957 12.5198 5.20557 10.5568 5.20557 8.13479C5.20557 5.71279 7.16957 3.74979 9.59157 3.74979C12.0126 3.74979 13.9766 5.71279 13.9766 8.13479C13.9856 10.5478 12.0356 12.5108 9.62257 12.5198H9.59157Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.4829 11.3816C18.0839 11.1566 19.3169 9.78259 19.3199 8.11959C19.3199 6.48059 18.1249 5.12059 16.5579 4.86359" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5952 15.2322C20.1462 15.4632 21.2292 16.0072 21.2292 17.1272C21.2292 17.8982 20.7192 18.3982 19.8952 18.7112" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const Exit = ({ size = 20, isActive }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${isActive ? "md:text-white" : "text-red-600"} text-blue-600`}>
            <path d="M13 8.125L13 5.5C13 3.84315 14.3431 2.5 16 2.5L19 2.5C20.6569 2.5 22 3.84315 22 5.5L22 19.5C22 21.1569 20.6569 22.5 19 22.5L16 22.5C14.3431 22.5 13 21.1569 13 19.5L13 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M5 15.5L2.44194 12.9419C2.19786 12.6979 2.19786 12.3021 2.44194 12.0581L5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 12.5L3 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
}

export { BurgerMenu, Dashboard, TransferMobile, History, TopUp, Profile, Exit }