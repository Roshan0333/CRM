import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.get("/profile").then(res => setUser(res.data));
  }, []);

  const update = () => {
    api.put("/profile", user);
    alert("Updated");
  };

  return (
    <div className="p-6">
      <input value={user.bankName || ""} onChange={e => setUser({...user, bankName: e.target.value})} />
      <input value={user.ifscCode || ""} onChange={e => setUser({...user, ifscCode: e.target.value})} />
      <button onClick={update}>Update</button>
    </div>
  );
}
