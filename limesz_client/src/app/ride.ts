
export type State = 'lobby' | 'inGame' | 'gameOver'

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
  state: 'inGame'
}

export interface GameOver extends Ride {
  state: 'gameOver'
}

export interface Player {
  id: string
  name: string
}


