// frontend/src/pages/index.js

import { useState } from 'react';
import Chart from '../components/Chart';

export default function Home() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [insights, setInsights] = useState('');
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      setSummary(data.summary || '');
      setError('');

      if (data.insights) {
        setInsights(data.insights);

        const labels = data.insights.split(', ').map((insight, index) => `Insight ${index + 1}`);
        const values = Array(labels.length).fill(1); // Dummy values
        setChartData({ labels, values });
      } else {
        setInsights('No insights available.');
        setChartData({ labels: [], values: [] });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('An error occurred while processing your file.');
      setSummary('');
      setInsights('');
      setChartData({ labels: [], values: [] });
    }
  };

  return (
    <div className="container">
      <h1>Upload your text content</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {error && (
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
      {summary && (
        <div className="summary">
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
      {insights && (
        <div className="insights">
          <h2>Key Insights</h2>
          <p>{insights}</p>
          <Chart data={chartData} />
        </div>
      )}
    </div>
  );
}
