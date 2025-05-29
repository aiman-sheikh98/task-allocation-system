
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BackButtonProps {
  fallbackPath?: string;
  className?: string;
  children?: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  fallbackPath = '/', 
  className = '',
  children = 'Back'
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Check if there's browser history to go back to
    if (window.history.length > 1 && window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      // Fallback to specified path or home
      navigate(fallbackPath);
    }
  };

  // Don't show back button on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleBack}
      className={`bg-white/10 border-white/20 text-white hover:bg-white/20 ${className}`}
    >
      <ArrowLeft size={16} className="mr-2" />
      {children}
    </Button>
  );
};

export default BackButton;
