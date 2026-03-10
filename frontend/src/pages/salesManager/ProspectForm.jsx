import "../../style/salesManager/SalesManagerProspectForm.css";
import { useState } from "react";
import { addNewClientApi } from "../../services/salesDepartmentApi";

function ProspectForm() {
  // const handleSubmit = () => {}; TODO  form submission handling
  const [companyName, setCompanyName] = useState();
  const [clientName, setClientName] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [reminder, setReminder] = useState();
  const [clientType, setClientType] = useState();
  const [comment, setComment] = useState();

  const addClient = async (e) => {
    e.preventDefault();

    let today = new Date().toLocaleDateString("en-GB");
    let currentTime = new Date().toLocaleTimeString("en-IN");

    const formDate = {
      CompanyName: companyName,
      ClientName: clientName,
      Email_Id: email,
      Contact_No: contact,
      Reminder_Date: reminder,
      Client_Type: clientType,
      Comments: {
        Date: today,
        Time: currentTime,
        Comment: comment
      }
    }

    const apiResponse = await addNewClientApi(formDate);

    if(!apiResponse.ok){
      console.log(apiResponse.data);
      console.log("Client Add Failed")
      return
    }
    else if(!apiResponse.fetchMessage){
      console.log(apiResponse.data || "Client Add Failed");
      return
    }

    console.log(apiResponse.data.msg);
    setCompanyName("");
    setClientName("");
    setEmail("");
    setContact("");
    setReminder("");
    setComment("");
    setClientType("");

    window.location.reload();
  }

  return (
    <>
      {/* <h1>Prospect Page Under Construction</h1> */}
      <main>
        <div id="prospect-container">
          <div id="card">
            <h1>Prospect Form</h1>
            <form id="prospect-form">
              {/* <div id="form-box"></div> */}
              <div id="form-row">
                <label htmlFor="form-row">Company Name</label>
                <input type="text" id="company" name="company" required onChange={(e) => setCompanyName(e.target.value)} />
              </div>

              <div id="form-row">
                <label htmlFor="client">Client Name</label>
                <input type="text" id="client" name="client" required onChange={(e) => setClientName(e.target.value)} />
              </div>

              <div id="form-row">
                <label htmlFor="email">Email_id</label>
                <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div id="form-row">
                <label htmlFor="contact">Contact no.</label>
                <input type="text" minLength={10} maxLength={10} id="contact" name="contact" required onChange={(e) => setContact(e.target.value)} />
              </div>

              <div id="form-row">
                <label htmlFor="reminder">Reminder Date</label>
                <input type="date" id="reminder" name="reminder" required onChange={(e) => setReminder(e.target.value)} />
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
                <textarea id="comment" name="comment" rows="4" required onChange={(e) => setComment(e.target.value)}></textarea>
              </div>

              <div
                id="form-row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button type="submit" id="update-btn" onClick={(e) => addClient(e)}>
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

export default ProspectForm;
