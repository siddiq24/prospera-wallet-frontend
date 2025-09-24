import React, { useState } from 'react'
import { Mail, Pencil, Phone, Profile, Trash } from '../../components/profile/Svg'
import { Link } from 'react-router-dom'

function EditProfile() {
    const userData = {
        fullname: 'Sidik Wisnu Sasmito',
        phone: '081234567890',
        email: 'sidik@example.com',
    }

    const [formData, setFormData] = useState({
        fullname: userData.fullname || '',
        phone: userData.phone || '',
        email: userData.email || '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    // let profileUrl = 'https://avatar.iran.liara.run/public/12'
    let profileUrl = ''
    let Avatar = () => { return profileUrl ? (<img src={profileUrl} />) : (<Profile size={50} />) }
    return (
        <div className='p-8'>
            <p>Profile Picture</p>
            <div>
                <section className='flex mt-4'>
                    <div className='flex justify-center items-center rounded-xl bg-[#E8E8E84D] aspect-square h-33'>
                        {Avatar()}
                    </div>
                    <div className='w-full p-4 flex flex-col items-center justify-between md:w-fit'>
                        <div className='p-2 flex w-full bg-[#2948FF] border-[#2948FF] rounded-lg text-white'>
                            <span className='mr-2'><Pencil size={20} /></span>
                            Change Profile
                        </div>
                        <div className='p-2 flex w-full rounded-lg text-[#D00000] border border-[#D00000] md:w-fit'>
                            <span className='mr-2'><Trash size={20} /></span>Remove Profile
                        </div>
                    </div>
                </section>

                <p className='text-xs text-gray-500 my-2'>
                    The profile picture must be 512 x 512 pixels or less
                </p>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Full Name */}
                    <label htmlFor='fullname' className='font-medium'>
                        Full Name
                    </label>
                    <div className='border border-gray-300 p-2 rounded-lg flex'>
                        {<Profile size={20}/>}
                        <input
                            className='ml-2 placeholder:text-sm w-full focus:outline-none'
                            type='text'
                            id='fullname'
                            name='fullname'
                            placeholder='Enter Full Name'
                            value={formData.fullname}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone */}
                    <label htmlFor='phone' className='font-medium'>
                        Phone
                    </label>
                    <div className='border border-gray-300 p-2 rounded-lg flex'>
                        <Phone size={20} />
                        <input
                            className='ml-2 placeholder:text-sm w-full focus:outline-none'
                            type='text'
                            id='phone'
                            name='phone'
                            placeholder='Enter Phone Number'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email */}
                    <label htmlFor='email' className='font-medium'>
                        Email
                    </label>
                    <div className='border border-gray-300 p-2 rounded-lg flex'>
                        <Mail size={20} />
                        <input
                            className='ml-2 placeholder:text-sm w-full focus:outline-none'
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Enter Email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <label htmlFor='password' className='font-medium'>
                        Password
                    </label>
                    <Link to='/profile/change-password' className='text-blue-600 block'>
                        Change Password
                    </Link>

                    {/* Pin */}
                    <label htmlFor='pin' className='font-medium'>
                        Pin
                    </label>
                    <Link to='/profile/change-pin' className='text-blue-600 block'>
                        Change Pin
                    </Link>

                    <button
                        type='submit'
                        className='block bg-[#2948FF] w-full p-3 mt-3 rounded-lg text-white'
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
