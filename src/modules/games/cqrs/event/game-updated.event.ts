export class GameUpdatedEvent {
  id: number;

  constructor(payload: GameUpdatedEvent) {
    Object.assign(this, payload);
  }
}
