function UpdateDataPopUp({ closeUpdatePopup }) {
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
                            <input type="radio" name="status" value="talk" />{" "}
                            Talk
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="not-talk"
                            />{" "}
                            Not Talk
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="delete"
                            />{" "}
                            Delete Client’s Profile
                        </label>
                    </div>

                    <div className="comment-section">
                        <label htmlFor="comment">Comment</label>
                        <textarea id="comment" placeholder=""></textarea>
                    </div>

                    <button id="update-btn">Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateDataPopUp;