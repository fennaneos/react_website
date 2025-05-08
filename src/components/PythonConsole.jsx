// This component will provide a user interface for writing and executing Python code.
import React, { useEffect, useState, useRef } from 'react';

export default function PythonConsole() {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState('print("Hello from Python!")');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(true);
  const outputRef = useRef(null);

  // Pyodide Loading: The useEffect hook loads Pyodide asynchronously when the component mounts.
  useEffect(() => {
    const loadPyodideAndPackages = async () => {
      try {
        const pyodideInstance = await window.loadPyodide();
        setPyodide(pyodideInstance);
        setLoading(false);
      } catch (error) {
        setOutput(`Error loading Pyodide: ${error}`);
        setLoading(false);
      }
    };
    loadPyodideAndPackages();
  }, []);

  // The runCode function sets up sys.stdout and sys.stderr to capture the output, 
  // executes the user's Python code, and then retrieves the output
  const runCode = async () => {
    if (!pyodide) return;
    try {
      // Redirect stdout and stderr
      await pyodide.runPythonAsync(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
        sys.stderr = sys.stdout
      `);

      // Run the user's code
      await pyodide.runPythonAsync(code);

      // Get the output
      const result = pyodide.runPython('sys.stdout.getvalue()');
      setOutput(result);
    } catch (err) {
      setOutput(err.toString());
    }
  };
  
  // Styling: The component is styled with a dark theme to match your application's aesthetic.
  return (
    <div style={{ padding: 20, fontFamily: 'monospace', background: '#111', color: '#0ff', height: '100%' }}>
      {loading ? (
        <div>Loading Python environment...</div>
      ) : (
        <>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={6}
            style={{
              width: '100%',
              background: '#222',
              color: '#0ff',
              border: '1px solid #0ff',
              borderRadius: 4,
              padding: '10px',
              fontSize: '14px',
            }}
          />
          <br />
          <button
            onClick={runCode}
            style={{
              marginTop: 10,
              padding: '10px 20px',
              background: '#0ff',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Run Python
          </button>
          <pre
            ref={outputRef}
            style={{
              marginTop: 10,
              background: '#000',
              padding: '10px',
              borderRadius: '4px',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
          >
            {output}
          </pre>
        </>
      )}
    </div>
  );
}
