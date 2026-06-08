import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { api } from '../../../../common/api'
import { CompensationsStateContext } from '../compensations/state/CompensationsStateContext'
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
      <CreateCompensationsContent onSubmit={createCompensation} />
      <div className="create-compensations-container__error-message"
        data-cy="create-compensations-container-error-message">
        {createCompensationState.isFilled && createCompensationState.isTriedToSubmit && (`Please fill required field`)}
        {!createCompensationState.isFilled && createCompensationState.isNegative && createCompensationState.isTriedToSubmit && (`Amount can not be negative`)}
      </div>
    </div>
  )

  async function loadCompensationTypes() {
    try {
      const {
        data,
      } = await api.get(`/types`)

      createCompensationState.initializeTypes({
        loadedTypes: data,
      })
    }
    catch (e: any) {
      toast.error(e.message)
    }
  }

  async function createCompensation() {
    createCompensationState.setIsSaving()
    createCompensationState.setIsTriedToSubmit(true)

    try {
      await api.post(
        `/create`,
        {
          compensations: createCompensationState.allCompensations,
          compensationRequestedForYearAndMonth: createCompensationState.compensationRequestedForYearAndMonth,
        },
      )

      createCompensationState.removeCompensationsFromList()
      createCompensationState.setIsTriedToSubmit(false)

      const {
        data,
      } = await api.get(`/all`)

      compensationsState.initialize({
        loadedCompensations: data,
      })
    }
    catch {
      toast.error(createCompensationState.isFilled)
    }
    finally {
      createCompensationState.resetIsSaving()
    }
  }
})
