const SCRIM_DEFAULTS = {
  light: {
    opacity: 0.3,
    usage: "Standard modals and dialogs"
  },
  strong: {
    opacity: 0.45,
    usage: "Critical dialogs (delete confirmation)"
  }
};
const BLUR_DEFAULTS = {
  none: { blur: 0 },
  background: { blur: 8 }
};
const DEFAULT_OVERLAY_CONFIG = {
  scrim: "light",
  blur: "none",
  closeOnClick: true,
  closeOnEscape: true,
  centered: true,
  zIndex: 1e3
};
const Z_INDEX_LAYERS = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 1e3,
  popover: 1100,
  tooltip: 1200,
  toast: 1300
};
function generateScrimCSS(variant) {
  return {
    position: "fixed",
    inset: "0",
    backgroundColor: `var(--color-scrim-${variant})`,
    zIndex: String(Z_INDEX_LAYERS.modal - 1)
  };
}
function generateBackdropCSS(scrim, blur = "none") {
  const css = {
    position: "fixed",
    inset: "0",
    backgroundColor: `var(--color-scrim-${scrim})`,
    zIndex: String(Z_INDEX_LAYERS.modal - 1)
  };
  if (blur !== "none") {
    css.backdropFilter = `blur(var(--effect-blur-${blur}))`;
    css.WebkitBackdropFilter = `blur(var(--effect-blur-${blur}))`;
  }
  return css;
}
function generateOverlayContainerCSS(position, zIndex = Z_INDEX_LAYERS.modal) {
  const baseCSS = {
    position: "fixed",
    zIndex: String(zIndex)
  };
  switch (position.type) {
    case "centered":
      return {
        ...baseCSS,
        inset: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-inset-l)"
      };
    case "top":
      return {
        ...baseCSS,
        top: position.offset ?? "0",
        left: "0",
        right: "0"
      };
    case "bottom":
      return {
        ...baseCSS,
        bottom: position.offset ?? "0",
        left: "0",
        right: "0"
      };
    case "left":
      return {
        ...baseCSS,
        top: "0",
        bottom: "0",
        left: position.offset ?? "0"
      };
    case "right":
      return {
        ...baseCSS,
        top: "0",
        bottom: "0",
        right: position.offset ?? "0"
      };
    case "fullscreen":
      return {
        ...baseCSS,
        inset: "0"
      };
    default:
      return baseCSS;
  }
}
function getScrimTailwindClasses(variant) {
  return [
    "fixed",
    "inset-0",
    variant === "light" ? "bg-black/30" : "bg-black/45",
    `z-[${Z_INDEX_LAYERS.modal - 1}]`
  ];
}
function getOverlayContainerTailwindClasses(position, blur = "none") {
  const classes = ["fixed", `z-[${Z_INDEX_LAYERS.modal}]`];
  switch (position) {
    case "centered":
      classes.push("inset-0", "flex", "items-center", "justify-center", "p-inset-l");
      break;
    case "top":
      classes.push("top-0", "left-0", "right-0");
      break;
    case "bottom":
      classes.push("bottom-0", "left-0", "right-0");
      break;
    case "left":
      classes.push("top-0", "bottom-0", "left-0");
      break;
    case "right":
      classes.push("top-0", "bottom-0", "right-0");
      break;
    case "fullscreen":
      classes.push("inset-0");
      break;
  }
  if (blur === "background") {
    classes.push("backdrop-blur-background");
  }
  return classes;
}
function resolveOverlayIntent(intent) {
  return {
    backdrop: generateBackdropCSS(intent.scrim, intent.blur),
    container: generateOverlayContainerCSS(intent.position)
  };
}
export {
  BLUR_DEFAULTS,
  DEFAULT_OVERLAY_CONFIG,
  SCRIM_DEFAULTS,
  Z_INDEX_LAYERS,
  generateBackdropCSS,
  generateOverlayContainerCSS,
  generateScrimCSS,
  getOverlayContainerTailwindClasses,
  getScrimTailwindClasses,
  resolveOverlayIntent
};
