import { observer } from "mobx-react-lite"
import { CompensationsTypesTips } from "./components/CompensationsTypesTips/CompensationsTypesTips"
import { DatePickerCompensations } from "./components/DateCompensations/DatePickerCompensations"
import { TableCreateCompensations } from "./components/TableCreateCompensations/TableCreateCompensations"
import { useContext } from "react"
import { CreateCompensationsStateContext } from "./state/CreateCompensationsStateContext"

export const CreateCompensationsContent = observer(({
  onSubmit,
}: {
  onSubmit: () => unknown,
}) => {
  const createCompensationState = useContext(CreateCompensationsStateContext)
  const {
    isSaving,
  } = createCompensationState
  return (
    <>
      <div className="create-compensations-content">
        <CompensationsTypesTips />
        <DatePickerCompensations />
        <TableCreateCompensations />
      </div>
      <button
        className="create-compensations-content__button"
        data-cy="create-compensations-content-submit"
        type="button"
        disabled={isSaving}
        onClick={onSubmit}
      >
        {
          <>
            {
              isSaving && (
                <span
                  className="create-compensations-content__button-loader"
                  data-cy="button-loader"
                />
              )
            }
            {isSaving ? `Sending` : `Send`}
          </>
        }
      </button>
    </>
  )
})
