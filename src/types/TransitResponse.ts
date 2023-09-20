export type TransitResponse = {
  "stop-schedule": StopSchedule;
  "query-time": Date;
};

export type StopSchedule = {
  stop: Stop;
  "route-schedules": RouteSchedule[];
};

export type RouteSchedule = {
  route: Route;
  "scheduled-stops": ScheduledStop[];
};

export type Route = {
  key: number | string;
  number: number;
  name: string;
  "customer-type": string;
  coverage: string;
  "badge-label": number;
  "badge-style": BadgeStyle;
};

export type BadgeStyle = {
  "class-names": ClassNames;
  "background-color": string;
  "border-color": string;
  color: string;
};

export type ClassNames = {
  "class-name": string[];
};

export type ScheduledStop = {
  key: string;
  cancelled: string;
  times: Times;
  variant: Variant;
  bus: Bus;
};

export type Bus = {
  key: number;
  "bike-rack": string;
  wifi: string;
};

export type Times = {
  arrival: Arrival;
  departure: Arrival;
};

export type Arrival = {
  scheduled: Date;
  estimated: Date;
};

export type Variant = {
  key: Key;
  name: Name;
};

export enum Key {
  The160B = "16-0-B",
  The160M = "16-0-M",
}

export enum Name {
  SelkirkOsborneToTyndallParkViaBurrows = "Selkirk-Osborne to Tyndall Park via Burrows",
  SelkirkOsborneToTyndallParkViaManitoba = "Selkirk-Osborne to Tyndall Park via Manitoba",
}

export type Stop = {
  key: number;
  name: string;
  number: number;
  direction: string;
  side: string;
  street: Street;
  "cross-street": Street;
  centre: Centre;
};

export type Centre = {
  utm: Utm;
  geographic: Geographic;
};

export type Geographic = {
  latitude: string;
  longitude: string;
};

export type Utm = {
  zone: string;
  x: number;
  y: number;
};

export type Street = {
  key: number;
  name: string;
  type: string;
};
