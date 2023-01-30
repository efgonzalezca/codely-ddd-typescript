export class User {
  readonly id: string;
  readonly names: string;
  readonly surnames: string;
  readonly document: string;

  constructor(id: string, names: string, surnames: string, document: string) {
    this.id = id;
    this.names = names;
    this.surnames = surnames;
    this.document = document;
  }
}