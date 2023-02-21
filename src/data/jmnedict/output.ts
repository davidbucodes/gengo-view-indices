import fs from "fs";
import { join } from "path";
import { RootObject } from "./json.d";

const jnmedict: RootObject = require("./json.json");

const results: any = jnmedict.JMnedict.entry.reduce((acc, entry) => {
  entry.k_ele.forEach(k_ele => {
    k_ele.keb.forEach(keb => {
      const t = entry.trans
        .map(trans => trans.name_type)
        .flat()
        .filter(i => i)
        .map(i => i.replace("&", "").replace(";", ""))
        .join("|");
      const d = entry.trans
        .map(trans => trans.trans_det)
        .flat()
        .filter(i => i)
        .join("|");
      const r = entry.r_ele
        .map(r_ele => r_ele.reb)
        .flat()
        .filter(i => i)
        .join("|");
      acc[keb] = {
        ...(r ? { r } : {}),
        ...(t ? { t } : {}),
        ...(d ? { d } : {}),
      };
    });
  });
  return acc;
}, {} as any);

fs.writeFileSync(join(__dirname, "/output.json"), JSON.stringify(results), {
  encoding: "utf-8",
});
