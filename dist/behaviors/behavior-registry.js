import { BUILTIN_PAYLOAD_SCHEMAS } from "./behavior-types";
const registry = /* @__PURE__ */ new Map();
function validateBehaviorPayload(config) {
  const schema = config.payloadSchema ?? BUILTIN_PAYLOAD_SCHEMAS[config.type];
  if (!schema) return [];
  const errors = [];
  const payload = config.payload ?? {};
  if (schema.required) {
    for (const key of schema.required) {
      if (!(key in payload)) {
        errors.push(`Missing required payload key: "${key}" for behavior type "${config.type}"`);
      }
    }
  }
  if (schema.properties) {
    for (const [key, expectedType] of Object.entries(schema.properties)) {
      if (key in payload) {
        const actual = payload[key];
        const actualType = Array.isArray(actual) ? "array" : typeof actual;
        if (actualType !== expectedType) {
          errors.push(`Payload key "${key}" expected type "${expectedType}" but got "${actualType}"`);
        }
      }
    }
  }
  return errors;
}
function registerBehavior(id, config) {
  if (registry.has(id)) {
    throw new Error(`Behavior "${id}" is already registered. Unregister it first to replace.`);
  }
  const payloadErrors = validateBehaviorPayload(config);
  if (payloadErrors.length > 0) {
    throw new Error(`Invalid payload for behavior "${id}": ${payloadErrors.join("; ")}`);
  }
  registry.set(id, Object.freeze({ ...config }));
}
function getBehavior(id) {
  return registry.get(id);
}
function hasBehavior(id) {
  return registry.has(id);
}
function unregisterBehavior(id) {
  registry.delete(id);
}
function listBehaviors() {
  return Array.from(registry.keys());
}
function getRegistrySnapshot() {
  return new Map(registry);
}
function clearBehaviorRegistry() {
  registry.clear();
}
function registerDefaultBehaviors() {
  const defaults = [
    ["navigate", { type: "navigate", description: "Navigate to a route", payload: {} }],
    ["submit", { type: "submit", description: "Submit the nearest form", payload: {} }],
    ["openModal", { type: "openModal", description: "Open a modal by name", payload: {} }],
    ["closeModal", { type: "closeModal", description: "Close the current modal", payload: {} }],
    ["toggle", { type: "toggle", description: "Toggle a boolean state", payload: {} }]
  ];
  for (const [id, config] of defaults) {
    if (!registry.has(id)) {
      registry.set(id, Object.freeze({ ...config }));
    }
  }
}
export {
  clearBehaviorRegistry,
  getBehavior,
  getRegistrySnapshot,
  hasBehavior,
  listBehaviors,
  registerBehavior,
  registerDefaultBehaviors,
  unregisterBehavior,
  validateBehaviorPayload
};
