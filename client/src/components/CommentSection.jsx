import { useEffect, useState } from "react";
import axios from "axios";

function CommentSection({ complaintId }) {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/complaints/${complaintId}/comments`);
      setComments(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleComment = async () => {
    if (!input.trim()) return;

    try {
      await axios.post(`http://localhost:5000/complaints/${complaintId}/comments`, {
        content: input
      });
      setInput("");
      fetchComments(); // Refresh comments
    } catch (err) {
      console.error("❌ Comment error:", err);
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-1">💬 Comments</h4>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
        {comments.map((c) => (
          <div
            key={c.id}
            className="bg-gray-100 rounded-md p-2 text-sm text-gray-800 shadow-sm"
          >
            <span className="block">{c.content}</span>
            <span className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 border px-2 py-1 rounded text-sm"
          placeholder="Add a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          onClick={handleComment}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
