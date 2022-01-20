import RenderTable from "./render-table.vue";
import { formatters } from "./utils";

export default RenderTable;

export const registerFormatter = (key, fn) => {
  formatters[key] = fn;
};
