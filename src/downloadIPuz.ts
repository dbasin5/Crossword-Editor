import { IPuz } from "./types";

export function downloadIPuz(ipuz: IPuz) {
  const json = JSON.stringify(ipuz, null, 2); // pretty-printed for readability
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ipuz.title || 'puzzle'}.ipuz`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}