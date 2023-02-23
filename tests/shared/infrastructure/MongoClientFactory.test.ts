import { MongoClient } from 'mongodb';

import { MongoClientFactory } from '../../../src/shared/infrastructure/persistence/mongo/MongoClientFactory';

describe('MongoClientFactory', () => {
  const factory = MongoClientFactory;
  let client: MongoClient;

  beforeEach(async () => {
    client = await factory.createClient('test', { url: 'mongodb://localhost:27017', name:'app-test1' });
  });

  afterEach(async () => {
    await client.close();
  });

  it('creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(MongoClient);
  });

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2', { url: 'mongodb://localhost:27017', name:'app-test2' });
    expect(newClient).not.toBe(client);
    await newClient.close();
  });

  it('returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test', { url: 'mongodb://localhost:27017', name:'app-test3' });
    expect(newClient).toBe(client);
    await newClient.close();
  });
});
