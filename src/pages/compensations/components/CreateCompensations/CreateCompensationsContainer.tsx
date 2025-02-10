import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { api } from '../../../../common/api'
import { LINK_TO_COMPENSATIONS_SERVICE } from '../../../../common/config/config'
import { CompensationsStateContext } from '../Compensations/state/CompensationsStateContext'
import { CreateCompensationsStateContext } from './state/CreateCompensationsStateContext'
import { CreateCompensationsContent } from './CreateCompensationsContent'

export const CreateCompensationsContainer = observer(() => {
  const createCompensationState = useContext(CreateCompensationsStateContext)
  const compensationsState = useContext(CompensationsStateContext)

  useEffect(() => {
    loadCompensationTypes()
  }, [])

  return (
    <div className="create-compensations-container">
      <h2 className="create-compensations-container__header">New compensation</h2>
      <CreateCompensationsContent />
      <div className="create-compensations-container__error-message"
        data-cy="create-compensations-container-error-message">
        {createCompensationState.isFilled && createCompensationState.isTriedToSubmit && (`Please fill required field`)}
        {!createCompensationState.isFilled && createCompensationState.isNegative && createCompensationState.isTriedToSubmit && (`Amount can not be negative`)}
      </div>
      <button
        className="create-compensations-container__button"
        data-cy="create-compensations-container-submit"
        type="button"
        onClick={() => createCompensation()}
      >
        Send
      </button>
    </div>
  )

  async function loadCompensationTypes() {
    // eslint-disable-next-line no-console
    console.log(`LINK_TO_COMPENSATIONS_SERVICE:`, LINK_TO_COMPENSATIONS_SERVICE)

    try {
      const {
        data,
      } = await api.get(`${LINK_TO_COMPENSATIONS_SERVICE}types`)

      createCompensationState.initializeTypes({
        loadedTypes: data,
      })
    }
    catch (e: any) {
      toast.error(e.message)
    }
  }

  async function createCompensation() {
    createCompensationState.setIsTriedToSubmit(true)

    try {
      await api.post(
        `${LINK_TO_COMPENSATIONS_SERVICE}create`,
        {
          compensations: createCompensationState.allCompensations,
          compensationRequestedForYearAndMonth: createCompensationState.compensationRequestedForYearAndMonth,
        },
      )

      createCompensationState.removeCompensationsFromList()
      createCompensationState.setIsTriedToSubmit(false)

      const {
        data,
      } = await api.get(`${LINK_TO_COMPENSATIONS_SERVICE}all`)

      compensationsState.initialize({
        loadedCompensations: data,
      })
    }
    catch {
      toast.error(createCompensationState.isFilled)
    }
  }
})
