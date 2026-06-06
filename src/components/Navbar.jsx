import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 via-purple-800 to-violet-900 border-b border-purple-500/30 shadow-lg shadow-purple-500/20 font-['Inter',sans-serif]">
      <div className="flex items-center justify-between px-6 py-4 w-full">
        
         {/* Logo */}
         <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0">

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
              fill="#facc15"
              stroke="#facc15"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          
          <span className="font-bold text-lg text-white tracking-tight">
            CodeKraft
          </span>

         </button>



        {/* Auth buttons */}
        <div className="flex items-center gap-2.5">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm font-medium text-white bg-transparent border border-white rounded-md cursor-pointer hover:bg-white/10 transition-colors"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-1.5 text-sm font-medium text-white bg-transparent border border-white rounded-md cursor-pointer hover:bg-white/10 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-4 py-1.5 text-sm font-medium text-purple-900 bg-white border border-white rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
