import { useState } from "react";
import axios from "axios";

function ComplaintForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/complaints", formData);
      setMessage(response.data.message);
      console.log("✅ Complaint submitted:", response.data);
    } catch (error) {
      console.error("❌ Error submitting complaint:", error);
      setMessage("❌ Submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>

      <input
        type="text"
        name="title"
        placeholder="Issue Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Describe the issue..."
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
        rows="4"
        required
      ></textarea>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </form>
  );
}

export default ComplaintForm;
