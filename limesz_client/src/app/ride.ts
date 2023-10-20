
export type State = 'lobby' | 'game' | 'score'

export interface Ride {
  id: string
  state: State
  players: {
    [key: string]: Player
  }
}

export interface Lobby extends Ride {
  state: 'lobby'
}

export interface Game extends Ride {
  state: 'game'
}

export interface GameOver extends Ride {
  state: 'score'
}

export interface Player {
  id: string
  name: string
}


