import { BUILTIN_PAYLOAD_SCHEMAS } from "./behavior-types";
import {
  registerBehavior,
  getBehavior,
  hasBehavior,
  unregisterBehavior,
  listBehaviors,
  getRegistrySnapshot,
  clearBehaviorRegistry,
  registerDefaultBehaviors,
  validateBehaviorPayload
} from "./behavior-registry";
import {
  COMPONENT_IDS,
  COMPONENT_STATE_MACHINES,
  COMPONENT_FOCUS_RINGS,
  getComponentStateMachine,
  getComponentFocusRing,
  registerComponentBehaviors
} from "./generated/component-behaviors";
export {
  BUILTIN_PAYLOAD_SCHEMAS,
  COMPONENT_FOCUS_RINGS,
  COMPONENT_IDS,
  COMPONENT_STATE_MACHINES,
  clearBehaviorRegistry,
  getBehavior,
  getComponentFocusRing,
  getComponentStateMachine,
  getRegistrySnapshot,
  hasBehavior,
  listBehaviors,
  registerBehavior,
  registerComponentBehaviors,
  registerDefaultBehaviors,
  unregisterBehavior,
  validateBehaviorPayload
};
