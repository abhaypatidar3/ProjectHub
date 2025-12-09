import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { register as registerAPI } from '../../api/api';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Full name is required';
    if (name.length < 2 || name.length > 50) return 'Name must be between 2 and 50 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name should only contain letters and spaces';
    if (/\d/.test(name)) return 'Name should not contain numbers';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please provide a valid email';
    if (/^\d/. test(email)) return 'Email should not start with a number';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[@$!%*?&#]/. test(password)) return 'Password must contain at least one special character (@$!%*?&#)';
    return '';
  };

  // Password strength indicators
  const passwordChecks = {
    length: formData.password.length >= 8,
    lowercase: /[a-z]/.test(formData.password),
    uppercase: /[A-Z]/.test(formData. password),
    number: /\d/.test(formData.password),
    special: /[@$!%*?&#]/.test(formData.password)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change if field was touched
    if (touched[name]) {
      let error = '';
      switch (name) {
        case 'name':
          error = validateName(value);
          break;
        case 'email':
          error = validateEmail(value);
          break;
        case 'password':
          error = validatePassword(value);
          break;
        case 'confirmPassword':
          error = value !== formData.password ? 'Passwords do not match' : '';
          break;
        default: 
          break;
      }
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    let error = '';
    switch (name) {
      case 'name': 
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password': 
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = value !== formData.password ?  'Passwords do not match' : '';
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    // Validate all fields
    const nameError = validateName(formData. name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = formData. password !== formData.confirmPassword ? 'Passwords do not match' :  '';

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError
      });
      toast.error('Please fix all validation errors');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await registerAPI(registerData);
      login(response.data.token, response.data.user);
      toast.success('Registration successful! ');
      navigate('/');
    } catch (error) {
      toast.error(error.response?. data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 border ${
                touched.name && errors.name ?  'border-red-500' : touched.name && !errors.name && formData.name ? 'border-green-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition`}
              placeholder="Enter your full name"
            />
            {touched. name && errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaTimesCircle className="mr-1" /> {errors.name}
              </p>
            )}
            {touched.name && !errors.name && formData.name && (
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <FaCheckCircle className="mr-1" /> Valid name
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`w-full px-4 py-3 border ${
                touched.email && errors.email ? 'border-red-500' :  touched.email && !errors.email && formData.email ? 'border-green-500' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition`}
              placeholder="Enter your email"
            />
            {touched. email && errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaTimesCircle className="mr-1" /> {errors.email}
              </p>
            )}
            {touched.email && !errors.email && formData.email && (
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <FaCheckCircle className="mr-1" /> Valid email
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ?  'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border ${
                  touched.password && errors.password ? 'border-red-500' : touched.password && !errors.password && formData.password ?  'border-green-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-10 transition`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched.password && errors. password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaTimesCircle className="mr-1" /> {errors.password}
              </p>
            )}
            {formData.password && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold text-gray-700">Password must contain:</p>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <div className={`flex items-center ${passwordChecks. length ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordChecks.length ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                    At least 8 characters
                  </div>
                  <div className={`flex items-center ${passwordChecks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordChecks.lowercase ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                    One lowercase letter (a-z)
                  </div>
                  <div className={`flex items-center ${passwordChecks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordChecks. uppercase ? <FaCheckCircle className="mr-1" /> :  <FaTimesCircle className="mr-1" />}
                    One uppercase letter (A-Z)
                  </div>
                  <div className={`flex items-center ${passwordChecks.number ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordChecks.number ?  <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                    One number (0-9)
                  </div>
                  <div className={`flex items-center ${passwordChecks.special ?  'text-green-600' : 'text-gray-500'}`}>
                    {passwordChecks.special ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                    One special character (@$!%*?&#)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' :  'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border ${
                  touched. confirmPassword && errors.confirmPassword ?  'border-red-500' : touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword ? 'border-green-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pr-10 transition`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ?  <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {touched. confirmPassword && errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FaTimesCircle className="mr-1" /> {errors.confirmPassword}
              </p>
            )}
            {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <FaCheckCircle className="mr-1" /> Passwords match
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;