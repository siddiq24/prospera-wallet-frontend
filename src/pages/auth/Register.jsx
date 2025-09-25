import React, { useState } from "react";
import "/src/assets/styles/index.css";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfPwd, setShowConfPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const eyesolid = <Eye />;
  const eyeslash = <EyeOff />;

  const [form, setForm] = useState({
    email: "",
    pwd: "",
    confpwd: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErr = {};
    let valid = true;

    // validasi email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErr.email = "Email tidak boleh kosong";
      valid = false;
    } else if (!emailPattern.test(form.email)) {
      newErr.email = "Format email tidak valid";
      valid = false;
    }

    // validasi password
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!form.pwd) {
      newErr.pwd = "Password tidak boleh kosong";
      valid = false;
    } else if (!passwordPattern.test(form.pwd)) {
      newErr.pwd =
        "Password minimal 8 karakter, 1 huruf besar, 1 huruf kecil, 1 karakter spesial";
      valid = false;
    }

    // validasi confirm password
    if (!form.confpwd) {
      newErr.confpwd = "Konfirmasi password tidak boleh kosong";
      valid = false;
    } else if (form.confpwd !== form.pwd) {
      newErr.confpwd = "Password tidak sama";
      valid = false;
    }

    setErrors(newErr);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setMessage("Register berhasil");
    } else {
      setMessage(""); // pesan global hanya muncul kalau berhasil
    }
  };
  return (
    <>
      <section className="flex min-h-screen bg-white md:bg-[var(--color--primary)]">
        <div className="w-full md:w-1/2 rounded-r-4xl bg-white flex flex-col justify-center px-20 py-20">
          <div className="flex items-center text-[var(--color--primary)]">
            <img src="/dompetkecil.png" alt="dompet" className="w-8 h-8" />
            <p>E-Wallet</p>
          </div>
          <h1 className="font-medium text-3xl">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h1>
          <p className="font-normal text-[15px] text-gray-400">
            Transfering money is eassier than ever, you can access Zwallet
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex justify-center items-center gap-3 border border-gray-300 w-full rounded-full py-2">
              <img src="/google.png" alt="google logo" />
              <span>Sign In With Google</span>
            </div>
            <div className="flex justify-center items-center gap-3 border border-gray-300 w-full rounded-full py-2">
              <img src="/fb.png" alt="facebook logo" />
              <span>Sign In With Facebook</span>
            </div>
          </div>

          <div className="flex items-center mt-6">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mt-6 flex flex-col">
              <label htmlFor="email">Email</label>
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="border border-gray-300 bg-[#FCFDFE] rounded-lg py-2 px-10 my-2 w-full"
                />
                <img
                  src="/email.png"
                  alt="logo email"
                  className="absolute w-4 h-4 left-4 top-5"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="pwd">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  inputMode="none"
                  name="pwd"
                  id="pwd"
                  value={form.pwd}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="border border-gray-300 bg-[#FCFDFE] rounded-lg py-2 px-10 my-2 w-full"
                />
                <img
                  src="/password.png"
                  alt="password logo"
                  className="absolute w-5 h-5 left-4 top-4.5"
                />
                <div
                  className="absolute w-5 h-5 right-4 top-4.5 cursor-pointer"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  {showPwd ? eyesolid : eyeslash}
                </div>
              </div>
              {errors.pwd && (
                <p className="text-red-500 text-sm">{errors.pwd}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="confpwd">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfPwd ? "text" : "password"}
                  name="confpwd"
                  id="confpwd"
                  value={form.confpwd}
                  onChange={handleChange}
                  placeholder="Enter Your Password Again"
                  className="border border-gray-300 bg-[#FCFDFE] rounded-lg py-2 px-10 my-2 w-full"
                />
                <img
                  src="/password.png"
                  alt="password logo"
                  className="absolute w-5 h-5 left-4 top-4.5"
                />
                <img
                  src="/password.png"
                  alt="password logo"
                  className="absolute w-5 h-5 left-4 top-4.5"
                />
                <div
                  className="absolute w-5 h-5 right-4 top-4.5 cursor-pointer"
                  onClick={() => setShowConfPwd(!showConfPwd)}
                >
                  {showConfPwd ? eyesolid : eyeslash}
                </div>
              </div>
              {errors.confpwd && (
                <p className="text-red-500 text-sm">{errors.confpwd}</p>
              )}
            </div>
            {message && (
              <p className="text-sm font-medium text-green-600">{message}</p>
            )}
            <button className="my-5 bg-[var(--color--primary)] text-white w-full py-2 rounded-lg cursor-pointer">
              Register
            </button>
          </form>
          <p className="flex gap-1 justify-center">
            Have An Account?
            <Link className="text-[var(--color--primary)]">Login</Link>
          </p>
        </div>

        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img
            src="/register.png"
            alt="logo register"
            className="w-150 h-135"
          />
        </div>
      </section>
    </>
  );
}

export default Register;
