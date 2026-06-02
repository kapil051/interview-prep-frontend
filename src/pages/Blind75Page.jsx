import useBlind75 from '../hooks/useBlind75';

const DIFFICULTY_STYLES = {
  EASY: 'bg-green-100 text-green-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HARD: 'bg-red-100 text-red-700',
};

const STATUS_STYLES = {
  NOT_STARTED: 'bg-gray-100 text-gray-600',
  SOLVED: 'bg-green-100 text-green-700',
  ATTEMPTED: 'bg-yellow-100 text-yellow-700',
  TODO: 'bg-blue-100 text-blue-700',
};

function QuestionCard({ question }) {
  const {
    title,
    difficulty,
    topic,
    pattern,
    practiceLink,
    videoLink,
    videoAvailability,
    status,
  } = question;

  const isVideoComingSoon = videoAvailability === 'COMING_SOON';

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">{title}</h3>
        <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_STYLES[difficulty] ?? 'bg-gray-100 text-gray-600'}`}>
          {difficulty}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {topic && (
          <span className="text-xs font-medium bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
            {topic}
          </span>
        )}
        {pattern && (
          <span className="text-xs font-medium bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
            {pattern}
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex gap-2">
          <a
            href={practiceLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-1.5 text-xs font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition"
          >
            Practice
          </a>
          <a
            href={!isVideoComingSoon ? videoLink : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={isVideoComingSoon}
            className={`flex-1 text-center py-1.5 text-xs font-medium rounded-lg transition border ${
              isVideoComingSoon
                ? 'border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
                : 'border-primary-600 text-primary-600 hover:bg-primary-50'
            }`}
          >
            {isVideoComingSoon ? 'Video Soon' : 'Video'}
          </a>
        </div>

        <span className={`self-start text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-600'}`}>
          {status?.replace('_', ' ')}
        </span>
      </div>
    </div>
  );
}

function Blind75Page() {
  const { questions, loading, error } = useBlind75();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-inter">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 font-inter">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Blind 75</h1>
        <p className="text-sm text-gray-500 mb-8">{questions.length} questions</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {questions.map((q) => (
            <QuestionCard key={q.id ?? q._id} question={q} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blind75Page;
