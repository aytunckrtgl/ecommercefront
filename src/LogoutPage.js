import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
  }, [navigate]);

  return null;
}

export default LogoutPage;