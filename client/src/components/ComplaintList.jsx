import { useEffect, useState } from "react";
import axios from "axios";
import { MessageCircle, MapPin, Clock } from "lucide-react";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = () => {
    axios
      .get("http://localhost:5000/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error("Error fetching complaints:", err));
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/complaints/${id}`, { status });
      fetchComplaints(); // Refresh after update
    } catch (err) {
      console.error("❌ Failed to update status:", err);
    }
  };

  const getStatusBadge = (status = "Pending") => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Resolved":
        return <span className={`${base} bg-green-100 text-green-700`}>Resolved</span>;
      case "In Progress":
        return <span className={`${base} bg-yellow-100 text-yellow-700`}>In Progress</span>;
      default:
        return <span className={`${base} bg-red-100 text-red-700`}>Pending</span>;
    }
  };

  return (
    <section className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
        🧾 All Reported Complaints
      </h2>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-600">No complaints yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{c.title}</h3>
                  {getStatusBadge(c.status)}
                </div>
                <p className="text-sm text-gray-700">{c.description}</p>

                {c.imageUrl && (
                  <img
                    src={c.imageUrl}
                    alt="Uploaded"
                    className="mt-4 rounded-xl h-48 w-full object-cover border"
                  />
                )}
              </div>

              <div className="flex justify-between items-center mt-4 text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {new Date(c.createdAt).toLocaleString()}
                </div>
                {c.lat && c.lng && (
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    {`${c.lat.toFixed(2)}, ${c.lng.toFixed(2)}`}
                  </div>
                )}
              </div>

              {/* ✅ Status Buttons */}
              <div className="mt-3 flex gap-2 text-xs">
                {["Pending", "In Progress", "Resolved"].map((stat) => (
                  <button
                    key={stat}
                    onClick={() => updateStatus(c.id, stat)}
                    className={`px-2 py-1 rounded border ${
                      c.status === stat
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {stat}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ComplaintList;
