import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import clsx from 'clsx';
import { formatMoney } from '../../../../../../common/utils/formatMoney';
import { CreateCompensationsStateContext } from '../../state/CreateCompensationsStateContext';

export const TableCreateCompensations = observer(() => {
  const createCompensationState = useContext(CreateCompensationsStateContext);

  return (
    <table className="table-create-compensations" data-cy="table-create-compensations">
      <thead>
        <tr className="table-create-compensations__head" data-cy="table-create-compensations-head">
          <th className="table-create-compensations__column-type">Type *</th>
          <th className="table-create-compensations__column-comment">Comment</th>
          <th className="table-create-compensations__column-amount">Amount *</th>
          <th className="table-create-compensations__column-remove" />
        </tr>
      </thead>
      <tbody>
        {createCompensationState.allCompensations.map(({
          id, typeId, comment, amount,
        }) => (
          <tr key={id} className="table-create-compensations__item" data-cy="table-create-compensations-item">
            <td
              data-cy="table-create-compensations-column-select"
              className={clsx('table-create-compensations__column-type', {
                'table-create-compensations__column-type--invalid': typeId === 0 && createCompensationState.isTriedToSubmit,
              })}
            >
              <select
                data-cy="table-create-compensations-select"
                className={clsx('table-create-compensations__column-type__select', {
                  'table-create-compensations__column-type__select--default': typeId === 0,
                })}
                value={typeId}
                onChange={(event) => createCompensationState.updateCompensation({
                  id,
                  typeId: Number(event.target.value),
                  comment,
                  amount,
                })}
              >
                {createCompensationState.allTypes.map(({ label, typeId: type }) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {label}
                  </option>
                ))}
                <option value={0} disabled selected hidden>type</option>
              </select>
            </td>
            <td className="table-create-compensations__column-comment">
              <textarea
                placeholder="comment"
                value={comment}
                className="table-create-compensations__column-comment__comment"
                data-cy="table-create-compensations-comment"
                onChange={(event) => createCompensationState.updateCompensation({
                  id,
                  typeId,
                  comment: event.target.value,
                  amount,
                })}
              />
            </td>
            <td
              data-cy="table-create-compensations-column-amount"
              className={clsx('table-create-compensations__column-amount', {
                'table-create-compensations__column-amount--invalid': amount <= 0 && createCompensationState.isTriedToSubmit,
              })}
            >

              <input
                data-cy="table-create-compensations-amount"
                type="number"
                min={0}
                placeholder="0 ₽"
                className={clsx('table-create-compensations__column-amount__input', {
                  'table-create-compensations__column-amount__input--default': amount === 0,
                })}
                value={amount === 0 ? '' : amount}
                onChange={(event) => createCompensationState.updateCompensation({
                  id,
                  typeId,
                  comment,
                  amount: Number(event.target.value),
                })}
              />
              <span className={clsx('table-create-compensations__column-amount__input-rub', {
                'table-create-compensations__column-amount__input-rub--filled': amount !== 0,
              })}
              >
                ₽
              </span>
            </td>

            <td className="table-create-compensations__column-remove">
              <button
                className="table-create-compensations__column-remove__button"
                type="button"
                data-cy="table-create-compensations-remove-button"
                onClick={() => createCompensationState.removeCompensation(id)}
              >
                x
              </button>
            </td>
          </tr>
        ))}
        <tr className="table-create-compensations__item">
          <td className="table-create-compensations__column-type">
            <button
              className="table-create-compensations__column-type__add-button"
              type="button"
              data-cy="table-create-compensations-add-button"
              onClick={() => createCompensationState.addCompensation()}
            >
              <span className="table-create-compensations__column-type__add-button__icon">+</span>
              Add position
            </button>
          </td>
          <td colSpan={3} />
        </tr>
      </tbody>
      <tfoot>
        <tr className="table-create-compensations__total" data-cy="table-create-compensations-total">
          <td className="table-create-compensations__column-type">Total</td>
          <td className="table-create-compensations__column-comment" />
          <td className="table-create-compensations__column-amount__sum" data-cy="table-create-compensations-sum">{formatMoney(createCompensationState.totalCount)}</td>
          <td className="table-create-compensations__column-remove" />
        </tr>
      </tfoot>
    </table>
  );
});
