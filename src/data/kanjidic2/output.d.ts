export interface Kanjidic2Output {
  [literal: string]: KanjiData;
}

interface KanjiData {
  freq: number;
  grade: number;
  jlpt: number;
  strokeCount: number[];
  on: string[];
  kun: string[];
  pinyin: string[];
  meaning: string[];
  nanori: string[];
}
