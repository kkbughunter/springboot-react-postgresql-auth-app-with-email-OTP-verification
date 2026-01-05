import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const { verifyOtp, sendOtp, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Email not found. Please go back to login/register.');
      return;
    }
    
    const result = await verifyOtp({ email, otp });
    if (result.success) {
      navigate('/login');
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      alert('Email not found. Please go back to login/register.');
      return;
    }
    
    const result = await sendOtp(email);
    if (result.success) {
      setCountdown(60);
      setOtp('');
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900">Invalid Access</h2>
          <p className="text-gray-600">Please start from login or register page.</p>
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
          <p className="mt-2 text-gray-600">
            We've sent a verification code to
          </p>
          <p className="font-medium text-gray-900">{email}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <Input
            label="Enter OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            required
            maxLength={6}
          />
          
          <Button
            type="submit"
            loading={loading}
            className="w-full"
            disabled={otp.length !== 6}
          >
            Verify OTP
          </Button>
        </form>
        
        <div className="text-center space-y-2">
          <p className="text-gray-600">Didn't receive the code?</p>
          {countdown > 0 ? (
            <p className="text-gray-500">
              Resend OTP in {countdown} seconds
            </p>
          ) : (
            <Button
              variant="outline"
              onClick={handleResendOtp}
              loading={loading}
            >
              Resend OTP
            </Button>
          )}
        </div>
        
        <div className="text-center">
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;