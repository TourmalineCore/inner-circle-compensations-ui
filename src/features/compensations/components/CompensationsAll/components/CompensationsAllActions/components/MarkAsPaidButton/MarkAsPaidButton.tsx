import { observer } from 'mobx-react-lite';

function MarkAsPaidButton() {
  return (
    <button
      className="mark-as-paid-button"
      data-cy="mark-as-paid-button-submit"
      type="button"
      onClick={() => console.log('hello')}
    >
      Mark as paid
    </button>
  );
}

export default observer(MarkAsPaidButton);
