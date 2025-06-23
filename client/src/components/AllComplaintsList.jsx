import { useEffect, useState } from "react";
import axios from "axios";

export default function AllComplaintsList() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  const filteredComplaints = complaints.filter((comp) =>
    filter === "All" ? true : comp.status === filter
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-700">📋 All Reported Complaints</h2>

        {/* Dropdown Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1 text-gray-700"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Complaints List */}
      {filteredComplaints.length > 0 ? (
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="p-4 rounded shadow bg-white border border-gray-200"
            >
              <h3 className="text-lg font-semibold">{complaint.title}</h3>
              <p className="text-sm text-gray-600">{complaint.description}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  complaint.status === "Resolved"
                    ? "bg-green-100 text-green-800"
                    : complaint.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {complaint.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No complaints to show.</p>
      )}
    </div>
  );
}
