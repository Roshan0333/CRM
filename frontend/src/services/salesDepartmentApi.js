import axios from "axios";

const API_URL = "http://localhost:5000/api";

let role = localStorage.getItem("role");
let token = localStorage.getItem("token");

// export const addNewClientApi = async (clientData) => {
//   try {

//     let token = localStorage.getItem("token")

//     const response = await fetch(`${API_URL}/client/addClient`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(clientData)
//       }
//     );

//     const data = await response.json();

//     if(response.status === 500){
//         return {ok: false, data};
//     }
//     else{
//         return {ok: true, data: data};
//     }
//   }
//   catch (err) {
//     return { ok: false, data: { msg: `Error: ${err.message}` } };
//   }
// }


export const addNewClientApi = async (clientData) => {
  try {
    let response = await axios.post(
      `${API_URL}/client/addClient`,
      clientData,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    if (response.status === 200) {
      return { ok: true, fetchMessage: true, data: response.data }
    }
  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: true, fetchMessage: false, data: err.response.data.msg }
      }
      else {
        return { ok: true, fetchMessage: false, data: err.response.data.error }
      }
    }
    else {
      return { ok: false, fetchMessage: false, data: err.messasge }
    }
  }
}

export const updateClientStatusApi = async (clientData) => {
  try {
    let response = await axios.put(`${API_URL}/client/updateClientData`,
      clientData,
      {
        headers: {
          'Content-Type': "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    return { ok: true, fetchMessage: true, data: response.data.msg };
  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: true, fetchMessage: false, data: err.response.data.msg };
      }
      else {
        return { ok: true, fetchMessage: false, data: err.response.data.error };
      }
    }
    else {
      return { ok: false, fetchMessage: false, data: err.message };
    }
  }
}

export const hotClient = async () => {
  try {
    let response = await axios.get(
      `${API_URL}/client/hotClient`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    return { ok: true, fetchMessage: true, data: response.data.HotClient };
  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: true, fetchMessage: false, data: err.response.data.msg }
      }
      else {
        return { ok: true, fetchMessage: false, data: err.response.data.error }
      }
    }
    else {
      return { ok: false, fetchMessage: false, data: err.messasge };
    }
  }
}

export const todayReminderListApi = async () => {
  try {
    let response = await axios.get(
      `${API_URL}/remindercall/todayReminderCall`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );
    
      return { ok: true, fetchMessage: true, data: response.data.ReminderList };
  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: false, fetchMessage: true, data: err.response.data.msg };
      }
      else {
        return { ok: false, fetchMessage: true, data: err.response.data.error };
      }
    }
    else {
      return { ok: false, fetchMessage: false, data: err.message };
    }
  }
}

export const todayCallingListApi = async () => {
  try {
    let response = await axios.get(
      `${API_URL}/calllog/todayCallList`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    return { ok: true, fetchMessage: true, data: response.data };
  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: false, fetchMessage: true, data: err.response.data.msg };
      }
      else {
        return { ok: false, fetchMessage: true, data: err.response.data.error };
      }
    }
    else {
      return { ok: false, fetchMessage: false, data: err.message };
    }
  }
}

export const cutomerCallingListApi = async (startDate, endDate) => {
  try {
    
    let response = await axios.get(
      `${API_URL}/calllog/customDateCallList?StartDate=${startDate}&LastDate=${endDate}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    return { ok: true, fetchMessage: true, data: response.data.CallList };
  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: false, fetchMessage: true, data: err.response.data.msg };
      }
      else {
        return { ok: false, fetchMessage: true, data: err.response.data.error };
      }
    }
    else {
      return { ok: false, fetchMessage: false, data: err.message };
    }
  }
}

export const postSaleApi = async (salesData) => {
  try {
    let response = await axios.post(
      `${API_URL}/sales/saleDone`,
      salesData,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    return { ok: true, fetchMessage: true, data: response.data.msg };

  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: false, fetchMessage: true, data: err.response.data.msg };
      }
      else {
        return { ok: false, fetchMessage: true, data: err.response.data.error };
      }
    }
    else {
      return { ok: false, fetchMessage: false, data: err.message }
    }
  }
}

export const TotalSale = async () => {
  try {
    let response = await axios.get(
      `${API_URL}/sales/totalSales`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    return { ok: true, fetchMessage: true, data: response.data };
  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: false, fetchMessage: true, data: err.response.data.msg };
      }
      else {
        return { ok: false, fetchMessage: true, data: err.response.data.error };
      }
    }
    else {
      return { ok: false, fetchMessage: false, data: err.message };
    }
  }
}

export const prospectList = async () => {
  try {
    let response = await axios.get(`
      ${API_URL}/client/prospectList`,
      {
        headers:{
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }
    );

    return {ok: true, fetchMessage: true, data: response.data};

  }
  catch (err) {
    if (err.response) {
      if (err.response.status < 500) {
        return { ok: false, fetchMessage: true, data: err.response.data.msg };
      }
      else {
        return { ok: false, fetchMessage: true, data: err.response.data.error };
      }
    }
    else{
      return {ok: false, fetchMessage: false, data: err.message};
    }
  }
}

export const allProspectList = async () =>{
  try{
    const response = await axios.get(
      `${API_URL}/client/allProspectList`,
      {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
    );

    return {ok: true, fetchMessage: true, data: response.data};
  }
  catch(err){
        console.log(err.response)
    if(err.response){
      if (err.response.status < 500) {
        return { ok: false, fetchMessage: true, data: err.response.data.msg };
      }
      else {
        return { ok: false, fetchMessage: true, data: err.response.data.error };
      }
    }
    else{
      return {ok:false, fetchMessage: false, data: err.message}
    }
  }
}

export const currentYearSales = async () => {
  try{
    const response = await axios.get(
      `${API_URL}/sales/yearSales`,
      {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
    );

    return {ok: true, fetchMessage: true, data: response.data};
  }
  catch(err){
    if(err.response){
      if(err.response.status < 500){
        return {ok: false, fetchMessage: true, data: err.response.data.msg};
      }
      else{
        return {ok: false, fetchMessage: true, data: err.response.data.error}
      }
    }
    else{
      return {ok: false, fetchMessage: false, data: err.message}
    }
  }
}

export const getAllTeam = async () => {
  try{
    const response = await axios.get(
      `${API_URL}/salesTeam/getAllTeam`,
      {
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
      }
    );

    return {ok: true, fetchMessage: true, data:response.data.teamList}
  }
  catch(err){
    if(err.response){
      if(err.response.status < 500){
        return {ok: false, fetchMessage: true, data: err.response.data.msg};
      }
      else{
        return {ok: false, fetchMessage: true, data: err.response.data.error}
      }
    }
    else{
      return {ok: false, fetchMessage: false, data: err.message}
    }
  }
}