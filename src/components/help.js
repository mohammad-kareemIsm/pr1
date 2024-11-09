// Import the react JS packages
import React from "react";

// Define the Help function.
export const Help = () => {
  return (
    <div className="Auth-form-container d-flex align-items-center justify-content-center  vh-100">
      <div className="Auth-form" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="Auth-form-content text-center">
          <h3 className="Auth-form-title">Help Page</h3>
          <p>If you need assistance, please contact support at:</p>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> support@example.com</li>
            <li><strong>Phone:</strong> +1 234 567 890</li>
          </ul>
          {/* <p>For more information, visit our FAQ page.</p> */}
        </div>
      </div>
    </div>
  );
}

export default Help;