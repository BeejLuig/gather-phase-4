const {assert} = require('chai');
const {buildItemObject, seedItemToDatabase, parseTextFromHTML} = require('../test-utils');

describe('User visits a single item page', () => {

  it('and the item description is rendered', () => {
    // setup
    const itemToCreate = buildItemObject();
    browser.url('/items/create');
    browser.setValue('#title-input', itemToCreate.title);
    browser.setValue('#description-input', itemToCreate.description);
    browser.setValue('#imageUrl-input', itemToCreate.imageUrl);

    // exercise
    browser.click('#submit-button');
    browser.click('.item-card a');

    // verify
    assert.include(browser.getText('body'), itemToCreate.description);
  });
});