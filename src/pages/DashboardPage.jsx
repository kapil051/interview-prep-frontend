import { useNavigate } from 'react-router-dom';

const roadmapNodes = [
  { id: 1, label: 'Arrays &\nHashing',   x: 80,  y: 40  },
  { id: 2, label: 'Two\nPointers',        x: 260, y: 40  },
  { id: 3, label: 'Stack',               x: 440, y: 40  },
  { id: 4, label: 'Sliding\nWindow',     x: 80,  y: 160 },
  { id: 5, label: 'Binary\nSearch',      x: 260, y: 160 },
  { id: 6, label: 'Trees',               x: 440, y: 160 },
  { id: 7, label: 'Graphs',              x: 170, y: 280 },
  { id: 8, label: 'Dynamic\nProg.',      x: 350, y: 280 },
];

const edges = [
  [1, 2], [2, 3],
  [1, 4], [2, 5], [3, 6],
  [4, 7], [5, 7], [6, 8],
  [7, 8],
];

const NODE_W = 110;
const NODE_H = 48;

function nodeCenter(node) {
  return { cx: node.x + NODE_W / 2, cy: node.y + NODE_H / 2 };
}

function RoadmapSVG() {
  return (
    <svg
      viewBox="0 0 580 370"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#a78bfa" />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* edges */}
      {edges.map(([fromId, toId]) => {
        const from = roadmapNodes.find(n => n.id === fromId);
        const to   = roadmapNodes.find(n => n.id === toId);
        const { cx: x1, cy: y1 } = nodeCenter(from);
        const { cx: x2, cy: y2 } = nodeCenter(to);
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ex = x2 - (dx / len) * (NODE_W / 2 + 6);
        const ey = y2 - (dy / len) * (NODE_H / 2 + 6);
        return (
          <line
            key={`${fromId}-${toId}`}
            x1={x1} y1={y1} x2={ex} y2={ey}
            stroke="#a78bfa" strokeWidth="1.5"
            strokeDasharray="5 3"
            markerEnd="url(#arrow)"
            opacity="0.7"
          />
        );
      })}

      {/* nodes */}
      {roadmapNodes.map(node => {
        const lines = node.label.split('\n');
        return (
          <g key={node.id}>
            <rect
              x={node.x} y={node.y}
              width={NODE_W} height={NODE_H}
              rx="10" ry="10"
              fill="#3b0764"
              stroke="#7c3aed"
              strokeWidth="1.5"
              filter="url(#glow)"
            />
            {lines.map((line, i) => (
              <text
                key={i}
                x={node.x + NODE_W / 2}
                y={node.y + (lines.length === 1 ? NODE_H / 2 + 5 : NODE_H / 2 - 4 + i * 16)}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fontFamily="Inter, sans-serif"
                fill="#e9d5ff"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* decorative circles */}
      {[{cx:520,cy:60,r:40},{cx:30,cy:320,r:25},{cx:540,cy:310,r:18}].map((c,i)=>(
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r}
          fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.25" />
      ))}
    </svg>
  );
}

function DashboardPage() {
  const navigate = useNavigate();

  function handleStartPracticing() {
    const token = localStorage.getItem('token');
    navigate(token ? '/blind75' : '/login');
  }

  return (
    <div className="min-h-screen font-['Inter',sans-serif] flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — content */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 bg-purple-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
            🚀 Start Your Interview Prep
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight m-0">
              Master Your Coding
            </h1>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight m-0 text-purple-700">
              Interview
            </h1>
            <span className="text-3xl lg:text-4xl font-bold text-purple-600 tracking-tight">
              With CodeKraft
            </span>
          </div>

          {/* Tagline */}
          <p className="text-gray-500 text-base leading-relaxed max-w-md m-0">
            Structured practice to crack top tech companies like Google, Meta, Amazon and more.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleStartPracticing}
              className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Start Practicing
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2.5 bg-white hover:bg-purple-50 text-purple-700 text-sm font-semibold rounded-lg border border-purple-300 transition-colors"
            >
              Sign Up Free
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-2">
            {[
              { value: '75', label: 'Problems' },
              { value: '14', label: 'Topics' },
              { value: '✓',  label: 'Progress Tracking' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-xl font-bold text-purple-700">{value}</span>
                <span className="text-xs text-gray-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — roadmap SVG */}
        <div className="w-full bg-gradient-to-br from-purple-950 via-purple-900 to-violet-950 rounded-2xl p-6 shadow-xl shadow-purple-500/20 border border-purple-700/30">
          <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-4">
            Learning Roadmap
          </p>
          <RoadmapSVG />
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;
