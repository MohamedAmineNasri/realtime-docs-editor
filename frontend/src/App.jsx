import {
  BrowserRouter as Router, // Still often used for simple setups
  Routes,
  Route,
  Navigate, // Import Navigate component
} from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import TextEditor from "./TextEditor";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root ("/") to a new document with a unique ID */}
        <Route
          path="/"
          element={<Navigate to={`/documents/${uuidV4()}`} replace />}
        />

        {/* Route for the TextEditor, accepting a dynamic ID */}
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
