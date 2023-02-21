export interface JMdictXML {
  JMdict: JMdict;
}
interface JMdict {
  entry: Entry[];
}
interface Entry {
  ent_seq: string[];
  r_ele: Rele[];
  sense: Sense[];
  k_ele?: Kele[];
}
interface Kele {
  keb: string[];
  ke_pri?: string[];
  ke_inf?: string[];
}
interface Sense {
  ant?: string[];
  dial?: string[];
  field?: string[];
  gloss: (Gloss | string)[];
  lsource?: Lsource[];
  misc?: string[];
  pos: string[];
  s_inf?: string[];
  stagk?: string[];
  stagr?: string[];
  xref?: string[];
}
interface Lsource {
  $: _2;
  _?: string;
}
interface _2 {
  "xml:lang"?: string;
  ls_wasei?: string;
  ls_type?: string;
}
interface Gloss {
  _: string;
  $: _;
}
interface _ {
  g_type: string;
}
interface Rele {
  reb: string[];
  re_pri?: string[];
  re_restr?: string[];
  re_inf?: string[];
  re_nokanji?: string[];
}
