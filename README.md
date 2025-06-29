<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TextCraft README</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3, h4 {
            color: #2c3e50;
        }
        h1 {
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        h2 {
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            margin-top: 30px;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 4px;
            border-radius: 4px;
            font-family: monospace;
        }
        pre {
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            position: relative;
        }
        pre code {
            display: block;
            padding: 0;
            background-color: transparent;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        ul li {
            margin-bottom: 10px;
        }
        ul li::before {
            content: "• ";
            color: #3498db;
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }
        .emoji {
            font-size: 1.2em;
            vertical-align: middle;
            margin-right: 5px;
        }
    </style>
</head>
<body>

    <h1><span class="emoji">📝</span> TextCraft – Real-Time Collaborative Rich Text Editor</h1>
    <p>TextCraft is a full-stack, real-time collaborative rich text editor built with <strong>React</strong>, <strong>Quill.js</strong>, <strong>Node.js</strong>, <strong>MongoDB</strong>, and <strong>Socket.IO</strong>. It features live document editing, dark/light theme support, word count, auto-saving, PDF/HTML export, and seamless collaboration with multiple users.</p>

    <h2><span class="emoji">🚀</span> Features</h2>
    <ul>
        <li><span class="emoji">⚡</span> <strong>Real-Time Collaboration</strong> – Multiple users can edit the same document simultaneously.</li>
        <li><span class="emoji">📄</span> <strong>Rich Text Editing</strong> – Integrated Quill.js with full formatting options.</li>
        <li><span class="emoji">💾</span> <strong>Auto-Save</strong> – Changes are saved to MongoDB every 2 seconds.</li>
        <li><span class="emoji">🧠</span> <strong>Word Count</strong> – Dynamic word counter updates as you type.</li>
        <li><span class="emoji">🌓</span> <strong>Dark/Light Mode</strong> – Smooth theme toggle with UI consistency.</li>
        <li><span class="emoji">🖨️</span> <strong>Export Options</strong> – Save your work as PDF or HTML with one click.</li>
        <li><span class="emoji">🔗</span> <strong>Sharable Links</strong> – Copy document links to share and collaborate instantly.</li>
        <li><span class="emoji">💡</span> <strong>Modern UI</strong> – Clean design with TailwindCSS, glassmorphism, and responsive layout.</li>
    </ul>

    <h2><span class="emoji">📂</span> Project Structure</h2>
    <pre><code>project-root/
├── backend/
│   ├── models/
│   │   └── document.model.js       # Mongoose schema for documents
│   ├── utils/
│   │   └── db.js                   # MongoDB connection handler
│   ├── server.js                   # Socket.IO + MongoDB backend
│   └── .env                        # MongoDB URI and environment config
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── TextEditor.jsx      # Main Quill editor with all features
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
├── .gitignore
├── README.md</code></pre>

    <h2><span class="emoji">🛠️</span> Tech Stack</h2>
    <h3>Frontend</h3>
    <ul>
        <li>React</li>
        <li>Quill.js</li>
        <li>Tailwind CSS</li>
        <li>Socket.IO Client</li>
        <li>html2pdf.js</li>
    </ul>
    <h3>Backend</h3>
    <ul>
        <li>Node.js</li>
        <li>Express (if used)</li>
        <li>MongoDB</li>
        <li>Mongoose</li>
        <li>Socket.IO</li>
    </ul>

    <h2><span class="emoji">📦</span> Installation</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js and npm</li>
        <li>MongoDB (local or cloud)</li>
        <li>Vite (or any React build tool)</li>
    </ul>

    <h3>Clone the Repository</h3>
    <pre><code>git clone https://github.com/MohamedAmineNasri/realtime-docs-editor.git
cd textcraft</code></pre>

    <h3>Backend Setup</h3>
    <pre><code>cd backend
npm install</code></pre>
    <p>Create a <code>.env</code> file in <code>backend/</code>:</p>
    <pre><code>MONGO_URI=your_mongodb_connection_string</code></pre>
    <p>Start the backend:</p>
    <pre><code>node server.js</code></pre>

    <h3>Frontend Setup</h3>
    <pre><code>cd frontend
npm install
npm run dev</code></pre>

    <h2><span class="emoji">🌐</span> Usage</h2>
    <ul>
        <li>Open the app at <a href="http://localhost:5173" target="_blank">http://localhost:5173</a></li>
        <li>A document is loaded based on the unique URL ID</li>
        <li>Start typing and see your changes saved in real time</li>
        <li>Share the document link to collaborate with others</li>
        <li>Use the buttons to toggle theme, download as PDF/HTML, or copy the shareable link</li>
    </ul>

    <h2><span class="emoji">🔒</span> Security Notes</h2>
    <ul>
        <li>Ensure production deployment uses secure WebSocket (<code>wss</code>) and HTTPS.</li>
        <li>Implement authentication/authorization for private document access (future enhancement).</li>
    </ul>

    <h2><span class="emoji">🧩</span> Future Improvements</h2>
    <ul>
        <li><span class="emoji">✅</span> Authentication system (Clerk/Auth0)</li>
        <li><span class="emoji">🗃️</span> Document history/version control</li>
        <li><span class="emoji">💬</span> Real-time chat/comments</li>
        <li><span class="emoji">📂</span> User dashboard for managing documents</li>
        <li><span class="emoji">📱</span> Mobile-friendly editor interface</li>
    </ul>

    <h2><span class="emoji">🤝</span> Contributing</h2>
    <p>Contributions, bug reports, and feature requests are welcome!</p>
    <p>Feel free to fork the project and submit a pull request.</p>

    <h2><span class="emoji">📄</span> License</h2>
    <p>This project is open-source and available under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a>.</p>

    <h2><span class="emoji">🙌</span> Acknowledgments</h2>
    <ul>
        <li>Quill.js for the rich text capabilities</li>
        <li>html2pdf.js for export functionality</li>
        <li>Socket.IO for real-time communication</li>
        <li>Tailwind CSS for modern UI styling</li>
    </ul>

</body>
</html>