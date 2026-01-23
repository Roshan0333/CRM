import React from "react";
import "../../style/salesManager/totalSales.css";
import { useEffect, useState } from "react";
import { currentYearSales } from "../../services/salesDepartmentApi";
import LastUpdatePopUp from "../salesExecutive/LastupdatePopUp";

const TotalSales = () => {

  const [salesList, setSalesList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  const [monthList, setMonthList] = useState([]);
  const [TlList, setTlList] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedTL, setSelectedTL] = useState("");

  const [popupFlag, setPopupFlag] = useState(false);
  const [commentList, setCommentList] = useState([])

  let offPopupFlag = () => {
    setPopupFlag(prev => !prev);
  }


  useEffect(() => {
    ; (
      async () => {
        const apiResponse = await currentYearSales();

        if (!apiResponse.fetchMessage) {
          console.log(apiResponse.data)
          return
        }
        else if (!apiResponse.ok) {
          alert(apiResponse.data || "No Sales")
          return
        }
        else {

          const apiSalesList = apiResponse.data.TotalSales || [];

          setSalesList(apiSalesList);
          setFilterList(apiSalesList);

          console.log(apiSalesList)

          let months = [...new Set(
            apiSalesList.map((item) => {
              return new Date(item.Date).toLocaleDateString("default", { month: "long" });
            })
          )]

          let teamLeads = [...new Set(
            apiSalesList.map((item) => {
              return `${item.TeamLeaderDetail.email}`
            })
          )]

          setMonthList(months);
          setTlList(teamLeads);
        }
      }

    )()
  }, [])

  const applyFilter = () => {
    let filtered = [...salesList];

    if (selectedMonth) {
      filtered = filtered.filter((item) => {
        return new Date(item.Date).toLocaleDateString("default", { month: "long" }) === selectedMonth
      })
    }

    if (selectedTL) {
      filterList = filterList.filter((item) => {
        return `${item.TeamLeaderDetail.email}` === selectedTL
      })
    }

    setFilterList(filterList)
  }

  return (
    <div
      id="tsm-totalSales-wrapper"
      className="p-1 mt-5"
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <h3 className="tsm-title fw-bold mb-4 text-secondary">Total Sales</h3>

      {/* FILTER SECTION */}
      <div className="d-flex flex-column mb-5 mx-4">
        <div
          className="d-flex align-items-center justify-content-between mb-4"
          style={{ gap: "20px" }}
        >
          <div className="d-flex" style={{ gap: "20px", flex: "1" }}>
            <select className="form-select shadow-sm fw-bold tsm-select">
              <option>Month</option>
              {monthList.map((item, index) => {
                return <option value={item} key={index}>{item}</option>
              })}
            </select>

            <select className="form-select shadow-sm fw-bold tsm-select">
              <option>Team Leader Email</option>
              {TlList.map((item, index) => {
                return <option value={item} key={index}>{item}</option>
              })}
            </select>
          </div>

          <button className="btn btn-primary px-4 tsm-search-btn" onClick={applyFilter}>
            Search
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="d-flex justify-content-center mx-4">
        <div
          className="tsm-table-container shadow-lg p-4 bg-white rounded"
        >
          <div className="tsm-table-wrapper">
            <table className="tsm-table" style={{ minWidth: "1200px" }}>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Client Name</th>
                  <th>Email_id</th>
                  <th>Contact no.</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>TL Name</th>
                  <th>Sales Executive</th>
                  <th>Services</th>
                  <th>Activity</th>
                </tr>
              </thead>

              <tbody>
                {filterList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ClientDetails.CompanyName}</td>
                    <td>{item.ClientDetails.ClientName}</td>
                    <td>{item.ClientDetails.Email_Id}</td>
                    <td>{item.ClientDetails.Contact_No}</td>
                    <td>{new Date(item.Date).toLocaleDateString()}</td>
                    <td>{item.Amount}</td>
                    <td>{item.TeamLeaderDetail.firstName} {item.TeamLeaderDetail.lastName}</td>
                    <td>{item.SalerDetail.firstName} {item.SalerDetail.lastName}</td>
                    <td>{item.Service}</td>

                    <td>
                      <button className="tsm-view-btn" onClick={() => {
                        setPopupFlag(prev => !prev);
                        setCommentList(filterList[index].ClientDetails.Comments)
                        }}>View</button>
                    </td>
                  </tr>
                ))}

                {filterList.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center text-danger fw-bold">
                      No Results Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {popupFlag && <LastUpdatePopUp closePopup={offPopupFlag} statusData={commentList} />}
    </div>
  );
};

export default TotalSales;
