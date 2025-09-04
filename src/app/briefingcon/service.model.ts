
export interface ServiceInList { 
  id : number;
  data: Date;
  turno: string;
  notturno: boolean;
  username: string;
}

export interface ResultServiceInList{
  result: ServiceInList[],
  count: number
}