// Import the react JS packages
import { useEffect,useContext } from "react";
import axios from "axios";
import { AuthContext } from '../AuthContext';

// Define the Logout function.
export const Logout = () => {
  const { logout } = useContext(AuthContext);
  // Effect to handle logout logic.
  useEffect(() => {
    // Clear tokens from localStorage.
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];

    // Redirect to login page.
    window.location.href = '/login';
  }, []);

  return (
    <div className="Auth-form-container d-flex justify-content-center align-items-center vh-100">
      <form className="Auth-form" style={{ maxWidth: '400px', width: '100%'}}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Confirm logout</h3>
          <div className="d-grid gap-3 mt-4">
            <button className="btn btn-primary" style={{maxWidth: '350px', width: '100%'}} onClick={logout}>Logout</button>
            <button className="btn btn-secondary" style={{maxWidth: '350px', width: '100%'}}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Logout;