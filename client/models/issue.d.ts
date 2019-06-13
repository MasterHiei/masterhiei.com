/**
 * Label of GitHub issue
 * @interface Label
 */
export interface Label {
  id: number;
  name: string;
}

/**
 * GitHub issue
 * @interface Issue
 */
export interface Issue {
  id: number;
  labels: Label[];
  comments: number;
}
