import { useState, useEffect } from 'react';
import { getAllQuestions } from '../services/blind75Service';

function useBlind75() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllQuestions()
      .then((res) => setQuestions(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load questions.'))
      .finally(() => setLoading(false));
  }, []);

  return { questions, loading, error };
}

export default useBlind75;
