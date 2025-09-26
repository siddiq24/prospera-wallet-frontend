import React, { useState } from 'react'
import { KeyPass, Profile } from '../../components/profile/Svg'
import { Eye, EyeOff } from 'lucide-react'

function EditProfile() {
  const [showExist, setShowExist] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [formData, setFormData] = useState({
    ExistingPass: '',
    NewPass: '',
    ConfirmNewPassword: '',
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

  // avatar placeholder
  let profileUrl = ''
  let Avatar = () =>
    profileUrl ? (
      <img src={profileUrl} alt="avatar" className="w-12 h-12 rounded-full" />
    ) : (
      <Profile size={50} />
    )

  return (
    <div className="p-8 pt-4 w-full">
      <p className='font-semibold mb-6'>Change Password</p>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 md:border  border-gray-200 p-0 md:p-8"
      >
        {/* Existing Password */}
        <label htmlFor="ExistingPass" className="font-medium">
          Existing Password
        </label>
        <div className="border border-gray-300 p-2 rounded-lg flex mt-2 items-center">
          <KeyPass size={20} />
          <input
            className="ml-2 placeholder:text-sm w-full focus:outline-none"
            type={showExist ? 'text' : 'password'}
            id="ExistingPass"
            name="ExistingPass"
            placeholder="Enter Your Existing Password"
            value={formData.ExistingPass}
            onChange={handleChange}
          />
          <div
            onClick={() => setShowExist(!showExist)}
            className="cursor-pointer"
          >
            {showExist ? <Eye /> : <EyeOff />}
          </div>
        </div>

        {/* New Password */}
        <label htmlFor="NewPass" className="font-medium">
          New Password
        </label>
        <div className="border border-gray-300 p-2 rounded-lg flex mt-2 items-center">
          <KeyPass size={20} />
          <input
            className="ml-2 placeholder:text-sm w-full focus:outline-none"
            type={showNew ? 'text' : 'password'}
            id="NewPass"
            name="NewPass"
            placeholder="Enter Your New Password"
            value={formData.NewPass}
            onChange={handleChange}
          />
          <div
            onClick={() => setShowNew(!showNew)}
            className="cursor-pointer"
          >
            {showNew ? <Eye /> : <EyeOff />}
          </div>
        </div>

        <label htmlFor="ConfirmNewPassword" className="font-medium">
          Confirm New Password
        </label>
        <div className="border border-gray-300 p-2 rounded-lg flex mt-2 items-center">
          <KeyPass size={20} />
          <input
            className="ml-2 placeholder:text-sm w-full focus:outline-none"
            type={showConfirm ? 'text' : 'password'}
            id="ConfirmNewPassword"
            name="ConfirmNewPassword"
            placeholder="Re-Type Your New Password"
            value={formData.ConfirmNewPassword}
            onChange={handleChange}
          />
          <div
            onClick={() => setShowConfirm(!showConfirm)}
            className="cursor-pointer"
          >
            {showConfirm ? <Eye /> : <EyeOff />}
          </div>
        </div>

        <button
          type="submit"
          className="block bg-[#2948FF] w-full p-3 mt-3 rounded-lg text-white"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditProfile
