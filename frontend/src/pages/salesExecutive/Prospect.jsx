import React, { useEffect, useState } from "react";
import "../../style/salesExecutive/prospect.css";
import { addNewClientApi } from "../../services/salesDepartmentApi";

function Prospect() {
  // const handleSubmit = () => {}; TODO  form submission handling

  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [reminderDate, setReminderDate] = useState();
  const [comment, setComment] = useState();
  const [clientType, setClientType] = useState();
  // const [resetFlag, setResetFlag] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let todayDate = new Date().toLocaleDateString("en-GB");
    let currentTime = new Date().toLocaleTimeString("en-GB");


    if (!companyName || !clientName || !email || !contactNumber || !reminderDate || !comment) {

      alert("All fields are required");
      return
    }
    else {
      if (!(/^[0-9]{10}$/.test(contactNumber))) {
        alert("Please Correct Contact Number.");
        return
      }
      else {
        let clientData = {
          CompanyName: companyName,
          ClientName: clientName,
          Email_Id: email,
          Contact_No: contactNumber,

          Comments: {
            Date: todayDate.toString(),
            Time: currentTime.toString(),
            Comment: comment
          },
          Reminder_Date: reminderDate.toString(),
          ClientType: clientType,
        }

        let response = await addNewClientApi(clientData);

        let responseMessage = response.fetchMessage;
        let responseStatus = response.ok;

        if (responseMessage) {
          alert("Client Add Successfully");
          setCompanyName("");
          setClientName("");
          setEmail("");
          setContactNumber("");
          setReminderDate("");
          setComment("");
          setClientType("");
        }
        else {
          if (responseStatus) {
            alert(response.data)
          }
          else {
            alert("NetWork Error");
            console.log(response.data)
          }
        }
      }
    }
  }

  return (
    <>
      {/* <h1>Prospect Page Under Construction</h1> */}
      <main>
        <div id="prospect-container">
          <div id="card">
            <h1>Prospect</h1>
            <form id="prospect-form">
              {/* <div id="form-box"></div> */}
              <div id="form-row">
                <label for="form-row">Company Name</label>
                <input type="text" id="company" name="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>

              <div id="form-row">
                <label for="client">Client Name</label>
                <input type="text" id="client" name="client" value={clientName} onChange={(e) => setClientName(e.target.value)} />
              </div>

              <div id="form-row">
                <label for="email">Email_id</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div id="form-row">
                <label for="contact">Contact no.</label>
                <input type="tel" id="contact" name="contact" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
              </div>

              <div id="form-row">
                <label for="reminder">Reminder Date</label>
                <input type="date" id="reminder" name="reminder" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} />
              </div>

              <div id="clientTypeMain-Div">
                <label>Client Type</label>
                <div id="client-type">
                  <div >
                    <input type="radio" name="clientPriority" value="High Priority" checked={clientType === "High Priority"} onChange={(e) => setClientType(e.target.value)} />
                    <label>High Priority</label>
                  </div>

                  <div>
                    <input type="radio" name="clientPriority" value="Medium Priority" checked={clientType === "Medium Priority"} onChange={(e) => setClientType(e.target.value)} />
                    <label>Medium Priority</label>
                  </div>

                  <div>
                    <input type="radio" name="clientPriority" value="Low Priority" checked={clientType === "Low Priority"} onChange={(e) => setClientType(e.target.value)} />
                    <label>Low Priority</label>
                  </div>
                </div>

              </div>

              <div id="form-row">
                <label htmlFor="comment">Comment</label>
                <textarea id="comment" name="comment" rows="4" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
              </div>

              <div
                id="form-row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button type="submit" id="update-btn" onClick={(e) => handleSubmit(e)}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Prospect;
