export interface Launch {
  id: string;
  mission: string;
  vehicle: string;
  pad: string;
  windowOpens: string;
  status: 'GO' | 'HOLD' | 'SCRUBBED';
}

export const MOCK_LAUNCHES: Launch[] = [
  {
    id: '1',
    mission: 'Apollo 11',
    vehicle: 'Saturn V',
    pad: 'LC-39A',
    windowOpens: '1969-07-16T13:32:00Z',
    status: 'GO',
  },
  {
    id: '2',
    mission: 'STS-1',
    vehicle: 'Space Shuttle Columbia',
    pad: 'LC-39A',
    windowOpens: '1981-04-12T12:00:00Z',
    status: 'GO',
  },
  {
    id: '3',
    mission: 'Falcon 9 Demo-2',
    vehicle: 'Falcon 9',
    pad: 'LC-39A',
    windowOpens: '2020-05-30T19:22:00Z',
    status: 'GO',
  },
  {
    id: '4',
    mission: 'Artemis I',
    vehicle: 'SLS',
    pad: 'LC-39B',
    windowOpens: '2022-11-16T06:47:00Z',
    status: 'GO',
  },
  {
    id: '5',
    mission: 'Falcon 9 Mission',
    vehicle: 'Falcon 9',
    pad: 'LC-39A',
    windowOpens: '2027-06-01T12:00:00Z',
    status: 'HOLD',
  },
  {
    id: '6',
    mission: 'Starship Mission',
    vehicle: 'Starship',
    pad: 'Boca Chica',
    windowOpens: '2027-06-02T12:00:00Z',
    status: 'SCRUBBED',
  }
];
