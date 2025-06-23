import { useCallback, useEffect, useState, useRef } from "react";
import {
  FileText,
  Save,
  Download,
  Moon,
  Sun,
} from "lucide-react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

import html2pdf from "html2pdf.js";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      const text = quillRef.current.getText().trim();
      const words = text ? text.split(/\s+/).length : 0;
      setWordCount(words);
    }
  }, [content]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    editor.style.minHeight = "600px";
    editor.style.fontSize = "16px";
    editor.style.lineHeight = "1.6";

    wrapper.append(editor);
    
    const quill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS
      }
    });

    quillRef.current = quill;

    quill.on('text-change', () => {
      setContent(quill.root.innerHTML);
    });

    setContent(quill.root.innerHTML);

    return () => {
      quillRef.current = null;
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSaveHTML = () => {
    if (quillRef.current) {
      const htmlContent = quillRef.current.root.innerHTML;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleDownloadPDF = () => {
    if (quillRef.current) {
      const element = quillRef.current.root;
      const opt = {
        margin: [10, 10, 10, 10], 
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(element).save();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
          isDarkMode
            ? "bg-slate-900/80 border-slate-700"
            : "bg-white/80 border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1
                className={`text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                TextCraft
              </h1>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveHTML}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? "hover:bg-slate-700 text-slate-300 hover:text-white"
                    : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
                title="Save as HTML"
              >
                <Save className="h-5 w-5" />
              </button>
              <button
                onClick={handleDownloadPDF}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? "hover:bg-slate-700 text-slate-300 hover:text-white"
                    : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
                title="Download as PDF"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  isDarkMode
                    ? "hover:bg-slate-700 text-slate-300 hover:text-white"
                    : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                }`}
                title="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Editor Container */}
        <div className="relative">
          {/* Paper-like editor */}
          <div
            className={`rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl ${
              isDarkMode
                ? "bg-slate-800 shadow-slate-900/50"
                : "bg-white shadow-slate-300/50"
            }`}
          >
            {/* Editor Header */}
            <div
              className={`px-8 py-4 border-b rounded-t-3xl ${
                isDarkMode
                  ? "border-slate-700 bg-slate-800/50"
                  : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    Untitled Document
                  </span>
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {wordCount} words
                </div>
              </div>
            </div>

            {/* Quill Editor */}
            <div className="p-8">
              <div
                ref={wrapperRef}
                className={`quill-container transition-all duration-300 ${
                  isDarkMode ? "quill-dark" : ""
                }`}
                style={{
                  width: "100%",
                  maxWidth: "8.5in",
                  margin: "0 auto",
                }}
              />
            </div>
          </div>

          {/* Floating Action Button */}
          <button
            onClick={handleDownloadPDF}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
            title="Download PDF"
          >
            <Download className="h-6 w-6" />
          </button>
        </div>
      </main>

      {/* Status Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
          isDarkMode
            ? "bg-slate-900/80 border-slate-700 text-slate-300"
            : "bg-white/80 border-slate-200 text-slate-600"
        } backdrop-blur-xl border-t`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span>Ready</span>
            <span>•</span>
            <span>Editing</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>{wordCount} words</span>
            <span>•</span>
            <span>Auto-saved</span>
          </div>
        </div>
      </div>

      {/* Custom Quill Styling */}
      <style jsx>{`
        .quill-container .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid ${isDarkMode ? '#475569' : '#e2e8f0'};
          background: ${isDarkMode ? '#1e293b' : '#f8fafc'};
          border-radius: 12px 12px 0 0;
          padding: 16px;
        }
        
        .quill-container .ql-container.ql-snow {
          border: none;
          font-size: 16px;
          line-height: 1.6;
        }
        
        .quill-container .ql-editor {
          min-height: 600px;
          color: ${isDarkMode ? '#f1f5f9' : '#1e293b'};
          background: transparent;
        }
        
        .quill-dark .ql-toolbar.ql-snow {
          color: #f1f5f9;
        }
        
        .quill-dark .ql-toolbar.ql-snow .ql-stroke {
          stroke: #94a3b8;
        }
        
        .quill-dark .ql-toolbar.ql-snow .ql-fill {
          fill: #94a3b8;
        }
        
        .quill-dark .ql-toolbar.ql-snow .ql-picker-label {
          color: #f1f5f9;
        }
        
        .quill-dark .ql-toolbar.ql-snow .ql-picker-options {
          background: #334155;
          color: #f1f5f9;
        }
        
        .quill-dark .ql-snow .ql-tooltip {
          background: #334155;
          color: #f1f5f9;
          border: 1px solid #475569;
        }
        
        .ql-editor.ql-blank::before {
          color: ${isDarkMode ? '#64748b' : '#94a3b8'};
          font-style: italic;
        }
      `}</style>
    </div>
  );
}