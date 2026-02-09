import { useState } from "react";

function UpdateDataPopUp({ closeUpdatePopup, updateFunction = null }) {

    let todayDate = new Date().toLocaleDateString("en-GB");
    let currentTime = new Date().toLocaleTimeString("en-IN");

    const [reminderDate, setReminderDate] = useState("");
    const [clientStatus, setClientStatus] = useState("");
    const [comment, setComment] = useState("");

    return (
        <div id="popup-overlay" onClick={closeUpdatePopup}>
            <div id="popup-box" onClick={(e) => e.stopPropagation()}>
                <div id="popup-header">
                    <h3>Update Call Details</h3>
                    <button id="close-btn" onClick={closeUpdatePopup}>
                        Close
                    </button>
                </div>

                <div id="popup-content">
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="talk"
                                onChange={(e) => {
                                    setSaleFlag(false)
                                    setClientStatus(e.target.value)
                                }} />
                            Talk
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="not-talk"
                                onChange={(e) => {
                                    setClientStatus(e.target.value)
                                }}
                            />
                            Not Talk
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="delete"
                                onChange={(e) => {
                                    setClientStatus(e.target.value)
                                }}
                            />
                            Delete Client’s Profile
                        </label>
                    </div>

                    <div id="inputDiv">
                        <label id="inputLabel">Reminder Date: </label>
                        <input type="date" id="inputField" onChange={(e) => setReminderDate(e.target.value)} />
                    </div>

                    <div className="comment-section" style={{ height: "150px" }}>
                        <label htmlFor="comment">Comment</label>
                        <textarea id="comment" placeholder="" onChange={(e) => setComment(e.target.value)}></textarea>
                    </div>

                    <button id="update-btn" onClick={() => {

                        let comments = {
                            Date: todayDate,
                            Time: currentTime,
                            Comment: comment,
                        }

                        updateFunction(clientStatus, comments, reminderDate);
                        closeUpdatePopup()
                    }}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateDataPopUp;