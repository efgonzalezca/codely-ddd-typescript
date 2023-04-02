export class UsersCounterNotExist extends Error {
  constructor() {
    super('The users counter does not exists');
  }
}
