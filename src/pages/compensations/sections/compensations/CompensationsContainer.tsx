import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { api } from '../../../../common/api'
import { CompensationsContent } from './CompensationsContent'
import { CompensationsStateContext } from './state/CompensationsStateContext'

export const CompensationsContainer = observer(() => {
  const compensationsState = useContext(CompensationsStateContext)

  useEffect(() => {
    loadCompensations()
  }, [])

  return (
    <CompensationsContent />
  )

  async function loadCompensations() {
    const {
      data,
    } = await api.get(`/all`)

    compensationsState.initialize({
      loadedCompensations: data,
    })
  }
})
