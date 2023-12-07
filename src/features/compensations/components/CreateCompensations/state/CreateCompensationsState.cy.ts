import '../../../../../../cypress/support/commands';

import CreateCompensationsState from './CreateCompensationsState';

const INITIAL_TYPES = [
  {
    typeId: 1,
    label: 'English',
  },
  {
    typeId: 2,
    label: 'German',
  },
  {
    typeId: 3,
    label: 'Swimming',
  },
  {
    typeId: 4,
    label: 'Water',
  },
  {
    typeId: 5,
    label: 'Coworking',
  },
  {
    typeId: 6,
    label: 'Massage',
  },
  {
    typeId: 7,
    label: 'Products',
  },
  {
    typeId: 8,
    label: 'Consumables',
  },
  {
    typeId: 9,
    label: 'Periphery',
  },
  {
    typeId: 10,
    label: 'Business trip',
  },
  {
    typeId: 11,
    label: 'Psychotherapy',
  },
  {
    typeId: 12,
    label: 'Other',
  },
];

describe('CreateCompensationsState', () => {
  it('SHOULD return all types WHEN initialized', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.initializeTypes({
      loadedTypes: INITIAL_TYPES,
    });

    expect(createCompensationsState.allTypes).to.has.lengthOf(12);
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
    expect(createCompensationsState.allCompensations[0].typeId).eq(0);
    expect(createCompensationsState.allCompensations[0].comment).eq('');
    expect(createCompensationsState.allCompensations[0].amount).eq(0);
  });

  it('SHOULD return compensation of correct type WHEN add compensation of this type', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.addCompensation(1);

    expect(createCompensationsState.allCompensations).to.has.lengthOf(2);
    expect(createCompensationsState.allCompensations[1].typeId).eq(1);
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
      typeId: 1,
      amount: 100,
    });

    expect(createCompensationsState.allCompensations[1].typeId).eq(1);
    expect(createCompensationsState.allCompensations[1].comment).eq('Test comment');
    expect(createCompensationsState.allCompensations[1].amount).eq(100);
  });

  it('SHOULD return compensation with new data WHEN update the created compensation', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.addCompensation();

    createCompensationsState.updateCompensation({
      id: 1,
      comment: 'Test comment',
      typeId: 1,
      amount: 100,
    });

    expect(createCompensationsState.allCompensations[1].typeId).eq(1);
    expect(createCompensationsState.allCompensations[1].comment).eq('Test comment');
    expect(createCompensationsState.allCompensations[1].amount).eq(100);
  });

  it('SHOULD return total sum WHEN enter amount', () => {
    const createCompensationsState = new CreateCompensationsState();

    createCompensationsState.addCompensation();

    createCompensationsState.updateCompensation({
      id: 1,
      comment: 'Test comment',
      typeId: 1,
      amount: 100,
    });

    expect(createCompensationsState.allCompensations[1].typeId).eq(1);
    expect(createCompensationsState.allCompensations[1].comment).eq('Test comment');
    expect(createCompensationsState.allCompensations[1].amount).eq(100);
    expect(createCompensationsState.totalCount).eq(100);
  });

  it('SHOULD change isTriedToSubmit WHEN change state', () => {
    const createCompensationsState = new CreateCompensationsState();

    expect(createCompensationsState.isTriedToSubmit).eq(false);

    createCompensationsState.setIsTriedToSubmit(true);
    expect(createCompensationsState.isTriedToSubmit).eq(true);
  });

  it('SHOULD remove compensation from the list WHEN call removal', () => {
    const createCompensationsState = new CreateCompensationsState();

    expect(createCompensationsState.allCompensations).to.has.lengthOf(1);
    createCompensationsState.addCompensation();
    createCompensationsState.addCompensation();
    expect(createCompensationsState.allCompensations).to.has.lengthOf(3);
    createCompensationsState.removeCompensationsFromList();
    expect(createCompensationsState.allCompensations).to.has.lengthOf(1);
  });

  it.skip('SHOULD render error message WHEN click send button with negative amount', () => {
    const createCompensationsState = new CreateCompensationsState();

    expect(createCompensationsState.isTriedToSubmit).eq(false);
    createCompensationsState.addCompensation();

    createCompensationsState.updateCompensation({
      id: 1,
      comment: 'Test comment',
      typeId: 1,
      amount: -100,
    });
    createCompensationsState.setIsTriedToSubmit(true);
    expect(createCompensationsState.isNegative).eq(true);

    cy.contains('Amount can not be zero or negative').should('exist');
  });

  it('SHOULD not render error message WHEN click send button with not negative amount', () => {
    const createCompensationsState = new CreateCompensationsState();

    expect(createCompensationsState.isTriedToSubmit).eq(false);
    createCompensationsState.addCompensation();

    createCompensationsState.updateCompensation({
      id: 1,
      comment: 'Test comment',
      typeId: 1,
      amount: 100,
    });
    createCompensationsState.setIsTriedToSubmit(true);
    expect(createCompensationsState.isNegative).eq(false);

    cy.contains('Amount can not be zero or negative').should('not.exist');
  });

  it.skip('SHOULD render error message WHEN click send button with empty fields required', () => {
    const createCompensationsState = new CreateCompensationsState();

    expect(createCompensationsState.isTriedToSubmit).eq(false);
    createCompensationsState.addCompensation();

    createCompensationsState.updateCompensation({
      id: 1,
      comment: 'Test comment',
      typeId: 0,
      amount: 0,
    });
    createCompensationsState.setIsTriedToSubmit(true);
    expect(createCompensationsState.isFilled).eq(false);

    cy.contains('Please fill required field. ').should('exist');
  });

  it('SHOULD render error message WHEN click send button with empty fields required', () => {
    const createCompensationsState = new CreateCompensationsState();

    expect(createCompensationsState.isTriedToSubmit).eq(false);
    createCompensationsState.addCompensation();

    createCompensationsState.updateCompensation({
      id: 1,
      comment: 'Test comment',
      typeId: 2,
      amount: 100,
    });
    createCompensationsState.setIsTriedToSubmit(true);
    expect(createCompensationsState.isFilled).eq(true);

    cy.contains('Please fill required field. ').should('not.exist');
  });
});
