export interface Label {
  id: number;
  name: string;
}

export interface Issue {
  id: number;
  labels: Label[];
  comments: number;
}
