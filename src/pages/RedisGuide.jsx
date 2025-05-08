import React from 'react';
import './RedisGuide.css';


export default function RedisGuide() {
  return (
    <div className="redis-guide-container">
    <div className="redis-guide">
      <h1>Redis Guide</h1>
      <p>Redis (REmote DIctionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker.</p>

      <h2>🔹 What is Redis?</h2>
      <p>Redis is fast, supports various data structures like strings, hashes, lists, sets, and sorted sets. It's often used for caching and real-time analytics.</p>

      <h2>🔸 Installation (Linux / Mac)</h2>
      <pre><code>
sudo apt update<br></br>
sudo apt install redis-server<br></br>
redis-cli
      </code></pre>

      <h2>🔹 Basic Commands</h2>
      <ul>
        <li><code>SET key value</code> – Stores a value.</li>
        <li><code>GET key</code> – Retrieves a value.</li>
        <li><code>DEL key</code> – Deletes a key.</li>
        <li><code>INCR key</code> – Increments a number.</li>
      </ul>

      <h2>🔸 Example</h2>
      <pre><code>
SET user:1000 "Alice"<br></br>
GET user:1000<br></br>
INCR visits
      </code></pre>

      <h2>🔹 Common Use Cases</h2>
      <ul>
        <li>Session storage</li>
        <li>Rate limiting</li>
        <li>Leaderboards</li>
        <li>Pub/Sub messaging</li>
      </ul>

      <h2>📚 Learn More</h2>
      <a href="https://redis.io/docs" target="_blank" rel="noreferrer">Redis Official Docs</a>
    

        <h2>🔹 Live Example: Python Redis Client</h2>
        <p>Install Redis client for Python:</p>
        <pre><code>
        pip install redis
        </code></pre>

        <p>Basic usage:</p>
        <pre><code>{`import redis

        r = redis.Redis(host='localhost', port=6379, db=0)

        # Set a key
        r.set('framework', 'Django')

        # Get a key
        value = r.get('framework')
        print(value.decode())  # Output: Django
        `}</code></pre>

    </div>
    </div>

  );
}
