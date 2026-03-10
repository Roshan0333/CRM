import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, CheckCircle, Paperclip, ExternalLink, Video, User, Briefcase, Phone, Mail } from "lucide-react";
import axios from "axios";

const ClientFeedback = () => {
  const { token } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);
  const [serviceRatings, setServiceRatings] = useState({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState({}); // For star hover effects

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/feedback/details/${token}`);
        const data = res.data;
        setOrderInfo(data);
        const initialRatings = {};
        if (data.services) {
          data.services.forEach((service) => {
            initialRatings[service.name] = 0;
          });
        }
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
    if (Object.values(serviceRatings).every(v => v === 0)) {
      return alert("Please provide at least one rating.");
    }
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5000/api/feedback/client-submit/${token}`, {
        ratings: serviceRatings,
        clientComment: comment
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-2xl shadow-xl text-center max-w-md w-full border-b-8 border-green-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={45} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Sent Successfully!</h2>
          <p className="text-gray-500 mt-4 leading-relaxed">Thank you for your feedback. We appreciate your partnership with Graphura.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Branding Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 px-2">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">GRAPHURA<span className="text-green-500">.</span></h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Quality Assurance Portal</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
            <p className="text-sm font-bold text-gray-800">Invoice #{orderInfo?.invoiceNo || "---"}</p>
            <p className="text-[11px] text-gray-500 uppercase tracking-wider">{orderInfo?.companyName}</p>
          </div>
        </div>

        {/* Client Info Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <InfoItem icon={<User size={14}/>} label="Client" value={orderInfo?.clientName} />
            <InfoItem icon={<Briefcase size={14}/>} label="Position" value={orderInfo?.designation} />
            <InfoItem icon={<Phone size={14}/>} label="Contact" value={orderInfo?.contactNo} />
            <InfoItem icon={<Mail size={14}/>} label="Email" value={orderInfo?.email} />
          </div>
        </div>

        {/* Services Section */}
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-2 h-6 bg-green-500 rounded-full"></div>
          Service Performance Rating
        </h3>

        <div className="space-y-4 mb-10">
          {orderInfo?.services?.map((service, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-green-200 transition-all shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* Left Side: Info & Previews */}
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-gray-800 text-lg">{service.name}</h4>
                  
                  {/* File Preview */}
                  {service.fileUrl && (
                    <div className="flex items-center gap-3">
                      {service.fileUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
                        <div className="group relative">
                          <img
                            src={`http://localhost:5000/${service.fileUrl}`}
                            alt="Work"
                            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-100 group-hover:border-green-400 transition-all shadow-sm"
                          />
                          <a href={`http://localhost:5000/${service.fileUrl}`} target="_blank" className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md border text-gray-600 hover:text-green-500">
                             <ExternalLink size={10} />
                          </a>
                        </div>
                      ) : (
                        <a href={`http://localhost:5000/${service.fileUrl}`} target="_blank" className="flex items-center gap-2 text-xs bg-gray-50 px-3 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition-all">
                          <Paperclip size={14} /> Download Attachment
                        </a>
                      )}
                      
                      {service.videoLink && (
                        <a href={service.videoLink} target="_blank" className="flex items-center gap-2 text-xs bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 text-blue-600 hover:bg-blue-100 transition-all font-medium">
                          <Video size={14} /> Watch Briefing
                        </a>
                      )}
                    </div>
                  )}

                  {service.adminMessage && (
                    <div className="text-[11px] text-gray-500 bg-gray-50 p-2 rounded-md border-l-2 border-gray-300 italic">
                      " {service.adminMessage} "
                    </div>
                  )}
                </div>

                {/* Right Side: Interaction */}
                <div className="w-full md:w-auto text-center md:text-right px-4 py-3 bg-gray-50 md:bg-transparent rounded-lg">
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-tighter mb-2">Click to Rate</p>
                  <div className="flex justify-center md:justify-end gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transform transition-transform active:scale-95 hover:scale-110"
                        onClick={() => handleRate(service.name, star)}
                        onMouseEnter={() => setHoverRating({ ...hoverRating, [service.name]: star })}
                        onMouseLeave={() => setHoverRating({ ...hoverRating, [service.name]: 0 })}
                      >
                        <Star
                          size={28}
                          className={`${
                            star <= (hoverRating[service.name] || serviceRatings[service.name] || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Textarea */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
           <label className="block font-bold text-gray-800 mb-3 text-sm">Additional Comments</label>
           <textarea
            className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-sm h-32 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all"
            placeholder="Share your thoughts about the project or the team's communication..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gray-900 text-white px-16 py-4 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-green-600 transition-all disabled:opacity-50 shadow-xl hover:shadow-green-200 active:scale-95"
            >
              {loading ? "Processing..." : "Submit My Feedback"}
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-12 font-medium">
          © 2024 Graphura Creative Studio • Secure Feedback Form
        </p>
      </div>
    </div>
  );
};

// Refined info component
const InfoItem = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
      <span className="text-green-500">{icon}</span>
      {label}
    </div>
    <div className="text-sm text-gray-800 font-semibold truncate">{value || "---"}</div>
  </div>
);

export default ClientFeedback;