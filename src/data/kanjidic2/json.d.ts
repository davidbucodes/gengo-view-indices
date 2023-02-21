export interface Kanjidic2XML {
  "?xml": Xml;
  kanjidic2: Kanjidic2;
}

interface Kanjidic2 {
  header: Header;
  character: Character[];
}

interface Character {
  literal: string;
  codepoint: Codepoint;
  radical: Radical;
  misc: Misc;
  dic_number?: Dicnumber;
  query_code?: Querycode;
  reading_meaning?: Readingmeaning;
}

interface Readingmeaning {
  rmgroup: Rmgroup;
  nanori?: string[] | string;
}

interface Rmgroup {
  reading?: Reading | Reading[];
  meaning?:
    | (Meaning | number | string)[]
    | string[]
    | (Meaning | string)[]
    | boolean
    | (boolean | string)[]
    | (boolean | Meaning | string)[]
    | (Meaning7 | Meaning | string)[]
    | number
    | string;
}

interface Meaning7 {
  "#text": number;
  "@_m_lang": string;
}

interface Meaning {
  "#text": string;
  "@_m_lang": string;
}

interface Reading {
  "#text": string;
  "@_r_type": string;
}

interface Querycode {
  q_code: Qcode[] | Qcode2[] | Qcode3[] | Qcode4 | Qcode2;
}

interface Qcode4 {
  "#text": number;
  "@_qc_type": string;
}

interface Qcode3 {
  "#text": number | string;
  "@_qc_type": string;
  "@_skip_misclass"?: string;
}

interface Qcode2 {
  "#text": string;
  "@_qc_type": string;
}

interface Qcode {
  "#text": number | string;
  "@_qc_type": string;
}

interface Dicnumber {
  dic_ref: Dicref | Dicref2[] | Dicref3[] | Dicref2 | Dicref5[] | Dicref6[];
}

interface Dicref6 {
  "#text": number | string;
  "@_dr_type": string;
  "@_m_vol"?: string;
  "@_m_page"?: string;
}

interface Dicref5 {
  "#text": number;
  "@_dr_type": string;
  "@_m_vol"?: string;
  "@_m_page"?: string;
}

interface Dicref3 {
  "#text": number | string;
  "@_dr_type": string;
}

interface Dicref2 {
  "#text": number;
  "@_dr_type": string;
}

interface Dicref {
  "#text": string;
  "@_dr_type": string;
}

interface Misc {
  grade?: number;
  stroke_count: number[] | number;
  variant?: Variant[] | Variant2[] | Variant2 | Variant4 | Variant4[];
  freq?: number;
  jlpt?: number;
  rad_name?: string[] | string;
}

interface Variant4 {
  "#text": string;
  "@_var_type": string;
}

interface Variant2 {
  "#text": number;
  "@_var_type": string;
}

interface Variant {
  "#text": number | string;
  "@_var_type": string;
}

interface Radical {
  rad_value: Radvalue | Radvalue[];
}

interface Radvalue {
  "#text": number;
  "@_rad_type": string;
}

interface Codepoint {
  cp_value: Cpvalue[];
}

interface Cpvalue {
  "#text": number | string | string;
  "@_cp_type": string;
}

interface Header {
  file_version: number;
  database_version: string;
  date_of_creation: string;
}

interface Xml {
  "@_version": string;
  "@_encoding": string;
}
