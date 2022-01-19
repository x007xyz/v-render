import RenderForm from "./render-form.vue";
import { handleFields } from "./utils";

export default RenderForm;

export const registerHandler = handleFields.register.bind(handleFields);
