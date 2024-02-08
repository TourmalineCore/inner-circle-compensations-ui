const ARRAY_TYPES_TIPS = [
  {
    type: 'English',
    description: 'занятия по английскому. Неограниченно.',
  },
  {
    type: 'German',
    description: 'занятия по немецкому. Неограниченно.',
  },
  {
    type: 'Swimming',
    description: 'бассейн. Неограниченно.',
  },
  {
    type: 'Water',
    description: 'покупка воды в офис. Cтарайтесь брать по офисной карте. Покупайте за свой счёт только если на офисной карте закончились деньги.',
  },
  {
    type: 'Coworking',
    description: 'коворкинг. Неограниченно.',
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
    description: `покупка оборудования для техники: мышки, коврики, провода и т.д. Cтарайтесь покупать через Юлю или Елизавету. 
    Покупайте за свой счёт только если их нет на месте или нужно купить быстрее.`,
  },
  {
    type: 'Business trip',
    description: 'расходы на командировку и во время неё: авиа/жд билеты, аренда жилья, другие расходы по согласованию.',
  },
  {
    type: 'Other',
    description: 'расходы не подходящие под другие тэги.',
  },
];

export function CompensationsTypesTips() {
  return (
    <details>
      <summary className="compensations-types-tips">Click here to show or hide details about compensation types</summary>
      <ul className="compensations-types-tips__list" data-cy="compensations-types-tips">
        {ARRAY_TYPES_TIPS.map(({ type, description }) => (
          <li className="compensations-types-tips__item">
            <span className="compensations-types-tips__type">{type}</span>
            {' '}
            -
            {' '}
            <span>{description}</span>
          </li>
        ))}
      </ul>
    </details>
  );
}
