import assert from 'assert';
import request from 'supertest';
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';

import { Server } from '../../../../src/api/models';

let _request: request.Test;
let application: Server;
let response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.HTTPServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  response = await _request.expect(status);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(application.HTTPServer).put(route).send(JSON.parse(body));
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(response.body, {});
});

BeforeAll(async () => {
  application = new Server();
  await application.listen();
});

AfterAll(async () => {
  await application.stop();
});
