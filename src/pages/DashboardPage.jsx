import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center font-inter">
      <div className="text-center space-y-6">
        <p className="text-lg text-gray-500">
          🚧 Site is under development. More features coming soon!
        </p>
        <button
          onClick={() => navigate('/blind75')}
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition"
        >
          Go to Blind 75
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
