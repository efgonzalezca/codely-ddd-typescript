import assert from 'assert';

import request from 'supertest';
import { AfterAll, BeforeAll, Given, Then, When } from '@cucumber/cucumber';

import { Server } from '../../../../src/api/models';
import container from '../../../../src/api/dependency-injection';
import { EventBus } from '../../../../src/shared/domain/EventBus';
import { DomainEventSubscribers } from '../../../../src/shared/infrastructure/EventBus/DomainEventSubscribers';
import { DomainEventDeserializer } from '../../../../src/shared/infrastructure/EventBus/DomainEventDeserializer';

//* to check test comment controller.steps.ts
//TODO: search how works supertest library 
const eventBus = container.get('app.EventBus') as EventBus;
const deserializer = buildDeserializer();

let _request: request.Test;
let application: Server;
let response: request.Response;

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event);
  await eventBus.publish([domainEvent!]);
  await wait(100);
});

When('I send a GET request to {string}', (route: string) => {
  _request = request(application.HTTPServer).get(route);
})

Then('the response status code should be {int}', async (status: number) => {
  response = await _request.expect(status);
});

//TODO: check why doesn't work it?
Then('the response content should be {string}', (content:string) => {
  assert.deepStrictEqual(JSON.parse(response.body), JSON.parse(content));
});

BeforeAll(async () => {
  application = new Server();
  await application.listen();
});

AfterAll(async () => {
  await application.stop();
});

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from(container);

  return DomainEventDeserializer.configure(subscribers);
}

function wait(milliseconds: number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}