import React from "react";
// import Css file here
import "../../style/finance/employeePayout.css";

function AddEmployeePayout() {
  return (
    <>
      <div id="employee-payout">
        <h1 id="page_heading">Add Employee Payout</h1>
        <div id="payout_container">
          <div id="left_box">
            <h3>Add Details</h3>
            <form id="payout_form">
              <div id="field">
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company Name"
                  required
                />
                <input
                  id="invoice"
                  name="invoice"
                  type="text"
                  placeholder="Invoice No"
                  required
                />
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="Mobile No."
                  required
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Id"
                  required
                />
              </div>
              <div id="department">
                <div>
                  <label for="sales">Sales Department</label>
                  <select id="sales" name="sales">
                    <option value="">Select Name</option>
                    <option value="">Select Name</option>
                  </select>
                </div>
                <div>
                  <label for="finance">Finanace Department</label>
                  <select id="finance" name="finance">
                    <option value="">Select Name</option>
                    <option value="">Select Name</option>
                  </select>
                </div>
                <div>
                  <label for="management">Management Department</label>
                  <select id="management" name="management">
                    <option value="">Select Name</option>
                    <option value="">Select Name</option>
                  </select>
                </div>
                <div>
                  <label for="employee">Employee</label>
                  <select id="employee" name="employee">
                    <option value="">Select Name</option>
                    <option value="">Select Name</option>
                  </select>
                </div>
                <div>
                  <label for="feedback">Feedback Department</label>
                  <select id="feedback" name="feedback">
                    <option value="">Select Name</option>
                    <option value="">Select Name</option>
                  </select>
                </div>
              </div>
              <button id="payBtn">Submit</button>
            </form>
          </div>

          <div id="right_box">
            <h3>View Details</h3>
            <div id="rb-row1">
              <span>1. Company Name</span>
              <span>Invoice no.</span>
              <select name="" id="">
                ...
              </select>
            </div>
            <div id="rb-row2">
              <span>1. Company Name</span>
              <span>Invoice no.</span>
              <select name="" id=""></select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEmployeePayout;
