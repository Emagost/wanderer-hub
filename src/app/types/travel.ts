export type TCoords = {
  depart: {
    lat: number
    lng: number
  }
  arrive: {
    lat: number
    lng: number
  }
}

export interface ITravel {
  id:string
  travelName: string
  description: string
  coords: TCoords
  arrivesDate:string
  departDate:string
}
