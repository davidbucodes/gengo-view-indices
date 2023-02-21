export interface Kanjidic2Output {
  [literal: string]: KanjiData;
}

interface KanjiData {
  freq: number;
  grade: number;
  jlpt: number;
  strokeCount: number[];
  onReading: string[];
  kunReading: string[];
  meaning: string[];
  nanori: string[];
}
