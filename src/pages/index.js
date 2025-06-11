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
      setResult(data.result || 'No diagnosis found.');
    } catch (error) {
      setResult('Error fetching diagnosis.');
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>🌿 FarmGuard</h1>
        <p>AI-Powered Crop Disease Detection and Advisory</p>
      </header>

      <main style={styles.main}>
        <h2>🩺 Enter Symptoms or Issue</h2>
        <textarea
          placeholder="e.g., yellowing leaves, white powder on stem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          style={styles.textarea}
        />
        <button onClick={handleSubmit} style={styles.button} disabled={loading}>
          {loading ? 'Analyzing...' : 'Diagnose'}
        </button>

        {result && (
          <div style={styles.resultBox}>
            <h3>🧾 Diagnosis Result</h3>
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
    color: '#222',
    backgroundColor: '#f0f5f0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    backgroundColor: '#2d572c',
    color: 'white',
    padding: '2rem',
    textAlign: 'center'
  },
  main: {
    flex: 1,
    padding: '2rem',
    maxWidth: 700,
    margin: '0 auto'
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '1rem'
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: '1rem',
    marginTop: '2rem',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#2d572c',
    color: 'white'
  }
};
