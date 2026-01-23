import React, { useEffect, useState } from "react";
import "../../style/salesManager/totalprospect.css";
import dot from "../../assets/salesTeamLead/dot.svg";
import { allProspectList } from "../../services/salesDepartmentApi";

function TotalProspect() {
  const [dateRange, setDateRange] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [callOutcome, setCallOutcome] = useState("talk");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  let [prospectList, setProspectList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  let [memberEmailList, setMemberEmailList] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState();


  let handleSearch = () => {

    if (!dateRange) {
      let clientList = prospectList.filter((item) => { return item.AdderDetails.email === selectedEmail });
      setFilterList(clientList);
      return
    }
    else if (!selectedEmail) {
      let day = 0;

      if (dateRange === "last-7") {
        day = 7
      }
      else {
        day = 30
      }

      let lastDate = new Date();
      let startDate = new Date();

      startDate.setDate(lastDate.getDate() - day);

      let clientList = prospectList.filter((item) => {
        const addDate = new Date(item.AddDate)

        return addDate >= startDate && addDate <= lastDate;
      })

      setFilterList(clientList);
      return
    }
    else {

      let day = 0;

      if (dateRange === "last-7") {
        day = 7
      }
      else {
        day = 30
      }

      let lastDate = new Date();
      let startDate = new Date();

      startDate.setDate(lastDate.getDate()-day);

      let clientList = prospectList.filter((item) => {
        return item.AdderDetails.email === selectedEmail
      });

      let filterList = clientList.filter((item) => {
        const addDate = new Date(item.AddDate);
        return addDate >= startDate && addDate <= lastDate
      })

      setFilterList(filterList);
      return
    }

  };

  // const data = [
  //   {
  //     companyName: "Bold text column",
  //     clientName: "Bold text column",
  //     emailId: "Bold text column",
  //     contactNo: "Bold text column",
  //     reminderDate: "Bold text column",
  //   },
  //   {
  //     companyName: "Bold text column",
  //     clientName: "Bold text column",
  //     emailId: "Bold text column",
  //     contactNo: "Bold text column",
  //     reminderDate: "Bold text column",
  //   },
  //   {
  //     companyName: "Bold text column",
  //     clientName: "Bold text column",
  //     emailId: "Bold text column",
  //     contactNo: "Bold text column",
  //     reminderDate: "Bold text column",
  //   },
  //   {
  //     companyName: "Bold text column",
  //     clientName: "Bold text column",
  //     emailId: "Bold text column",
  //     contactNo: "Bold text column",
  //     reminderDate: "Bold text column",
  //   },
  // ];

  useEffect(() => {
    ; (
      async () => {
        let apiRespnse = await allProspectList();

        if (!apiRespnse.fetchMessage) {
          console.log(apiRespnse.data);
          return
        }
        else if (!apiRespnse.ok) {
          alert(apiRespnse.data || "Something Wrong");
          return
        }

        let email = apiRespnse.data.ProspectList.map((item) => item.AdderDetails?.email)
        const uniqueEmail = [...new Set(email)];

        setProspectList(apiRespnse.data.ProspectList);
        setMemberEmailList(uniqueEmail);
      }
    )()
  }, [])

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateModal(false);
  };

  return (
    <>
      <div className="leadprospectContainer">
        <h1>Total Prospect</h1>

        {/* Filter Section */}
        <div className="filter">
          <select
            className="selectControl"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
          >
            <option value="">Member Name</option>
            {memberEmailList.map((item, index) => {
              return <option value={item}>{item}</option>
            })}
          </select>

          <select
            className="selectControl"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="">Select Date</option>
            <option value="last-7">Last 7 Days</option>
            <option value="last-30">Last 30 Days</option>
          </select>

          <button className="searchBtn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Table Container */}
        <div className="tableContainer">
          <table id="stl-table">
            <thead>
              <tr>
                <th></th>
                <th>Added By</th>
                <th>Company Name</th>
                <th>Client Name</th>
                <th>Email_id</th>
                <th>Contact No.</th>
                <th>Reminder Date</th>
                <th>Activity</th>
                <th>Last Update</th>
              </tr>
            </thead>

            <tbody>
              {(filterList.length > 0) ?
                filterList.length > 0 ? (
                  filterList.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <img src={dot} alt="" />
                      </td>
                      <td>{item.AdderDetails.firstName} {item.AdderDetails.lastName}</td>
                      <td>{item.CompanyName}</td>
                      <td>{item.ClientName}</td>
                      <td>{item.Email_Id}</td>
                      <td>{item.Contact_No}</td>
                      <td>{new Date(item.Reminder_Date).toLocaleDateString("en-GB")}</td>
                      <td>
                        <button onClick={() => setUpdateModal(true)}>
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => {
                          setViewModal(true);
                          // setSelectIndex(idx);
                          setCommentList(filterList[idx].Comments)
                        }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ padding: "20px", color: "#6b7280" }}>
                      No prospects found.
                    </td>
                  </tr>
                ) : prospectList.length > 0 ? (
                  prospectList.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <img src={dot} alt="" />
                      </td>
                      <td>{item.AdderDetails.firstName} {item.AdderDetails.lastName}</td>
                      <td>{item.CompanyName}</td>
                      <td>{item.ClientName}</td>
                      <td>{item.Email_Id}</td>
                      <td>{item.Contact_No}</td>
                      <td>{new Date(item.Reminder_Date).toLocaleDateString("en-GB")}</td>
                      <td>
                        <button onClick={() => setUpdateModal(true)}>
                          Update
                        </button>
                      </td>
                      <td>
                        <button onClick={() => {
                          setViewModal(true);
                          // setSelectIndex(idx);
                          setCommentList(prospectList[idx].Comments)
                        }}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ padding: "20px", color: "#6b7280" }}>
                      No prospects found.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}

      {/* UPDATE MODAL */}
      {updateModal && (
        <div id="popup-overlay" onClick={() => setUpdateModal(false)}>
          <div id="popup-box" onClick={(e) => e.stopPropagation()}>
            <div id="popup-header">
              <h3>Update Call Details</h3>
            </div>

            <div id="popup-content">
              <form onSubmit={handleUpdate}>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="talk"
                      checked={callOutcome === "talk"}
                      onChange={(e) => setCallOutcome(e.target.value)}
                    />
                    Talk
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="not-talk"
                      checked={callOutcome === "not-talk"}
                      onChange={(e) => setCallOutcome(e.target.value)}
                    />
                    Not Talk
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="delete"
                      checked={callOutcome === "delete"}
                      onChange={(e) => setCallOutcome(e.target.value)}
                    />
                    Delete Client’s Profile
                  </label>
                </div>

                <div className="comment-section">
                  <label>Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                  />
                </div>

                <button id="update-btn" type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewModal && (
        <div id="popup-overlay" onClick={() => setViewModal(false)}>
          <div id="popup-box" onClick={(e) => e.stopPropagation()}>
            <div id="popup-header">
              <h3>Last Update</h3>
              <button id="close-btn" onClick={() => setViewModal(false)}>
                Close
              </button>
            </div>

            <div id="popup-content">
              {commentList.reverse().map((item, i) => {
                return <div className="update-row">
                  <p className="date">{item.Date} {item.Time}</p>
                  <p className="desc">{item.Comment}</p>
                </div>
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TotalProspect;
