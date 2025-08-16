"use client"

import { useState } from "react"

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    department: "",
    username: "",
    password: "",
  })

  const departments = [
    "Department of Health",
    "Department of Education",
    "Department of Transportation",
    "Department of Finance",
    "Department of Public Safety",
    "Department of Social Services",
    "Department of Environmental Protection",
    "Department of Labor",
    "Department of Housing",
    "Department of Veterans Affairs",
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.department && formData.username && formData.password) {
      onLogin(formData)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">Secure Access to Analytics Dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="department">
              Department
            </label>
            <select
              id="department"
              name="department"
              className="form-select"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
