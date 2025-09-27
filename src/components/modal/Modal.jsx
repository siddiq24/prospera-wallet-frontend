import React from "react";

export default function TransferSuccessModal({ isOpen, onClose, onTransferAgain }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-center">
                {/* Title */}
                <h2 className="text-lg font-semibold mb-4">
                    TRANSFER TO <span className="font-bold">CHALUH 1</span>
                </h2>

                {/* Illustration */}
                <div className="flex justify-center mb-4">
                    <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/transaction-successful-illustration-download-in-svg-png-gif-file-formats--complete-transaction-banking-payment-e-commerce-pack-finance-illustrations-5677547.png"
                        alt="Success"
                        className="w-48 h-48"
                    />
                </div>

                {/* Success Text */}
                <p className="text-xl font-semibold text-green-600">Yeay Transfer Success</p>
                <p className="text-gray-500 mb-6">
                    Thank you for using this application for your financial
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                    >
                        Done
                    </button>
                    <button
                        onClick={onTransferAgain}
                        className="border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                    >
                        Transfer Again
                    </button>
                </div>
            </div>
        </div>
    );
}
