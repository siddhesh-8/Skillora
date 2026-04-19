import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] border-t border-[#2D2D44] py-8 text-center text-[#94A3B8] text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Skillora</h3>
          <p className="text-xs">A decentralized, AI-powered peer learning platform where skills act as currency.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Explore</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/matches" className="hover:text-white">Find Teachers</Link></li>
            <li><Link to="/leaderboard" className="hover:text-white">Leaderboards</Link></li>
            <li><Link to="/premium" className="hover:text-white">Premium Plans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white">Trust & Safety</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#2D2D44] pt-8">
        &copy; {new Date().getFullYear()} Skillora. Learn. Teach. Grow.
      </div>
    </footer>
  );
}
