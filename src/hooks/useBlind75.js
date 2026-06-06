import { useState, useEffect } from 'react';
import { getAllQuestions, getStatuses, updateProgress } from '../services/blind75Service';

function useBlind75() {
  const [questions, setQuestions] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getAllQuestions(), getStatuses()])
      .then(([questionsRes, statusesRes]) => {
        setQuestions(questionsRes.data.data);
        setStatuses(statusesRes.data.data);
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to load questions.'))
      .finally(() => setLoading(false));
  }, []);

  const handleProgressUpdate = (questionId, status) => {
    updateProgress(questionId, status)
      .then(() => {
        setQuestions((prev) =>
          prev.map((q) => (q.id === questionId ? { ...q, status } : q))
        );
      })
      .catch((err) => setError(err.response?.data?.message || 'Failed to update progress.'));
  };

  return { questions, statuses, loading, error, handleProgressUpdate };
}

export default useBlind75;
