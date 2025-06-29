# 📝 TextCraft – Real-Time Collaborative Rich Text Editor

TextCraft is a full-stack, real-time collaborative rich text editor built with **React**, **Quill.js**, **Node.js**, **MongoDB**, and **Socket.IO**. It features live document editing, dark/light theme support, word count, auto-saving, PDF/HTML export, and seamless collaboration with multiple users.

## 🚀 Features

- ⚡ **Real-Time Collaboration** – Multiple users can edit the same document simultaneously.
- 📄 **Rich Text Editing** – Integrated Quill.js with full formatting options.
- 💾 **Auto-Save** – Changes are saved to MongoDB every 2 seconds.
- 🧠 **Word Count** – Dynamic word counter updates as you type.
- 🌓 **Dark/Light Mode** – Smooth theme toggle with UI consistency.
- 🖨️ **Export Options** – Save your work as PDF or HTML with one click.
- 🔗 **Sharable Links** – Copy document links to share and collaborate instantly.
- 💡 **Modern UI** – Clean design with TailwindCSS, glassmorphism, and responsive layout.

## 📂 Project Structure

```
project-root/
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
├── README.md
```

## 🛠️ Tech Stack

### Frontend
- React
- Quill.js
- Tailwind CSS
- Socket.IO Client
- html2pdf.js

### Backend
- Node.js
- Express (if used)
- MongoDB
- Mongoose
- Socket.IO

## 📦 Installation

### Prerequisites
- Node.js and npm
- MongoDB (local or cloud)
- Vite (or any React build tool)

### Clone the Repository
```bash
git clone https://github.com/MohamedAmineNasri/realtime-docs-editor.git
cd textcraft
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
MONGO_URI=your_mongodb_connection_string
```

Start the backend:
```bash
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Usage

- Open the app at [http://localhost:5173](http://localhost:5173)
- A document is loaded based on the unique URL ID
- Start typing and see your changes saved in real time
- Share the document link to collaborate with others
- Use the buttons to toggle theme, download as PDF/HTML, or copy the shareable link

## 🔒 Security Notes

- Ensure production deployment uses secure WebSocket (`wss`) and HTTPS.
- Implement authentication/authorization for private document access (future enhancement).

## 🧩 Future Improvements

- ✅ Authentication system (Clerk/Auth0)
- 🗃️ Document history/version control
- 💬 Real-time chat/comments
- 📂 User dashboard for managing documents
- 📱 Mobile-friendly editor interface

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

Feel free to fork the project and submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🙌 Acknowledgments

- Quill.js for the rich text capabilities
- html2pdf.js for export functionality
- Socket.IO for real-time communication
- Tailwind CSS for modern UI styling