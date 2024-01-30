import { observer } from 'mobx-react-lite';
import { ChangeEvent, useContext } from 'react';
import { AllCompensationsStateContext } from '../../../../state/AllCompensationsStateContext';

export const SearchBarAll = observer(() => {
  const allCompensationsState = useContext(AllCompensationsStateContext);

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
    allCompensationsState.updateSearchTerm(event.target.value);
  }
});
