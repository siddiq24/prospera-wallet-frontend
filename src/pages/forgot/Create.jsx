import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import PassValidation from '../../components/PassValidation';

const CreatePasswordPin = () => {
    const [code, setCode] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()

    const { type } = useParams();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!code || !confirmCode) {
            setError(`${type === 'password' ? 'Password' : 'PIN'} tidak boleh kosong`);
            setLoading(false);
            return;
        }

        if (code !== confirmCode) {
            setError(`${type === 'password' ? 'Password' : 'PIN'} tidak cocok`);
            setLoading(false);
            return;
        }

        if (type === 'pin' && (!/^\d+$/.test(code) || code.length !== 6)) {
            setError('PIN harus terdiri dari 6 digit angka');
            setLoading(false);
            return;
        }

        if (!token) {
            setError('Token tidak valid');
            setLoading(false);
            return;
        }

        try {
            const endpoint =
                type === 'password'
                    ? `${import.meta.env.VITE_BASE_URL}/auth/reset-password`
                    : `${import.meta.env.VITE_BASE_URL}/auth/reset-pin`

            const requestBody =
                type === 'password' ? { password: code, token } : { pin: code, token };

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(`${type === 'password' ? 'Password' : 'PIN'} berhasil direset!`);
                setCode('');
                setConfirmCode('');
                setTimeout(() => {
                    navigate('/auth/login')
                }, 1000);
            } else {
                console.log(data)
                setError(data.message || `Gagal mereset ${type === 'password' ? 'password' : 'PIN'}`);
            }
        } catch (err) {
            setError('Terjadi kesalahan saat menghubungi server', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        message && toast.success(message) && setMessage('')
        error && toast.error(error) && setError('')
    }, [message, error])

    const inputType = type === 'password' ? 'password' : 'text';
    const inputMode = type === 'pin' ? 'numeric' : 'text';
    const maxLength = type === 'pin' ? 6 : undefined;
    const placeholder =
        type === 'pin'
            ? 'Masukkan 6 digit PIN'
            : 'Masukkan password minimal 8 karakter';

    return (
        <div className="min-h-screen bg-[var(--color--primary)] flex items-center justify-center px-4 flex-col gap-10 md:gap-20"> <Toaster />
            <div className='flex items-center gap-2 md:gap-5 justify-center'>
                <img src="/pros-logo-bw.png" alt="" className='size-[10vw] md:size-[5%] lg:size-[3%]' />
                <p className='text-white text-[6vw] md:text-[3vw] lg:text-[2vw]  font-bold'>Prospera</p>
            </div>
            <div className="max-w-2xl p-8 md:p-15 w-full h-full bg-white rounded-2xl shadow-lg border border-gray-100  flex flex-col items-center justify-center gap-8 lg:max-w-[70vh]">
                <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
                    Reset {type === 'password' ? 'Password' : 'PIN'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-[80%]">
                    {/* Input Password / PIN */}
                    <div>
                        <label htmlFor="code" className="block text-sm lg:text-lg font-medium text-gray-700 mb-2">
                            {type === 'password' ? 'Password Baru' : 'PIN Baru'}
                        </label>
                        <div className="relative">
                            <input
                                id="code"
                                type={showPassword ? "text" : inputType}
                                inputMode={inputMode}
                                maxLength={maxLength}
                                autoFocus
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder={placeholder}
                                className={`${type === 'password' ? '' : 'text-center'} w-full lg:text-lg px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2948FF] focus:border-transparent outline-none`}
                            />
                            {type === "password" && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            )}
                        </div>
                        {type === 'password' && <PassValidation code={code} />}
                    </div>

                    {/* Input Konfirmasi */}
                    <div>
                        <label htmlFor="confirmCode" className="block text-sm lg:text-lg font-medium text-gray-700 mb-2">
                            Konfirmasi {type === 'password' ? 'Password' : 'PIN'}
                        </label>
                        <div className="relative">
                            <input
                                id="confirmCode"
                                type={showConfirmPassword ? "text" : inputType}
                                inputMode={inputMode}
                                maxLength={maxLength}
                                value={confirmCode}
                                onChange={(e) => setConfirmCode(e.target.value)}
                                placeholder={placeholder}
                                className={`${type === 'password' ? '' : 'text-center'} lg:text-lg w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2948FF] focus:border-transparent outline-none`}
                            />
                            {type === "password" && (
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2948FF] text-white py-3 px-4 rounded-xl font-medium hover:bg-[#1e3ac4] focus:ring-2 focus:ring-[#2948FF] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {loading ? 'Memproses...' : `Reset ${type === 'password' ? 'Password' : 'PIN'}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePasswordPin;
