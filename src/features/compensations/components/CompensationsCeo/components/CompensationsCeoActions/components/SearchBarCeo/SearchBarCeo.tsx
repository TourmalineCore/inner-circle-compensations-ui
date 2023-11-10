import { Input } from '@tourmalinecore/react-tc-ui-kit';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useContext } from 'react';
import CompensationsCeoStateContext from '../../../../state/CompensationsCeoStateContext';

function SearchBarCeo() {
  const compensationsCeoState = useContext(CompensationsCeoStateContext);

  return (
    <Input
      type="text"
      placeholder="Search for employee.."
      className="search-bar"
      onChange={searchHandler}
    />
  );

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    compensationsCeoState.updateSearchTerm(event.target.value);
  }
}

export default observer(SearchBarCeo);
