import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';

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

    // Regex rules
    const minLen = /^.{8,}$/;
    const hasLower = /(?=.*[a-z])/;
    const hasUpper = /(?=.*[A-Z])/;
    const hasDigit = /(?=.*\d)/;

    const rules = [
        { test: minLen, label: "At least 8 characters" },
        { test: hasLower, label: "Lowercase letter" },
        { test: hasUpper, label: "Uppercase letter" },
        { test: hasDigit, label: "At least one number" },
    ];

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

        if (type === 'password' && !rules.every(rule => rule.test.test(code))) {
            setError('Password belum memenuhi semua syarat');
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
            } else {
                setError(data.message || `Gagal mereset ${type === 'password' ? 'password' : 'PIN'}`);
            }
        } catch (err) {
            setError('Terjadi kesalahan saat menghubungi server', err);
        } finally {
            setLoading(false);
            navigate('/auth/login')
        }
    };

    const inputType = type === 'password' ? 'password' : 'text';
    const inputMode = type === 'pin' ? 'numeric' : 'text';
    const maxLength = type === 'pin' ? 6 : undefined;
    const placeholder =
        type === 'pin'
            ? 'Masukkan 6 digit PIN'
            : 'Masukkan password minimal 8 karakter';
    const allValid = rules.every(rule => rule.test.test(code));

    return (
        <div className="min-h-screen bg-[var(--color--primary)] flex items-center justify-center px-4">
            <div className="max-w-[40vw] aspect-5/4 w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center gap-8">
                <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center">
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

                        {/* Checklist Validasi Password */}
                        {type === 'password' && !allValid && (
                            <div className="mt-3 bg-gray-50 rounded-lg text-sm lg:text-lg relative">
                                <ul className="space-y-1 absolute bg-cyan-100 top-6 left-5 shadow-md rounded-xl p-4 -translate-y-8 border-cyan-900 border w-full  z-100">                                    <p className="font-medium text-gray-700 mb-2">Your password must have:</p>
                                    {rules.map((rule, idx) => {
                                        const isValid = rule.test.test(code);
                                        return (
                                            <li key={idx} className="flex items-center gap-2 ">
                                                <span
                                                    className={`w-4 h-4 flex items-center justify-center rounded-full border text-xs ${isValid
                                                        ? 'bg-green-100 border-green-700 text-green-600'
                                                        : 'bg-gray-100 border-gray-400 text-gray-400'
                                                        }`}
                                                >
                                                    {isValid ? '✓' : '•'}
                                                </span>
                                                <span className={isValid ? 'text-green-600' : 'text-gray-600'}>
                                                    {rule.label}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
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

                    {/* Error & Success */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm lg:text-lg">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm lg:text-lg">
                            {message}
                        </div>
                    )}

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
