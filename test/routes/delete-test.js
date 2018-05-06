const {assert} = require('chai');
const request = require('supertest');
const Item = require('../../models/item');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('POST', () => {
    it('removes an item from the database', async () => {
      // setup
      const item = await seedItemToDatabase();
      
      // exercise
      const response = await request(app)
        .post(`/items/${item._id}/delete`);
      const items = await Item.find({});
      console.log(items[0]);
      // verify
      assert.isEmpty(items);
    });
    it('redirects to /', async () => {
      // setup
      const item = await seedItemToDatabase();
      
      // exercise
      const response = await request(app)
        .post(`/items/${item._id}/delete`);

      // verify
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
  });
});