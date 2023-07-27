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

  it('SHOULD return compensation date WHEN call update', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.updateDate('2023-06-08T11:42:04.467165Z');

    expect(createCompensationsState.dateCompensation).eq('2023-06-08T11:42:04.467165Z');
  });

  it('SHOULD return compensation WHEN add compensation', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.addCompensation();

    expect(createCompensationsState.allCompensations).to.has.lengthOf(2);
    expect(createCompensationsState.allCompensations[0].type).eq('');
    expect(createCompensationsState.allCompensations[0].comment).eq('');
    expect(createCompensationsState.allCompensations[0].amount).eq(0);
  });

  it('SHOULD return compensation of correct type WHEN add compensation of this type', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.addCompensation('english');

    expect(createCompensationsState.allCompensations).to.has.lengthOf(2);
    expect(createCompensationsState.allCompensations[1].type).eq('english');
    expect(createCompensationsState.allCompensations[1].comment).eq('');
    expect(createCompensationsState.allCompensations[1].amount).eq(0);
  });

  it('SHOULD return compensation WHEN remove compensation', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.addCompensation();
    expect(createCompensationsState.allCompensations).to.has.lengthOf(2);

    createCompensationsState.removeCompensation(1);
    expect(createCompensationsState.allCompensations).to.has.lengthOf(1);
  });

  it('SHOULD return compensation with new data WHEN update the created compensation', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.addCompensation();

    createCompensationsState.updateCompensation({
      id: 1,
      comment: 'Test comment',
      type: 'english',
      amount: 100,
    });

    expect(createCompensationsState.allCompensations[1].type).eq('english');
    expect(createCompensationsState.allCompensations[1].comment).eq('Test comment');
    expect(createCompensationsState.allCompensations[1].amount).eq(100);
  });

  it('SHOULD return compensation with new data WHEN update the created compensation', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.addCompensation();

    createCompensationsState.updateCompensation({
      id: 1,
      comment: 'Test comment',
      type: 'english',
      amount: 100,
    });

    expect(createCompensationsState.allCompensations[1].type).eq('english');
    expect(createCompensationsState.allCompensations[1].comment).eq('Test comment');
    expect(createCompensationsState.allCompensations[1].amount).eq(100);
  });
});
