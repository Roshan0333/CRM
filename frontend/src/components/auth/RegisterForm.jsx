// src/components/auth/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEPARTMENTS, DEPARTMENT_ROLES } from "../../utils/constants";
import { registerUser } from "../../services/authApi";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bankName: "",
    ifsc: "",
    bankAccount: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    role: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "department") {
        return { ...prev, department: value, role: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      bankName: form.bankName,
      ifsc: form.ifsc,
      bankAccount: form.bankAccount,
      email: form.email,            // must be "email"
      password: form.password,
      department: form.department,
      role: form.role
    };

    const { ok, data } = await registerUser(payload);

    if (!ok) {
      setError(data.message || "Register failed.");
      return;
    }

    alert("Register successful. Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white py-4 text-center">
          <h1 className="text-xl font-semibold tracking-wide">GRAPURA</h1>
          <p className="text-xs mt-1">Graphura India Private Limited</p>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Register</h2>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-1/2 border px-3 py-2 rounded text-sm"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-1/2 border px-3 py-2 rounded text-sm"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              className="w-full border px-3 py-2 rounded text-sm"
              value={form.bankName}
              onChange={handleChange}
              required
            />

            <div className="flex gap-2">
              <input
                type="text"
                name="ifsc"
                placeholder="IFSC Code"
                className="w-1/2 border px-3 py-2 rounded text-sm"
                value={form.ifsc}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="bankAccount"
                placeholder="Account No"
                className="w-1/2 border px-3 py-2 rounded text-sm"
                value={form.bankAccount}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Id"
              className="w-full border px-3 py-2 rounded text-sm"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="flex gap-2">
              <select
                name="department"
                className="w-1/2 border px-3 py-2 rounded text-sm"
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                name="role"
                className="w-1/2 border px-3 py-2 rounded text-sm"
                value={form.role}
                onChange={handleChange}
                disabled={!form.department}
                required
              >
                <option value="">Select Role</option>
                {form.department &&
                  DEPARTMENT_ROLES[form.department].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
              </select>
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border px-3 py-2 rounded text-sm"
              value={form.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full border px-3 py-2 rounded text-sm"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && (
              <p className="text-xs text-red-600 mt-1">{error}</p>
            )}

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
            >
              Register
            </button>

            <p className="mt-2 text-xs text-center">
              Already registered?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
