import React, { useEffect, useState } from 'react'
import { Mail, Pencil, People, Phone, Profile, Trash } from '../../components/profile/Svg'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

function EditProfile() {
    const [_, setAvatar] = useState(null) // URL gambar
    const [loading, setLoading] = useState(false)

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

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/profile/avatar")
                const data = await res.json()
                setAvatar(data.avatarUrl)
            } catch (err) {
                console.error("Error fetching avatar:", err)
            }
        }
        fetchAvatar()
    }, [])

    // Handle upload avatar baru
    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return
        let re = /\.(jpe?g|png|gif|webp|svg|bmp|tiff?|avif|heic|heif)$/i
        if (!re.test(file.name)) return


        const formData = new FormData()
        formData.append("avatar", file)

        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/profile/avatar", {
                method: "POST",
                body: formData,
            })
            const data = await res.json()
            setAvatar(data.avatarUrl)
        } catch (err) {
            console.error("Upload failed:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        setLoading(true)
        try {
            await fetch("http://localhost:5000/api/profile/avatar", {
                method: "DELETE",
            })
            setAvatar(null)
        } catch (err) {
            console.error("Delete failed:", err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex-1'>
            <Header title={'Profile Account'} Icon={People}/>
            <div className='p-8 pt-0 w-full'>
                <div>
                    <section className='flex mt-4 gap-4'>
                        <div className='flex justify-center items-center rounded-xl bg-[#E8E8E84D] aspect-square h-33 md:h-44'>
                            {Avatar()}
                        </div>
                        <div className='w-full flex flex-col items-center justify-around md:w-66 md:ml-4 md:text-xl'>
                            <label className="p-3 flex w-full bg-[#2948FF] border-[#2948FF] rounded-lg text-white cursor-pointer md:py-4 items-center">
                                <span className="mr-2">
                                    <Pencil size={window.innerWidth>768?25:18} />
                                </span>
                                {loading ? "Uploading..." : "Change Profile"}
                                <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                            </label>
                            <button onClick={handleDelete}
                                className='p-3 flex w-full rounded-lg text-[#D00000] border border-[#D00000] md:w-full md:py-4 items-center'>
                                <span className='mr-2'><Trash size={window.innerWidth>768?25:18} /></span>Remove Profile
                            </button>
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
                        <div className='border border-gray-300 p-2 rounded-lg flex items-center'>
                            {<Profile size={20} />}
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
                        <div className='border border-gray-300 p-2 rounded-lg flex items-center'>
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
                        <div className='border border-gray-300 p-2 rounded-lg flex items-center'>
                            <Mail size={20} />
                            <input
                                className='ml-2 placeholder:text-sm text-gray-400 00 w-full focus:outline-none'
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Enter Email'
                                value={formData.email}
                                disabled
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
        </div>
    )
}

export default EditProfile