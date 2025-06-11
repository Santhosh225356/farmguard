import { useState } from 'react';

export default function Home() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDiagnose = async () => {
    if (!symptoms.trim()) {
      setError('Please enter crop symptoms.');
      return;
    }

    setLoading(true);
    setResult('');
    setError('');

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: symptoms }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result || 'No diagnosis available.');
      } else {
        setError(data.error || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the diagnosis service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌿 FarmGuard</h1>
        <p>AI-Powered Crop Disease Detection & Advisory System</p>
      </header>

      <main style={styles.main}>
        <h2>📝 Describe the symptoms of your crop</h2>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g., yellow spots on tomato leaves, white powder on stems..."
          rows={6}
          style={styles.textarea}
        />

        <button onClick={handleDiagnose} style={styles.button} disabled={loading}>
          {loading ? 'Analyzing...' : 'Diagnose Now'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {result && (
          <div style={styles.resultBox}>
            <h3>🧬 AI Diagnosis</h3>
            <p>{result}</p>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} FarmGuard. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f5fdf5',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#2d572c',
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '1rem',
    backgroundColor: '#fff',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  resultBox: {
    backgroundColor: '#ffffff',
    border: '1px solid #cce5cc',
    borderRadius: '8px',
    padding: '1.5rem',
    marginTop: '2rem',
    color: '#2f4f2f',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  },
  footer: {
    backgroundColor: '#2d572c',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
  },
};
