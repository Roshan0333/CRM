import "../../style/salesManager/SalesManagerProspectForm.css";

function ProspectForm() {
  // const handleSubmit = () => {}; TODO  form submission handling

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
                <input type="text" id="company" name="company" />
              </div>

              <div id="form-row">
                <label htmlFor="client">Client Name</label>
                <input type="text" id="client" name="client" />
              </div>

              <div id="form-row">
                <label htmlFor="email">Email_id</label>
                <input type="email" id="email" name="email" />
              </div>

              <div id="form-row">
                <label htmlFor="contact">Contact no.</label>
                <input type="text" id="contact" name="contact" />
              </div>

              <div id="form-row">
                <label htmlFor="reminder">Reminder Date</label>
                <input type="text" id="reminder" name="reminder" />
              </div>

              <div id="form-row">
                <label htmlFor="comment">Comment</label>
                <textarea id="comment" name="comment" rows="4"></textarea>
              </div>

              <div
                id="form-row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button type="submit" id="update-btn">
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
