import '../../../../../../cypress/support/commands';

import CreateCompensationsState from './CreateCompensationsState';

const INITIAL_TYPES = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'Milk',
    value: 'milk',
  },
  {
    label: 'German',
    value: 'german',
  },
  {
    label: 'Swimming',
    value: 'swimming',
  },
  {
    label: 'Water',
    value: 'water',
  },
  {
    label: 'Coworking',
    value: 'coworking',
  },
  {
    label: 'Massage',
    value: 'massage',
  },
  {
    label: 'Products',
    value: 'products',
  },
  {
    label: 'Consumables',
    value: 'consumables',
  },
  {
    label: 'Periphery',
    value: 'periphery',
  },
  {
    label: 'Business trip',
    value: 'businessTrip',
  },
];

describe('CreateCompensationsState', () => {
  it('SHOULD return all types WHEN initialized', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.initializeTypes({
      loadedTypes: INITIAL_TYPES,
    });

    expect(createCompensationsState.allTypes).to.has.lengthOf(11);
  });

  it('SHOULD return date compensation WHEN called update', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.updateDate('2023-06-08T11:42:04.467165Z');

    expect(createCompensationsState.dateCompensation).eq('2023-06-08T11:42:04.467165Z');
  });
});
