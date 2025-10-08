import { useEffect, useRef, useState } from "react"

export const useTooltipLogic = ({
  dependencies,
}: {
  dependencies: any[],
}) => {
  const [
    showTooltip,
    setShowTooltip,
  ] = useState(false)

  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([])
  const tooltipRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (showTooltip && rowRefs.current) {
      rowRefs.current.forEach((rowRef, index) => {
        if (rowRef) {
          const rowRect = rowRef.getBoundingClientRect()
          const scrollTop = window.scrollY

          if (tooltipRefs.current[index]) {
            tooltipRefs.current[index]!.style.position = `absolute`
            tooltipRefs.current[index]!.style.top = `${rowRect.top + scrollTop}px`
          }
        }
      })
    }
  }, [
    showTooltip,
    ...dependencies,
  ])

  const handleTooltipShow = (row: HTMLTableRowElement, index: number) => {
    setShowTooltip(true)
    rowRefs.current[index] = row
  }

  const handleTooltipHide = (index: number) => {
    setShowTooltip(false)
    rowRefs.current[index] = null
  }

  return {
    showTooltip,
    rowRefs,
    tooltipRefs,
    handleTooltipShow,
    handleTooltipHide,
  }
}
