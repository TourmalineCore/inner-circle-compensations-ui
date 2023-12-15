import { observer } from 'mobx-react-lite';
import { ChangeEvent, useContext } from 'react';
import CompensationsAllStateContext from '../../../../state/CompensationsAllStateContext';

function SearchBarAll() {
  const compensationsAllState = useContext(CompensationsAllStateContext);

  return (
    <input
      type="text"
      placeholder="Search for employee.."
      className="search-bar"
      data-cy="search-bar"
      onChange={searchHandler}
    />
  );

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    compensationsAllState.updateSearchTerm(event.target.value);
  }
}

export default observer(SearchBarAll);
