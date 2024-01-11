import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CompensationsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/compensations/personal');
  }, []);

  return (
    <div>CompensationsPage</div>
  );
}

export default CompensationsPage;
