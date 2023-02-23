import { Collection, MongoClient } from 'mongodb';

import { AggregateRoot } from '../../../domain/value-object/AggregateRoot';

interface StringIdDocument {
  _id: string;
  [keys: string]: any
}

export abstract class MongoRepository<T extends AggregateRoot> {
  private _client: Promise<MongoClient>;

  constructor(client: Promise<MongoClient>) {
    this._client = client;
  }

  protected abstract collectionName(): string;

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(): Promise<Collection<StringIdDocument>> {
    return (await this._client).db().collection(this.collectionName());
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();
    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined};
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }
}
