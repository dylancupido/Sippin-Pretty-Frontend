import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Import other components
import ManageHomePage from "./Components/navbarAdmin/ManageHomePage";
import DeliveryManagement from "./Components/navbarAdmin/DeliveryManagement";

function App() {
  // Your existing state and functions
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Existing routes */}
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={/* Your admin dashboard component */} />
          <Route path="/admin/home" element={<ManageHomePage />} />
          <Route path="/admin/delivery" element={<DeliveryManagement />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;