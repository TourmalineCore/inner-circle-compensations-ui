const ARRAY_TYPES_TIPS = [
  {
    type: 'Swimming',
    description: 'бассейн. 8 занятий в месяц.',
  },
  {
    type: 'Water',
    description: 'покупка воды в офис. Cтарайтесь брать по офисной карте. Покупайте за свой счёт только если на офисной карте закончились деньги.',
  },
  {
    type: 'Coworking',
    description: 'коворкинг. Количество по согласованию.',
  },
  {
    type: 'Massage',
    description: 'массаж спины. 10 сеансов в год.',
  },
  {
    type: 'Psychotherapy',
    description: 'сессии с психотерапевтом. 1 сессия в месяц.',
  },
  {
    type: 'Products',
    description: 'покупка продуктов в офис. Cтарайтесь брать по офисной карте. Покупайте за свой счёт только если на офисной карте закончились деньги.',
  },
  {
    type: 'Consumables',
    description: 'покупка расходников в офис: бумага для принтера и т.д.',
  },
  {
    type: 'Periphery',
    description: `покупка оборудования для техники: мышки, коврики, провода и т.д. Cтарайтесь покупать через Юлю. 
    Покупайте за свой счёт только если их нет на месте или нужно купить быстрее.`,
  },
  {
    type: 'Business trip',
    description: 'расходы на командировку и во время неё: авиа/жд билеты, аренда жилья, другие расходы по согласованию.',
  },
  {
    type: 'Medical consultation',
    description: 'консультация у узкого мед специалиста (не терапевт) в платных клиниках. Максимум 3600 руб. за одну консультацию. 2 консультации в год. Стоматология не входит.',
  },
  {
    type: 'Other',
    description: 'расходы не подходящие под другие тэги.',
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
