import Compensations from './components/Compensations/Compensations';
import CompensationsCeo from './components/CompensationsCeo/CompensationsCeo';
import CreateCompensations from './components/CreateCompensations/CreateCompensations';

function CompensationsPage() {
  return (
    <div className="compensations-page">
      <div className="compensations-page__employee">
        <Compensations />
        <CreateCompensations />
      </div>
      <CompensationsCeo />
    </div>

  );
}

export default CompensationsPage;
