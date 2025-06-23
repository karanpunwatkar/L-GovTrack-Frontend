import { useEffect, useState } from "react";
import axios from "axios";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RewardsSection from "./components/RewardsSection";
import AllComplaintsList from "./components/AllComplaintsList";

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

        <section id="rewards" className="mt-8">
          <RewardsSection />
        </section>

        <section id="rewards" className="mt-8">
          <AllComplaintsList />
        </section>

        
      </main>

      <Footer />
    </div>
  );
}

export default App;
