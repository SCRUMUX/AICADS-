const BUILTIN_PAYLOAD_SCHEMAS = {
  navigate: { required: ["route"], properties: { route: "string", params: "object" } },
  submit: { properties: { formId: "string", action: "string" } },
  openModal: { required: ["modalName"], properties: { modalName: "string", props: "object" } },
  closeModal: { properties: { modalName: "string" } },
  toggle: { required: ["target"], properties: { target: "string" } }
};
export {
  BUILTIN_PAYLOAD_SCHEMAS
};
