import chaiJsonSchema from 'chai-json-schema';
import beersSchema from '../../schemas/beers';
chai.use(chaiJsonSchema);

const baseUrl = 'https://api.punkapi.com/v2/beers';

const requestData = (query = '') => (
  cy.request({
    url: baseUrl,
    method: 'GET',
    qs: query,
    failOnStatusCode: false,
  })
);

describe('Beers API testing', () => {
  it('returns exactly 20 data', () => {
    const query = { 
      page: 1,
      per_page: 20
    };
    requestData(query).then((resp) => {
      const data = resp.body;
      const arrName = data.map(el => el.name);
      expect(data.length).to.equal(20);
      cy.log(data.length);
      cy.log(arrName.join(', '));
    });
  });

  it('returns exactly 5 data', () => {
    const query = { 
      page: 1,
      per_page: 5
    };
    requestData(query).then((resp) => {
      const data = resp.body;
      const arrName = data.map(el => el.name);
      expect(data.length).to.equal(5);
      cy.log(data.length);
      cy.log(arrName.join(', '));
    });
  });

  it('returns exactly 1 data', () => {
    const query = { 
      page: 1,
      per_page: 1
    };
    requestData(query).then((resp) => {
      const data = resp.body;
      const arrName = data.map(el => el.name);
      expect(data.length).to.equal(1);
      cy.log(data.length);
      cy.log(arrName.join(', '));
    });
  });

  it('validates JSON Schema', () => {
    requestData().then((resp) => {
      const data = resp.body;
      const arrName = data.map(el => el.name);
      expect(data.length).to.equal(25);
      expect(data).to.be.jsonSchema(beersSchema);
      cy.log(beersSchema);
      cy.log(data.length);
      cy.log(arrName.join(', '));
    });
  });
})