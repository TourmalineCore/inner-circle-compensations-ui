const ARRAY_TYPES_TIPS = [
  {
    type: 'Coworking',
    description: 'the number of times in the co-working space are payable in consultation with the manager.',
  },
  {
    type: 'Massage',
    description: '10 back massage sessions per year. 1 session - max 2000 rubles.',
  },
  {
    type: 'Psychotherapy',
    description: '1 psychotherapy session per month. 1 session - max 3000 rubles.',
  },
  {
    type: 'Office expenses',
    description: 'buy something for the company. These things can include, for example, peripherals for technology, groceries, water, printer paper.',
  },
  {
    type: 'Business trip',
    description: 'the list of compensated expences during business trip are announced by manager before the trip.',
  },
  {
    type: 'Medical consultation',
    description: '2 consultations per year with narrow profile doctors. 1 consultation - max 3600 rubles. Dentistry is not included.',
  },
  {
    type: 'Sport',
    description: 'any kind of paid sport trainings. 1 month - max 3000 rubles.',
  },
  {
    type: 'Other',
    description: 'expenses that don\'t fit under other tags.',
  },
];

export function CompensationsTypesTips() {
  return (
    <details className="compensations-types-tips">
      <summary
        className="compensations-types-tips__head"
        data-cy="compensations-types-tips-head"
      >
        Click here to show or hide details about compensation types
      </summary>
      <ul
        className="compensations-types-tips__list"
        data-cy="compensations-types-tips-list"
      >
        {ARRAY_TYPES_TIPS.map(({ type, description }) => (
          <li
            className="compensations-types-tips__item"
            key={type}
          >
            <span className="compensations-types-tips__type">
              {type}
            </span>
            {' '}
            -
            {' '}
            {description}
          </li>
        ))}
      </ul>
    </details>
  );
}
