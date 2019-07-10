import React from 'react';
const app = require('../server/index.js');
const db = require('../server/db/index.js');

describe('Dropdown Button filter GET request', () => {
  it('performs GET request filtered by newest', async() => {
    const response = await request(app).get('/100/reviews?sort=newest')
    expect(response.body[0].)
  })
})