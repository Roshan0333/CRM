import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, CheckCircle } from "lucide-react";
import axios from "axios";

const ClientFeedback = () => {
  const { token } = useParams(); 
  const [orderInfo, setOrderInfo] = useState(null);
  const [serviceRatings, setServiceRatings] = useState({}); // Stores ratings for each service
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Fetching the data automatically on page load
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/feedback/details/${token}`);
        const data = res.data; 
        
        setOrderInfo(data);

        // 2. Automatically prepare the rating object based on the services the client actually bought
        const initialRatings = {};
        data.services.forEach((service) => {
          initialRatings[service] = 0; // Start everyone at 0 stars
        });
        setServiceRatings(initialRatings);
      } catch (err) {
        console.error("Error fetching project details:", err);
      }
    };
    fetchProjectData();
  }, [token]);

  const handleRate = (serviceName, value) => {
    setServiceRatings({ ...serviceRatings, [serviceName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if at least one star is given for the first service as a basic validation
    if (Object.values(serviceRatings).every(v => v === 0)) {
        return alert("Please provide a rating for the services.");
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:3000/api/v1/feedback/submit/${token}`, {
        ratings: serviceRatings,
        comment
      });
      setSubmitted(true);
    } catch (err) {
      alert("Failed to submit. This link might be expired or already used.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-xl shadow-2xl text-center max-w-md w-full border-t-8 border-[#0F241A]">
          <CheckCircle size={70} className="text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Success!</h2>
          <p className="text-gray-600 mt-2">Your feedback has been sent to the Graphura management team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
        
        {/* Top Header */}
        <div className="bg-white p-6 border-b flex justify-between items-center">
            <h1 className="text-2xl font-black text-[#0F241A]">GRAPHURA</h1>
            <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Project Completion</p>
                <p className="text-xs font-bold text-gray-700">Official Feedback Form</p>
            </div>
        </div>

        <div className="p-8">
          {/* Header Info - ALL AUTO-FILLED */}
          <div className="flex justify-between items-center mb-8 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-gray-800">{orderInfo?.companyName || "Loading..."}</h2>
            <h2 className="text-lg font-bold text-gray-800">Invoice: <span className="font-normal text-teal-700">{orderInfo?.invoiceNo || "---"}</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <ReadOnlyField label="Client Name" value={orderInfo?.clientName} />
            <ReadOnlyField label="Designation" value={orderInfo?.designation} />
            <ReadOnlyField label="Contact no." value={orderInfo?.contactNo} />
            <ReadOnlyField label="Email_id" value={orderInfo?.email} />
          </div>

          {/* Dynamic Service List */}
          <h3 className="text-center font-bold text-sm underline mb-6 uppercase tracking-widest">Service Performance Rating</h3>
          
          <div className="border rounded-md overflow-hidden mb-8 shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-[10px] font-bold text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-3">Service Provided</th>
                  <th className="px-6 py-3 text-center">Your Rating</th>
                </tr>
              </thead>
             <tbody className="divide-y">
  {orderInfo?.services?.map((service, index) => (
    <tr key={index}>
      <td className="px-6 py-4">
        <div className="font-semibold text-gray-700 text-sm">{service.name}</div>
        
        {/* STYLED ADMIN MESSAGE FOR CLIENT */}
        {service.adminMessage && (
          <div className="mt-2 p-2 bg-blue-50 border-l-4 border-blue-400 rounded-r">
            <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
              <span className="font-bold uppercase mr-1">Note:</span> {service.adminMessage}
            </p>
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRate(service.name, star)}
            >
              <Star
                size={22}
                className={star <= (serviceRatings[service.name] || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
              />
            </button>
          ))}
        </div>
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              className="w-full p-4 border border-gray-200 rounded-md bg-gray-50 text-sm h-28 outline-none focus:border-[#0F241A] transition-all"
              placeholder="Any specific comments about the quality of work or the team?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex justify-center gap-4 pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#28B463] text-white px-12 py-3 rounded-sm font-bold uppercase text-[10px] tracking-widest hover:bg-[#239B56] transition-all disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Send Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Simple component for the Read-Only Info boxes
const ReadOnlyField = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <label className="text-[10px] font-bold text-gray-500 w-24 uppercase">{label}</label>
    <div className="flex-1 p-2 bg-gray-50 border border-gray-200 rounded text-sm text-gray-800 font-medium">{value || "---"}</div>
  </div>
);

export default ClientFeedback;