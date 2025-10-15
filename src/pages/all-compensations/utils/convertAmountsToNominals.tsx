const FIVE_THOUSAND_NOMINAL = 5000
const ONE_THOUSAND_NOMINAL = 1000
const FIVE_HUNDRED_NOMINAL = 500
const ONE_HUNDRED_NOMINAL = 100

const ALL_NOMINALS = [
  FIVE_THOUSAND_NOMINAL,
  ONE_THOUSAND_NOMINAL,
  FIVE_HUNDRED_NOMINAL,
  ONE_HUNDRED_NOMINAL,
]

export const convertAmountsToNominals = (({
  amounts,
}: {
  amounts: number[],
}) => {
  const resultNominals = [] as {
    nominal: number,
    count: number,
  }[]

  amounts.forEach(amount => {
    const amountRoundedUpToHundred = Math.ceil(amount / 100) * 100

    let reminderOfAmount = amountRoundedUpToHundred

    ALL_NOMINALS.forEach(currentNominal => {
      const nominalWithCount = calculateNominalCount({
        amount: reminderOfAmount,
        nominal: currentNominal,
      })

      if (nominalWithCount) {
        const resultNominal = resultNominals.find(x => x.nominal === currentNominal)

        if (resultNominal) {
          resultNominal.count += nominalWithCount.count
        }
        else {
          resultNominals.push(nominalWithCount)
        }

        reminderOfAmount = reminderOfAmount - nominalWithCount.count * nominalWithCount.nominal
      }
    })
  })

  const totalAmount = resultNominals.reduce((currentTotalAmount, currentNominalWithCountAmount) => currentTotalAmount + currentNominalWithCountAmount.nominal * currentNominalWithCountAmount.count, 0)

  resultNominals.sort((a, b) => b.nominal - a.nominal)

  return {
    totalAmount,
    nominals: resultNominals,
  }
})

function calculateNominalCount({
  amount,
  nominal,
}: {
  amount: number,
  nominal: number,
}): {
  nominal: number,
  count: number,
} | null {
  const countOfNominal = Math.floor(amount / nominal)

  if (countOfNominal > 0) {
    return {
      nominal,
      count: countOfNominal,
    }
  }

  return null
}