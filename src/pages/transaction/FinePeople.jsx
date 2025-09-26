import React, { useState } from "react";
import { ListStart, Search, Star, StarIcon, Trash2 } from "lucide-react";
import Header from "../../components/Header";
import { History, Transfer } from "../../components/profile/Svg";
import { useNavigate } from "react-router";

// Data transaksi contoh
const Transactions = [
    {
        id: 1,
        name: "Ghauhi 1",
        phone: "082785504337",
        amount: 50000,
        type: "credit",
        fullName: "Ghauhi Wizard Aragonia",
        status: "Transfer Success",
        avatar: "/avatar-aang.png",
        pin: false,
    },
    {
        id: 2,
        name: "Cameron Williamson",
        phone: "(208) 555-0112",
        amount: 50000,
        type: "debit",
        fullName: "Cameron Williamson",
        status: "Transfer Success",
        avatar: "/avatar-aang.png",
        pin: false,
    },
    {
        id: 3,
        name: "Cody Fisher",
        phone: "(704) 555-0127",
        amount: 50000,
        type: "credit",
        fullName: "Cody Fisher",
        status: "Transfer Success",
        avatar: "/avatar-aang.png",
        pin: false,
    },
    {
        id: 4,
        name: "Kristin Watson",
        phone: "(603) 555-0123",
        amount: 50000,
        type: "debit",
        fullName: "Kristin Watson",
        status: "Transfer Success",
        avatar: "/avatar-aang.png",
        pin: false,
    },
    {
        id: 5,
        name: "Floyd Miles",
        phone: "(671) 555-0110",
        amount: 50000,
        type: "credit",
        fullName: "Floyd Miles",
        status: "Transfer Success",
        avatar: "/avatar-aang.png",
        pin: false,
    },
    {
        id: 6,
        name: "Wade Warren",
        phone: "(229) 555-0109",
        amount: 50000,
        type: "debit",
        fullName: "Wade Warren",
        status: "Transfer Success",
        avatar: "/avatar-aang.png",
        pin: false,
    },
    {
        id: 7,
        name: "Savannah Nguyen",
        phone: "(217) 555-0113",
        amount: 50000,
        type: "credit",
        fullName: "Savannah Nguyen",
        status: "Transfer Success",
        avatar: "/avatar-aang.png",
        pin: false,
    },
];

const FinePeople = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate()

    // Filter transaksi berdasarkan search term
    const filteredTransactions = Transactions.filter(
        (transaction) =>
            transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.phone.includes(searchTerm)
    );

    // Pagination
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTransactions = filteredTransactions.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Format currency ke format Indonesia
    const formatCurrency = (amount) => {
        return `Rp ${amount.toLocaleString("id-ID")},00`;
    };

    // Handle close modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedTransaction(null);
    };

    // Handle Pin people
    const handlePin = () => {
        console.log("Delete transaction:", selectedTransaction?.id);
        closeModal();
    };

    // Pagination handlers
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="w-full">
            <Header title={'Transfer Money'} Icon={Transfer} />
            {/* STEP BAR */}
            <div className="hidden md:flex items-center justify-between max-w-2xl px-6 p-6">
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-medium">
                        1
                    </div>
                    <span className="ml-2 text-blue-700">Find People</span>
                </div>
                <div className="flex-1 mx-2 border-t border-dashed border-gray-400"></div>
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white text-sm font-medium">
                        2
                    </div>
                    <span className="ml-2 text-gray-600 font-medium">Set Nominal</span>
                </div>
                <div className="flex-1 mx-2 border-t border-dashed border-gray-400"></div>
                <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 text-white text-sm font-medium">
                        3
                    </div>
                    <span className="ml-2 text-gray-700">Finish</span>
                </div>
            </div>

            {/* Mobile Version - Hidden on Desktop */}
            <div className="md:hidden mx-auto bg-white min-h-screen px-4">
                {/* Search Bar */}
                <div className="p-4">
                    <h1 className="text-lg font-semibold text-left">Find People</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter Number Or Full Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                {/* People List */}
                <div className="px-4">
                    {filteredTransactions.map((transaction, i) => (
                        <div
                            key={transaction.id}
                            className={`flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${transaction.id % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            onClick={() => navigate(`/transaction/transfer/${i}`)}
                        >
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-500 text-sm">
                                    {transaction.name}
                                </h3>
                                <p className="text-gray-500 text-xs mt-1">
                                    {transaction.phone}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* No results message */}
                    {filteredTransactions.length === 0 && searchTerm && (
                        <div className="text-center py-8 text-gray-500">
                            <p>No transactions found for "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop Version - Hidden on Mobile */}
            <div className="hidden md:block">
                {/* Header */}
                {/* Main Content */}
                <div className="py-8 pt-0">
                    <div className="bg-white rounded-xl shadow-sm ">
                        {/* Search and Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Find Transaction
                                </h2>
                                <div className="relative w-lg">
                                    <input
                                        type="text"
                                        placeholder="Enter Number Or Full Name"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                                    />
                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5x h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Transaction List - Desktop Table Style */}
                        <div className="overflow-x-auto">
                            {currentTransactions.map((transaction, i) => (
                                <div
                                    onClick={() => { navigate(`/transaction/transfer/${i}`) }}
                                    key={transaction.id}
                                    className={`flex items-center px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${transaction.id % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    {/* Avatar */}
                                    <div className="flex-1 ml-22 mr-4">
                                        <img
                                            src={transaction.avatar}
                                            alt={transaction.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                    </div>

                                    {/* Name and Phone */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {transaction.name}
                                        </h3>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-500 mt-1">
                                            {transaction.phone}
                                        </p>
                                    </div>

                                    {/* Delete Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={() => {
                                                handlePin();
                                            }}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Star className={`w-5 h-5 ${transaction.pin && 'fill - lime - 400'}`} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* No results message */}
                            {filteredTransactions.length === 0 && searchTerm && (
                                <div className="text-center py-12 text-gray-500">
                                    <p>No transactions found for "{searchTerm}"</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredTransactions.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-700">
                                        Show {Math.min(itemsPerPage, filteredTransactions.length)}{" "}
                                        of {filteredTransactions.length} transactions
                                    </p>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={goToPrevPage}
                                            disabled={currentPage <= 1}
                                            className={`text-sm mr-4 ${currentPage <= 1
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            Prev
                                        </button>

                                        {/* Page Numbers */}
                                        <div className="flex items-center space-x-1">
                                            {Array.from(
                                                { length: Math.min(totalPages, 9) },
                                                (_, i) => i + 1
                                            ).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => goToPage(page)}
                                                    className={`px-3 py-1 text-sm rounded ${currentPage === page
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={goToNextPage}
                                            disabled={currentPage >= totalPages}
                                            className={`text-sm ml-4 ${currentPage >= totalPages
                                                ? "text-gray-400 cursor-not-allowed"
                                                : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal - Works for both mobile*/}
            {showModal && selectedTransaction && (
                <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                    {/* Background Overlay */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="bg-white rounded-lg w-full max-w-sm mx-4 relative z-10">
                        {/* Modal Header */}
                        <div className="bg-gray-100 p-4 rounded-t-lg">
                            <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                                DETAIL TRANSACTION {selectedTransaction.name.toUpperCase()}
                            </h2>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Avatar */}
                            <div className="flex mb-6">
                                <img
                                    src={selectedTransaction.avatar}
                                    alt={selectedTransaction.fullName}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Name:
                                    </label>
                                    <p className="text-sm text-gray-900 mt-1">
                                        {selectedTransaction.fullName}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Phone:
                                    </label>
                                    <p className="text-sm text-gray-900 mt-1">
                                        {selectedTransaction.phone}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Status:
                                    </label>
                                    <p className="text-sm text-green-600 mt-1">
                                        {selectedTransaction.status}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Amount:
                                    </label>
                                    <p
                                        className={`text-sm font-medium mt-1 ${selectedTransaction.type === "credit"
                                            ? "text-green-600"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {formatCurrency(selectedTransaction.amount)}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 space-y-3">
                                <button
                                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-150"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>

                                <button
                                    onClick={closeModal}
                                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export { FinePeople, Transactions }