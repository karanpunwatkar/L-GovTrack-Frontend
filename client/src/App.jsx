import { useEffect, useState } from "react";
import axios from "axios";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PointsSection from "./components/PointsSection";
import RewardsSection from "./components/RewardsSection";

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
        setMessage("");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-16 bg-gray-100 min-h-screen">
      <Navbar />

      <main className="p-4">
        <h1 className="text-3xl font-bold text-center mt-4">L-GovTrack 🚀</h1>
        <p className="mt-2 text-center text-gray-700">{message}</p>

        <section id="form" className="mt-6">
          <ComplaintForm />
        </section>

        <section id="list" className="mt-10">
          <ComplaintList />
        </section>

        
      </main>

      <Footer />
    </div>
  );
}

export default App;
