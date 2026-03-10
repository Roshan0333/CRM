import { useEffect, useState } from "react";
import { axiosInstance } from "../../api/managementApi/axiosInstance";


function UpdateMember({ isOpen, onClose, member, refreshMembers }) {
  if (!isOpen || !member) return null;
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [accountNo, setAccountNo] = useState("")
  const [upiId, setUpiId] = useState("")
  const [status, setStatus] = useState("Inactive")

  useEffect(() => {
  if (member) {
    setEmail(member.email || "");
    setContact(member.contact || "");
    setAccountNo(member.accountNo || "");
    setUpiId(member.upiId || "");
  }
}, [member]);

 const handleUpdate = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const payload = {
      email,
      contact,
      accountNo,
      upiId,
      status
    };

    await axiosInstance.put(
      `/update/${member._id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onClose();
    refreshMembers();
  } catch (error) {
    console.error(error);
    alert("Failed to update member details");
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id) => {
  // if (!window.confirm("Are you sure you want to delete this member?")) return;

  try {
    const token = localStorage.getItem("token");

    await axiosInstance.delete(`/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    onclose()
    refreshMembers(); // reload list instantly
  } catch (error) {
    console.error(error);
    alert("Failed to delete member");
  }
};



  return (
    <div id="popupoverlay" onClick={onClose}>
      <div id="popupbox" onClick={(e) => e.stopPropagation()}>
        <div id="popupheader">
          <h3 id="popuptitle">{member.name}</h3>
        </div>

        <div id="popupbody">
          <div className="modal-content-wrapper">
            {/* Left Side - Bank Details */}
            <div className="bank-details-section">
              <h3 className="section-title">Edit Details</h3>

              <div className="form-field">
                <label>Email Id</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div className="form-field">
                <label>Contact no</label>
                <input type="text" value={contact}  onChange={(e)=>setContact(e.target.value)}/>
              </div>

              <div className="form-field">
                <label>Account No.</label>
                <input type="text" value={accountNo} onChange={(e)=>setAccountNo(e.target.value)} />
              </div>

              <div className="form-field">
                <label>UPI ID</label>
                <input type="text" value={upiId} onChange={(e)=>setUpiId(e.target.value)}/>
              </div>
              
            </div>

            {/* Right Side - Payout & Status */}
            <div className="user-details-section">
              <div className="detail-item">
                <span className="detail-label">Current Month Payout</span>
                <span className="detail-value">: 2000/-</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Total Payout</span>
                <span className="detail-value detail-value2">
                  : 2000/-
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Status</span>
                <select value={status} onChange={(e)=>setStatus(e.target.value)} >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <div>
                  <input type="text" 
                  placeholder="joining date"
                  className="join-date" />
                </div>
              </div>


              <div className="modal-actions">
                <button className="update-btn" onClick={handleUpdate}>
                  Update
                </button>

                <button className="close-btn" onClick={onClose}>
                  Close
                </button>

                <button className="delete-btn" onClick={() => handleDelete(member._id)}>Delete Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMember;
