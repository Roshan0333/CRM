import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePopup = ({ onClose }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    department: "",
    role: "",
    location: "",
    joiningDate: "",
    bankName: "",
    ifsc: "",
    bankAccount: "",
    upiId: "",
  });

  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  location: "",
  joiningDate: "",
  bankName: "",
  ifsc: "",
  bankAccount: "",
  upiId: "",
});


  // 🔹 Load logged-in user from localStorage
 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser) {
    setUser({
      firstName: storedUser.firstName || "",
      lastName: storedUser.lastName || "",
      email: storedUser.email || "",
      contact: storedUser.contact || "",
      department: storedUser.department || "",
      role: storedUser.role || "",
      location: storedUser.location || "",
      joiningDate: storedUser.joiningDate || "",
      bankName: storedUser.bankName || "",
      ifsc: storedUser.ifsc || "",
      bankAccount: storedUser.bankAccount || "",
      upiId: storedUser.upiId || "",
      _id: storedUser._id || storedUser.id || "",
    });
    setFormData({
  firstName: storedUser.firstName || "",
  lastName: storedUser.lastName || "",
  email: storedUser.email || "",
  contact: storedUser.contact || "",
  location: storedUser.location || "",
  joiningDate: storedUser.joiningDate || "",
  bankName: storedUser.bankName || "",
  ifsc: storedUser.ifsc || "",
  bankAccount: storedUser.bankAccount || "",
  upiId: storedUser.upiId || "",
});

  }
}, []);


 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

  const handleUpdate = async () => {
  try {
    const res = await axios.put(
  `http://localhost:5000/api/auth/update-profile/${user._id}`,
  {
    firstName: formData.firstName,
    lastName: formData.lastName,
     email: formData.email,
    contact: formData.contact,
    location: formData.location,
    bankName: formData.bankName,
    ifsc: formData.ifsc,
    bankAccount: formData.bankAccount,
    upiId: formData.upiId,
    joiningDate: formData.joiningDate || null,
  }
);


    // 🔥 UI update
    setUser(res.data.user);
localStorage.setItem("user", JSON.stringify(res.data.user));

setFormData({
  firstName: res.data.user.firstName || "",
  lastName: res.data.user.lastName || "",
  email: res.data.user.email || "",
  contact: res.data.user.contact || "",
  location: res.data.user.location || "",
  joiningDate: res.data.user.joiningDate || "",
  bankName: res.data.user.bankName || "",
  ifsc: res.data.user.ifsc || "",
  bankAccount: res.data.user.bankAccount || "",
  upiId: res.data.user.upiId || "",
});

    alert("Profile updated successfully ✅");
  } catch (err) {
  console.log("AXIOS ERROR 👉", err.response || err.message);
  alert("Update failed ❌");
}

};


  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* MODAL */}
     <div className="relative bg-[#f2f2f2] w-[95%] max-w-[1400px] h-[92vh] rounded-2xl p-8 overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <span
            onClick={onClose}
            className="text-blue-600 cursor-pointer font-medium"
          >
            ← Profile
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 text-xl hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="bg-white rounded-xl p-6 h-[calc(100%-56px)] overflow-hidden">
          <div className="grid grid-cols-[40%_40%] gap-8 justify-center h-full">

            {/* ================= LEFT : PROFILE INFO ================= */}
            <div className="border rounded-lg p-3.5 h-full">

              <h3 className="text-center text-blue-600 font-semibold mb-4">
                Profile Info
              </h3>

              {/* 🔹 AVATAR + NAME + DEPARTMENT */}
              <div className="flex flex-col items-center ">
                <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl">
                  👤
                </div>

                {/* ✅ USER NAME (BIG & BOLD) */}
                <h2 className="mt-2 text-xl font-bold">
  {`${user.firstName || ""} ${user.lastName || ""}`.trim() || "-"}
</h2>



                {/* ✅ DEPARTMENT */}
                <p className="text-sm text-gray-1000 mt-1">
                {user.department || "-"}
                </p>

              </div>

              {/* INFO GRID */}
              <div className="grid grid-cols-2 gap-y-4 text-sm px-3 text-black border-t mt-4 pt-4">
  <span>Email</span>
  <span className="text-right">{user.email || "-"}</span>

  <span>Phone</span>
  <span className="text-right">{user.contact || "-"}</span>

  <span>Address</span>
  <span className="text-right">{user.location || "-"}</span>

  <span>Join Date</span>
  <span className="text-right">
    {user.joiningDate
      ? new Date(user.joiningDate).toLocaleDateString()
      : "-"}
  </span>

  <span>Bank Name</span>
  <span className="text-right">{user.bankName || "-"}</span>

  <span>IFSC Code</span>
  <span className="text-right">{user.ifsc || "-"}</span>

  <span>UPI ID</span>
  <span className="text-right">{user.upiId || "-"}</span>

  <span>Account No</span>
  <span className="text-right">{user.bankAccount || "-"}</span>
</div>

            </div>

            {/* ================= RIGHT : EDIT PROFILE ================= */}
            <div className="border rounded-lg p-5 relative h-full">

              <h2 className="text-blue-600 font-semibold mb-2 text-lg text-center">
                Edit Profile
              </h2>

              {/* NAME INPUTS */}
              <div className="grid grid-cols-2 gap-4 mb-1">
                           <input
  name="firstName"
  value={formData.firstName}
  onChange={handleChange}
  className="input-clean"
  placeholder="First Name"
/>

              <input
  name="lastName"
  value={formData.lastName}
  onChange={handleChange}
  className="input-clean"
  placeholder="Last Name"
/>

              

              <input
  name="email"
  value={formData.email}
  onChange={handleChange}
  className="input-clean mb-3"
  placeholder="Email"
/>


             <input
  name="contact"
  value={formData.contact}
  onChange={handleChange}
  className="input-clean mb-3"
  placeholder="Contact No"
/>

<input
  name="location"
  value={formData.location}
  onChange={handleChange}
  className="input-clean mb-3"
  placeholder="Address"
/>

            <div className="flex items-center gap-4 mb-3">
  <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
    Joining Date
  </label>

  <input
    type="date"
    name="joiningDate"
    value={formData.joiningDate ? formData.joiningDate.split("T")[0] : ""}
    onChange={handleChange}
    className="input-clean w-full"
  />
</div>




             <input
  name="bankName"
  value={formData.bankName}
  onChange={handleChange}
  className="input-clean mb-3"
  placeholder="Bank Name"
/>


              <input
  name="ifsc"
  value={formData.ifsc}
  onChange={handleChange}
  className="input-clean mb-3"
  placeholder="IFSC Code"
/>


              <input
  name="bankAccount"
  value={formData.bankAccount}
  onChange={handleChange}
  className="input-clean mb-3"
  placeholder="Account No"
/>


              <input
  name="upiId"
  value={formData.upiId}
  onChange={handleChange}
  className="input-clean mb-3"
  placeholder="UPI ID"
/>


              {/* UPDATE BUTTON */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <button
  onClick={handleUpdate}
  className="bg-blue-600 text-white px-10 py-2 rounded-md text-sm"
>
  Update
</button>

              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProfilePopup;
