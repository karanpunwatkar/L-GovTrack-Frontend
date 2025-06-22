import { useEffect, useState } from "react";
import axios from "axios";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";

function App() {
  const [message, setMessage] = useState("...Loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/");
        console.log("✅ API Response:", response.data);
        setMessage(response.data);
      } catch (error) {
        console.error("❌ API Error:", error);
        setMessage("❌ Failed to fetch API");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">L-GovTrack 🚀</h1>
      <p className="mt-4 text-xl text-gray-700">{message}</p>
      <ComplaintForm />
      <ComplaintList />
    </div>
  );
}

export default App;
