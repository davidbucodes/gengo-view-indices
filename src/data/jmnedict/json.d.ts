export interface RootObject {
  JMnedict: JMnedict;
}
interface JMnedict {
  entry: Entry[];
}
interface Entry {
  ent_seq: string[];
  k_ele?: Kele[];
  r_ele: Rele[];
  trans: Tran[];
}
interface Tran {
  name_type?: string[];
  trans_det: string[];
  xref?: string[];
}
interface Rele {
  reb: string[];
}
interface Kele {
  keb: string[];
}
