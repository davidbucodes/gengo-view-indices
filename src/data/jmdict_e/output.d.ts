type Index = number | number[];

export interface JMdictOutput {
  terms: {
    [entry: string]: Index;
  };
  items: DictData[];
}

export interface DictData {
  display: string[];
  expl: string[];
  meaning: string[];
  reading: string[];
}
