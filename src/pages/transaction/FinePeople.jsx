import React, { useEffect, useState } from "react";
import { ListStart, Search, Star, StarIcon, Trash2 } from "lucide-react";
import Header from "../../components/Header";
import { History, Transfer } from "../../components/profile/Svg";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const FinePeople = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  // ganti state tunggal jadi array
  const [starredUsers, setStarredUsers] = useState([]);

  const handlePin = (userId) => {
    setStarredUsers(
      (prev) =>
        prev.includes(userId)
          ? prev.filter((id) => id !== userId) // kalau sudah ada → hapus
          : [...prev, userId] // kalau belum ada → tambah
    );
  };

  // Filter transaksi berdasarkan search term
  const filteredUsers = users.filter((user) => {
    const name = user.full_name ? user.full_name.toLowerCase() : "";
    const phone = user.phone_number || "";
    return (
      name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm)
    );
  });

  // Urutkan: yang dibintangin paling atas
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aStarred = starredUsers.includes(a.id);
    const bStarred = starredUsers.includes(b.id);
    if (aStarred && !bStarred) return -1; // a duluan
    if (!aStarred && bStarred) return 1; // b duluan
    return 0; // sama-sama starred atau sama-sama tidak
  });

  // Pagination dihitung dari hasil sort
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  // Format currency ke format Indonesia
  const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString("id-ID")},00`;
  };

  // Handle close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handle Pin people
  //   const handlePin = () => {
  //     console.log("Delete transaction:", selectedUser?.id);
  //     closeModal();
  //   };

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

  const token =
    useSelector((state) => state.user.token) || localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;

        const res = await fetch(`${baseUrl}/user/all`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();
        setUsers(data.data);
      } catch (err) {
        console.error("Error fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      // pastikan token ada
      fetchUsers();
    }
  }, [token]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full">
      <Header title={"Transfer Money"} Icon={Transfer} />
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
          {filteredUsers.map((user) => {
            return (
              <div
                key={user.id}
                className={`flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${
                  user.id % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
                onClick={() => navigate(`/transaction/transfer/${user.id}`)}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-500 text-sm">
                    {user.full_name}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1">
                    {user.phone_number}
                  </p>
                </div>
              </div>
            );
          })}

          {/* No results message */}
          {filteredUsers.length === 0 && searchTerm && (
            <div className="text-center py-8 text-gray-500">
              <p>No users found for "{searchTerm}"</p>
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
                  Find People
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

            {/* user List - Desktop Table Style */}
            <div className="overflow-x-auto">
              {currentUsers.map((user) => (
                <div
                  onClick={() => navigate(`/transaction/transfer/${user.id}`)}
                  key={user.id}
                  className={`flex cursor-pointer items-center px-6 py-4 border border-gray-100 last:border-b-0 hover:border-gray-400  transition-colors ${
                    user.id % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {/* Avatar */}
                  <div className="flex-1 ml-22 mr-4">
                    {/* <img
                      src={
                        user.avatar
                          ? `${import.meta.env.VITE_BASE_URL}/${user.avatar}`
                          : "/avatar-aang.png" // fallback kalau null
                      }
                      alt={user.full_name || "Unknown"}
                      className="w-12 h-12 rounded-lg object-cover"
                    /> */}
                    {user.counterparty_im ? (
                      <img
                        src={`${URL}/profile/${user.counterparty_img}`}
                        alt=""
                        className="rounded-full"
                      />
                    ) : (
                      <img
                        src={`https://api.dicebear.com/9.x/open-peeps/png?seed=${
                          user.id
                        }&flip=${user.id % 2 == 0}`}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                  </div>

                  {/* Name and Phone */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      {user.full_name}
                    </h3>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 mt-1">
                      {user.phone_number}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePin(user.id);
                      }}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          starredUsers.includes(user.id)
                            ? "fill-red-500"
                            : "fill-none"
                        }`}
                        // className={`w-5 h-5 ${
                        //   transaction.pin && "fill - lime - 400"
                        // }`
                        // }
                      />
                    </button>
                  </div>
                </div>
              ))}

              {/* No results message */}
              {filteredUsers.length === 0 && searchTerm && (
                <div className="text-center py-12 text-gray-500">
                  <p>No users found for "{searchTerm}"</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-700">
                    Show {Math.min(itemsPerPage, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
                  </p>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage <= 1}
                      className={`text-sm mr-4 cursor-pointer ${
                        currentPage <= 1
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
                          className={`px-3 py-1 text-sm rounded cursor-pointer ${
                            currentPage === page
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
                      className={`text-sm ml-4 cursor-pointer ${
                        currentPage >= totalPages
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
      {showModal && selectedUser && (
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
                DETAIL USER {selectedUser.full_name.toUpperCase()}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Avatar */}
              <div className="flex mb-6">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.full_name}
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
                    {selectedUser.full_name}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone:
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedUser.phone_number}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status:
                  </label>
                  <p className="text-sm text-green-600 mt-1">
                    {selectedUser.status}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Amount:
                  </label>
                  <p
                    className={`text-sm font-medium mt-1 ${
                      selectedUser.type === "credit"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {formatCurrency(selectedUser.amount)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-150">
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
};

export { FinePeople };
