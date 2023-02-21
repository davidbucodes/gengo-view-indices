export interface JMNedictOutput {
  [name: string]: NameData;
}

interface NameData {
  d: string;
  t: string;
  r: string;
}
