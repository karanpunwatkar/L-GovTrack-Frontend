export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
        
        {/* About Section */}
        <div>
          <h3 className="font-semibold text-blue-800 mb-2">About L-GovTrack</h3>
          <p>
            Empowering citizens to report civic issues, track progress, and build cleaner, smarter cities. Transparency meets action.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-blue-800 mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="#points" className="hover:text-blue-600">⭐ Points</a>
            </li>
            <li>
              <a href="#rewards" className="hover:text-blue-600">🎖 Rewards</a>
            </li>
            <li>
              <a href="#auth" className="hover:text-blue-600">👤 Login / Signup</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-blue-800 mb-2">Contact Us</h3>
          <p>Email: <a href="mailto:support@lgovtrack.in" className="text-blue-600 hover:underline">support@lgovtrack.in</a></p>
          <p>Location: Pune, Maharashtra</p>
        </div>

      </div>

      {/* Bottom note */}
      <div className="text-center text-xs text-gray-500 py-3 border-t">
        © {new Date().getFullYear()} L-GovTrack. All rights reserved.
      </div>
    </footer>
  );
}
