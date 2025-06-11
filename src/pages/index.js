import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });

      const data = await response.json();
      setResult(data.result || 'No diagnosis available.');
    } catch (error) {
      setResult('Error: Unable to get diagnosis. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌾 FarmGuard</h1>
        <p>AI-Powered Crop Disease Detection & Advisory System</p>
      </header>

      <main style={styles.main}>
        <h2>🩺 Enter Crop Symptoms</h2>
        <textarea
          placeholder="e.g., yellow spots on leaves, white mold on stem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          style={styles.textarea}
        />
        <button onClick={handleSubmit} disabled={loading} style={styles.button}>
          {loading ? 'Analyzing...' : 'Diagnose'}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h3>🧾 Diagnosis Result:</h3>
            <p>{result}</p>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>© 2025 FarmGuard. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f9f4',
    color: '#222'
  },
  header: {
    backgroundColor: '#2d572c',
    color: '#fff',
    padding: '2rem',
    textAlign: 'center'
  },
  main: {
    flex: 1,
    maxWidth: 800,
    margin: '0 auto',
    padding: '2rem'
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '1rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#3a973c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginTop: '2rem'
  },
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#2d572c',
    color: '#fff'
  }
};
