import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import CreateCompensationsStateContext from '../../state/CreateCompensationsStateContext';

function TableCreateCompensations() {
  const createCompensationState = useContext(CreateCompensationsStateContext);

  return (
    <table data-cy="table-create-compensations">
      <thead>
        <tr data-cy="table-create-compensations-head">
          <th>Type</th>
          <th>Comment</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {createCompensationState.allCompensations.map(({
          id, type, comment, amount,
        }) => (
          <tr key={id} data-cy="table-create-compensations-item">
            <td>
              <select
                data-cy="table-create-compensations-select"
                value={type}
                onChange={(event) => createCompensationState.updateCompensation({
                  id,
                  type: event.target.value,
                  comment,
                  amount,
                })}
              >
                {createCompensationState.allTypes.map(({ value, label }) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ))}
                <option value="" disabled selected hidden>type*</option>
              </select>
            </td>
            <td>
              <textarea
                value={comment}
                data-cy="table-create-compensations-comment"
                onChange={(event) => createCompensationState.updateCompensation({
                  id,
                  type,
                  comment: event.target.value,
                  amount,
                })}
              />
            </td>
            <td>
              <input
                data-cy="table-create-compensations-amount"
                type="text"
                value={amount}
                onChange={(event) => createCompensationState.updateCompensation({
                  id,
                  type,
                  comment,
                  amount: Number(event.target.value),
                })}
              />
            </td>
            <td>
              <button
                type="button"
                data-cy="table-create-compensations-remove-button"
              >
                x
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={4}>
            <button
              type="button"
              data-cy="table-create-compensations-add-button"
              onClick={() => createCompensationState.addCompensation()}
            >
              Add position
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr data-cy="table-create-compensations-total">
          <td colSpan={2}>Total:</td>
          <td colSpan={2}>{createCompensationState.totalCount}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export default observer(TableCreateCompensations);
