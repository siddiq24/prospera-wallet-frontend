import React, { useEffect, useState } from 'react'
import { Mail, Pencil, People, Phone, Profile, Trash } from '../../components/profile/Svg'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from '../../redux/slices/profileSlice';

function EditProfile() {
    const [_, setAvatar] = useState(null) // URL gambar
    const [loading, setLoading] = useState(false)
    const [profileUrl, setProfileUrl] = useState('');

    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user)
    const profileState = useSelector((state) => state.profile)

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

    const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    const profileImg = e.target.profile_img.files[0];
    const fullName = e.target.fullname.value;
    const phone = e.target.phone.value;

    try {
        // Update the profile
        await dispatch(profileActions.updateProfileThunk({
            token: userState.token, 
            fullname: fullName, 
            phone,
            profileImg
        })).unwrap();

        // Fetch updated profile data after successful update
        dispatch(profileActions.getProfileThunk({ token: userState.token }));
    } catch (error) {
        console.error("Profile update failed:", error);
    }
}

    let Avatar = () => { return profileUrl ? (<img src={profileUrl} />) : (<Profile size={50} />) }


    useEffect(() => {
        dispatch(profileActions.getProfileThunk({ token: userState.token }))
    }, [dispatch, userState.token])

    useEffect(() => {
        setFormData({
            fullname: profileState.fullname || '',
            phone: profileState.phone || '',
            email: profileState.email || '',
        })

        setProfileUrl(`${import.meta.env.VITE_BASE_URL}/profile/${profileState.img}`)
    }, [profileState])

    const handleDelete = async () => {
        dispatch(profileActions.deleteProfileThunk({ token: userState.token }))
    }
    return (
        <div className='flex-1'>
            <Header title={'Profile Account'} Icon={People}/>
            <div className='p-8 pt-0 w-full'>
                <div>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                    <section className='flex mt-4 gap-4'>
                        <div className='flex justify-center items-center rounded-xl bg-[#E8E8E84D] aspect-square h-33 md:h-44'>
                            {/* <img src={avatar} alt="" /> */}
                            {Avatar()}
                        </div>
                        <div className='w-full flex flex-col items-center justify-around md:w-66 md:ml-4 md:text-xl'>
                            <label className="p-3 flex w-full bg-[#2948FF] border-[#2948FF] rounded-lg text-white cursor-pointer md:py-4 items-center">
                                <span className="mr-2">
                                    <Pencil size={window.innerWidth>768?25:18} />
                                </span>
                                {loading ? "Uploading..." : "Change Profile"}
                                <input type="file" className="hidden" accept="image/*" id="profile_img"  />
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