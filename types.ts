export interface Sector {
  id: string;
  name: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  image: string;
  coordinates: { top: string; left: string };
  iconName: string;
}

export interface MetricData {
  name: string;
  value: number;
}

export enum TourMode {
  IMMERSIVE = 'IMMERSIVE',
  GUIDED = 'GUIDED'
}
