import React from 'react'

function PassValidation({ code }) {

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
    const allValid = rules.every(rule => rule.test.test(code));

    return (
        !allValid && (
            <div className="mt-3 bg-gray-50 rounded-lg text-sm lg:text-lg relative">
                <ul className="space-y-1 absolute bg-indigo-50 top-6 left-5 shadow-md rounded-xl p-4 -translate-y-8 border-cyan-900 border w-full  z-100">
                    <p className="font-medium text-gray-700 mb-2">Your password must have:</p>
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
        )
    )
}

export default PassValidation