// import React, { useState, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import axios from "axios"

// const Feedbacks = () => {
//   const [key, setKey] = useState("completed");
//   const [openCompleted, setOpenCompleted] = useState(null);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading]= useState(true);


//   const toggleDropdownCompleted = (index) => {
//     setOpenCompleted(openCompleted === index ? null : index);
//   };

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/complaints/my-tasks", {
//             headers: {
//           "Authorization": `Bearer ${token}`
//         }
//         });
//         setFeedbacks(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks();
//   }, []);

//   const renderStars = (rating) => (
//     <div style={{ display: "flex", gap: "3px", justifyContent: "center" }}>
//       {[...Array(5)].map((_, i) => (
//         <span
//           key={i}
//           style={{
//             color: i < rating ? "#ffc107" : "#ccc",
//             fontSize: "18px",
//             lineHeight: "1",
//           }}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   );



//   return (
//     <div
//       className="main-content-wrapper"
//       style={{ backgroundColor: "#ffffffff", minHeight: "100vh", width: "100%" }}
//     >
//       <style>{`
//         * { box-sizing: border-box; }
//         body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
//         .main-content-wrapper 
//         { padding-top: 60px; }
//         .container { 
//           width: 100%; 
//           padding: 40px 10px; 
//           margin: 0 auto; 
//           margin-left: 250px; 
//           width: calc(100% - 250px); 
//           margin-right: 0; 
//           margin-top: -60px; 
//         }
//         @media (max-width: 1020px) 
//         { .container
//          { margin-left: 0; 
//         width: 100%; 
//         margin-top: 0; } }
//         .tabs-container 
//         { display: flex; 
//          gap: 0; 
//          border-bottom: 1px solid #ddd; 
//          background: #ffffffff; 
//          width: 100%; 
//          padding:0px 50px }
//         .tab-button 
//         { background: transparent; 
//          border: 1px solid transparent; 
//          border-bottom: none; 
//          padding: 1px 34px; 
//          font-size: 32px; 
//          font-weight: 400; color: #5A5C69;
//           cursor: pointer; 
//          transition: all 0.3s ease; 
//          border-top-left-radius: 10px; 
//          border-top-right-radius: 10px; 
//          }
//         .tab-button.active 
//         { 
//         background: #fff; 
//          border: 1px solid #ddd; 
//          border-bottom:none; 
//          box-shadow: 0 -2px 6px rgba(0,0,0,0.05); 
//          transform: translateY(1px); }
//         .tab-content 
//         { 
//         background: #fff; 
//          padding: 25px 80px 40px; 
//          border: 1px solid #ddd; 
//          border-top: none; 
//          border-radius: 0 0 12px 12px; 
//          box-shadow: 0 4px 10px rgba(0,0,0,0.04); width: 100%; }
//         .feedback-item 
//         { 
//         margin-bottom: 15px; 
//          border: 1px solid #e5e5e5; 
//          border-radius: 8px; 
//          overflow: hidden; 
//          background: white; 
//          box-shadow: 0 2px 4px rgba(0,0,0,0.05); width:1015px; }
//         .feedback-header 
//         { 
//         display: flex; 
//          justify-content: 
//          space-between; 
//          align-items: center; 
//          padding: 16px 80px 16px 40px; 
//          background: #fff; 
//          cursor: pointer; transition: background 0.2s; }
//         .feedback-header:hover 
//         { background: #f9f9f9; }
//         .header-left 
//         { 
//         font-size: 25px; 
//          font-weight: 500; 
//          color: #000; }
//         .header-right 
//         { 
//         font-size: 25px; 
//          font-weight: 500; 
//          color: #000; 
//          display: flex;
//           align-items: center;
//           gap: 10px; }

//         .feedback-content 
//         { padding: 30px 35px 40px;
//           background: #fff;
//           border-top: 1px solid #eee; }

//         .form-row 
//         { display: grid; 
//          grid-template-columns: 1fr 1fr; 
//          gap: 40px; 
//          margin-bottom: 30px; }

//         .form-group 
//         { display: flex;
//           align-items: center; 
//          gap: 12px; 
//          margin-bottom:20px }

//         .form-label 
//         { min-width: 110px; 
//          font-weight: 600; 
//          color: #000; 
//          font-size: 16px; }

//         .form-input
//          { flex: 1; 
//           height: 35px; 
//           width: 307px; 
//           padding: 8px 12px; 
//           border: 1px solid #ccc;
//            border-radius: 4px;
//           font-size: 12px; 
//           background-color: #f9f9f9;}

//         .service-title 
//         { text-align: center; 
//          font-size: 25px; 
//          font-weight: 500;
//           text-decoration: underline; 
//          color: #000;
//           margin-bottom: 25px; }

//         .service-table
//          { width: 100%;
//            border-collapse: collapse; 
//           border: 1px solid #ddd; }

//         .service-table th, .service-table td 
//         { border-bottom: 1px solid #ddd;
//           text-align: center; 
//          padding: 12px 16px; 
//          background: #fff; }
         
//         .service-table th 
//         { font-weight: 600; color: #000; }
//         .service-name 
//         { font-weight: 500; color: #000; }
//         .action-buttons 
//         { display: flex; 
//          justify-content: center;
//           gap: 8px; 
//          flex-wrap: wrap; }
//         .btn 
//         { border: none; 
//          border-radius: 4px;
//           width:85px; 
//          height:21px; 
//          font-size: 12px; 
//          font-weight: 500; 
//          cursor: pointer;
//           color: white;
//           transition: opacity 0.2s; }
//         .btn-blue 
//         { background: #4972E8; }
//         .btn-green 
//         { background: #027402; }
//         .btn-red 
//         { background: #E86149; }
        
//         /* New internal style for the context box */
//         .feedback-context-box {
//             background-color: #fff4f4;
//             border: 1px solid #ffcccc;
//             border-radius: 5px;
//             padding: 15px;
//             margin-bottom: 25px;
//         }
//       `}</style>

//       <div className="container">
//         <div className="tabs-container">
//           <button
//             className={`tab-button active`}
//             onClick={() => setKey("completed")}
//           >
//             Client Reference
//           </button>
//         </div>

//         <div className="tab-content">
//           {feedbacks.map((item, index) => (
//             <div key={index} className="feedback-item">
//               <div
//                 className="feedback-header"
//                 onClick={() => toggleDropdownCompleted(index)}
//               >
//                 <div className="header-left">
//                   {item.index} {item.companyName}
//                 </div>
//                 <div className="header-right">
//                   <span style={{ fontWeight: "500", fontSize: "25px" }}>
//                     {item.invoiceNo}
//                   </span>
//                 </div>
//                 <div className="header-right">
//                   {openCompleted === index ? (
//                     <ChevronUp size={30} strokeWidth={2.5} />
//                   ) : (
//                     <ChevronDown size={30} strokeWidth={2.5} />
//                   )}
//                 </div>
//               </div>

//               {openCompleted === index && (
//                 <div className="feedback-content">
                  
//                   {item.feedbackId && (
//                     <div className="feedback-context-box">
//                        <h4 style={{ color: "#d63031", marginTop: 0 }}>Client's Original Feedback</h4>
//                        <p style={{ fontSize: "14px", color: "#333" }}>
//                         <strong>Client Comment:</strong> "{item.feedbackId.clientComment}"
//                        </p>
//                     </div>
//                   )}

//                   <div className="form-row">
//                     <div>
//                       <div className="form-group">
//                         <label className="form-label">Client Name</label>
//                         <input type="text" className="form-input" value={item.feedbackId.clientName}  />
//                       </div>
//                       <div className="form-group">
//                         <label className="form-label">Contact no.</label>
//                         <input type="text" className="form-input" value={item.contact_no} readOnly />
//                       </div>
//                     </div>

//                     <div>
//                       <div className="form-group">
//                         <label className="form-label">Designation</label>
//                         <input type="text" className="form-input" value={item.feedbackId.designation} readOnly />
//                       </div>
//                       <div className="form-group">
//                         <label className="form-label">Email_id</label>
//                         <input type="email" className="form-input mb-10" value={item.email_id} readOnly />
//                       </div>
//                     </div>
//                   </div>

//                   <h3 className="service-title">Service List</h3>

//                   <table className="service-table">
//                     <thead>
//                       <tr>
//                         <th style={{ width: "30%" }}>Service</th>
//                         <th style={{ width: "25%" }}>Rate</th>
//                         <th style={{ width: "45%" }}>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {item.services.map((service, i) => (
//                         <tr key={i}>
//                           <td className="service-name">{service.name}</td>
//                           <td>{renderStars(service.rating)}</td>
//                           <td>
//                             <div className="action-buttons">
//                               <button className="btn btn-blue">Message</button>
//                               <button className="btn btn-blue">Video / Audio</button>
//                               <button className="btn btn-green" style={{backgroundColor: "#49E876"}}>Upload</button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feedbacks;

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Star, MessageSquare, Video, CheckCircle } from "lucide-react";
import axios from "axios";

const Feedbacks = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolutionNote, setResolutionNote] = useState("");

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setResolutionNote(""); 
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/complaints/my-tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (complaintId) => {
    if (!resolutionNote.trim()) {
      alert("Please enter a resolution note first!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/complaints/resolve/${complaintId}`,
        { resolutionNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Status updated to Solved!");
        setFeedbacks(feedbacks.filter(f => f._id !== complaintId));
      }
    } catch (error) {
      alert("Error updating status");
    }
  };

  const renderStars = (rating) => (
    <div style={{ display: "flex", gap: "2px", justifyContent: "center" }}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? "#ffc107" : "none"} color={i < rating ? "#ffc107" : "#ccc"} />
      ))}
    </div>
  );

  return (
    <div className="feedback-container" style={{ padding: "10px 30px", marginLeft: "250px", background: "#f8f9fc" }}>

      <style>{`
        * { box-sizing: border-box; }
         .card { background: white; border: 1px solid #e3e6f0; border-radius: 8px; margin-bottom: 15px; overflow: hidden; }
        .card-header { padding: 15px 20px; display: flex; justify-content: space-between; cursor: pointer; align-items: center; }
        .card-body { padding: 20px; border-top: 1px solid #e3e6f0; }
        .problem-box { background: #fff4f4; border-left: 4px solid #e74a3b; padding: 12px; margin-bottom: 20px; }
        .grid-info { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .input-group label { display: block; font-size: 11px; font-weight: bold; color: #4e73df; margin-bottom: 4px; }
        .input-group input { width: 100%; padding: 8px; border: 1px solid #d1d3e2; border-radius: 4px; background: #f8f9fc; }
        .res-btn { background: #1cc88a; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: bold; }
        .res-btn:hover { background: #17a673; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .main-content-wrapper 
        { padding-top: 60px; }
        .container { 
          width: 100%; 
          padding: 40px 10px; 
          margin: 0 auto; 
          margin-left: 250px; 
          width: calc(100% - 250px); 
          margin-right: 0; 
          margin-top: -60px; 
        }
        @media (max-width: 1020px) 
        { .container
         { margin-left: 0; 
        width: 100%; 
        margin-top: 0; } }
        .tabs-container 
        { display: flex; 
         gap: 0; 
         border-bottom: 1px solid #ddd; 
         background: #ffffffff; 
         width: 100%; 
         padding:0px 50px }
        .tab-button 
        { background: transparent; 
         border: 1px solid transparent; 
         border-bottom: none; 
         padding: 1px 34px; 
         font-size: 32px; 
         font-weight: 400; color: #5A5C69;
          cursor: pointer; 
         transition: all 0.3s ease; 
         border-top-left-radius: 10px; 
         border-top-right-radius: 10px; 
         }
        .tab-button.active 
        { 
        background: #fff; 
         border: 1px solid #ddd; 
         border-bottom:none; 
         box-shadow: 0 -2px 6px rgba(0,0,0,0.05); 
         transform: translateY(1px); }
        .tab-content 
        { 
        background: #fff; 
         padding: 25px 80px 40px; 
         border: 1px solid #ddd; 
         border-top: none; 
         border-radius: 0 0 12px 12px; 
         box-shadow: 0 4px 10px rgba(0,0,0,0.04); width: 100%; }
        .feedback-item 
        { 
        margin-bottom: 15px; 
         border: 1px solid #e5e5e5; 
         border-radius: 8px; 
         overflow: hidden; 
         background: white; 
         box-shadow: 0 2px 4px rgba(0,0,0,0.05); width:1015px; }
        .feedback-header 
        { 
        display: flex; 
         justify-content: 
         space-between; 
         align-items: center; 
         padding: 16px 80px 16px 40px; 
         background: #fff; 
         cursor: pointer; transition: background 0.2s; }
        .feedback-header:hover 
        { background: #f9f9f9; }
        .header-left 
        { 
        font-size: 25px; 
         font-weight: 500; 
         color: #000; }
        .header-right 
        { 
        font-size: 25px; 
         font-weight: 500; 
         color: #000; 
         display: flex;
          align-items: center;
          gap: 10px; }

        .feedback-content 
        { padding: 30px 35px 40px;
          background: #fff;
          border-top: 1px solid #eee; }

        .form-row 
        { display: grid; 
         grid-template-columns: 1fr 1fr; 
         gap: 40px; 
         margin-bottom: 30px; }

        .form-group 
        { display: flex;
          align-items: center; 
         gap: 12px; 
         margin-bottom:20px }

        .form-label 
        { min-width: 110px; 
         font-weight: 600; 
         color: #000; 
         font-size: 16px; }

        .form-input
         { flex: 1; 
          height: 35px; 
          width: 307px; 
          padding: 8px 12px; 
          border: 1px solid #ccc;
           border-radius: 4px;
          font-size: 12px; 
          background-color: #f9f9f9;}

        .service-title 
        { text-align: center; 
         font-size: 25px; 
         font-weight: 500;
          text-decoration: underline; 
         color: #000;
          margin-bottom: 25px; }

        .service-table
         { width: 100%;
           border-collapse: collapse; 
          border: 1px solid #ddd; }

        .service-table th, .service-table td 
        { border-bottom: 1px solid #ddd;
          text-align: center; 
         padding: 12px 16px; 
         background: #fff; }
         
        .service-table th 
        { font-weight: 600; color: #000; }
        .service-name 
        { font-weight: 500; color: #000; }
        .action-buttons 
        { display: flex; 
         justify-content: center;
          gap: 8px; 
         flex-wrap: wrap; }
        .btn 
        { border: none; 
         border-radius: 4px;
          width:85px; 
         height:21px; 
         font-size: 12px; 
         font-weight: 500; 
         cursor: pointer;
          color: white;
          transition: opacity 0.2s; }
        .btn-blue 
        { background: #4972E8; }
        .btn-green 
        { background: #027402; }
        .btn-red 
        { background: #E86149; }
        
        /* New internal style for the context box */
        .feedback-context-box {
            background-color: #fff4f4;
            border: 1px solid #ffcccc;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 25px;
        }
      `}</style>

      <h2 style={{ color: "#5a5c69", marginBottom: "25px" }}>My Assigned Feedback Tasks</h2>

      {loading ? <p>Loading...</p> : feedbacks.map((item, index) => (
        <div key={item._id} className="card">
          <div className="card-header" onClick={() => toggleDropdown(index)}>
            <div>
              <strong style={{ fontSize: "16px" }}>{item.companyName}</strong>
              <div style={{ fontSize: "12px", color: "#858796" }}>Invoice: {item.invoiceNo}</div>
            </div>
            {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {openIndex === index && (
            <div className="card-body">
              <div className="problem-box">
                <small style={{ color: "#e74a3b", fontWeight: "bold" }}>CLIENT COMMENT:</small>
                <p style={{ margin: "5px 0 0", fontSize: "14px" }}>"{item.feedbackId?.clientComment}"</p>
              </div>

              <div className="grid-info">
                <div className="input-group">
                  <label>CLIENT NAME</label>
                  <input type="text" value={item.feedbackId?.clientName} readOnly />
                </div>
                <div className="input-group">
                  <label>EMAIL</label>
                  <input type="text" value={item.email_id} readOnly />
                </div>
                <div className="input-group">
                  <label>DESIGNATION</label>
                  <input type="text" value={item.feedbackId?.designation} readOnly />
                </div>
              </div>

              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                  <tr style={{ background: "#f8f9fc", textAlign: "left" }}>
                    <th style={{ padding: "10px", fontSize: "12px" }}>SERVICE</th>
                    <th style={{ padding: "10px", fontSize: "12px", textAlign: "center" }}>RATING</th>
                  </tr>
                </thead>
                <tbody>
                  {item.services.map((s, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #e3e6f0" }}>
                      <td style={{ padding: "10px", fontSize: "13px" }}>{s.name}</td>
                      <td style={{ padding: "10px" }}>{renderStars(s.rating)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ background: "#fdfdfd", padding: "15px", borderRadius: "5px", border: "1px dashed #d1d3e2" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "8px", display: "block" }}>RESOLUTION NOTE</label>
                <textarea 
                  style={{ width: "100%", height: "70px", padding: "10px", borderRadius: "4px", border: "1px solid #d1d3e2", marginBottom: "15px" }}
                  placeholder="Explain how you solved this issue..."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                />
                <button className="res-btn" onClick={() => handleResolve(item._id)}>
                  <CheckCircle size={18} /> Mark as Solved
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feedbacks;