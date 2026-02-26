import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useEffect, useRef, useId, useMemo } from "react";
import { cn, findClasses } from "../_shared";
import { IconSlot } from "../_shared/IconSlot";
import { ClearButton } from "../_shared/ClearButton";
import { Popover } from "../_shared/Popover";
import { Chip } from "../Chip/Chip";
import { Checkbox } from "../Checkbox/Checkbox";
import { Badge } from "../Badge/Badge";
import { DropdownItem } from "../DropdownItem/DropdownItem";
import { useControllableState } from "../../../hooks/useControllableState";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { usePopoverState } from "../../../hooks/usePopoverState";
import { useOverflowCounter } from "../../../hooks/useOverflowCounter";
import { mergeRefs } from "../../../hooks/mergeRefs";
import contract from "../../../contracts/components/Dropdown.contract.json";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "!px-[var(--space-button-x-sm)] !py-[var(--space-button-y-sm)] !min-h-[var(--space-28)] min-w-[var(--space-container-compact-min)] max-w-[var(--space-container-compact-max)] !gap-[var(--space-button-gap-sm)] text-style-caption rounded-[var(--radius-default)]",
  md: "!px-[var(--space-button-x-md)] !py-[var(--space-button-y-md)] !min-h-[var(--space-36)] min-w-[var(--space-container-content-min)] max-w-[var(--space-container-content-max)] !gap-[var(--space-button-gap-md)] text-style-body rounded-[var(--radius-default)]",
  lg: "!px-[var(--space-button-x-lg)] !py-[var(--space-button-y-lg)] !min-h-[var(--space-40)] min-w-[var(--space-container-content-min)] max-w-[var(--space-container-wide-max)] !gap-[var(--space-button-gap-lg)] text-style-body-lg rounded-[var(--radius-default)]"
};
const DefaultChevron = ({ open }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": "true",
    className: cn("transition-transform duration-200", open && "rotate-180"),
    children: /* @__PURE__ */ jsx("path", { d: "M5 8l5 5 5-5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  }
);
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8.5L6.5 11.5L12.5 5.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
const Dropdown = React.forwardRef((props, ref) => {
  const {
    state = "closed",
    size = "sm",
    appearance,
    iconLeft,
    tagRow,
    badge,
    chevron,
    showSubmenu = true,
    showIconLeft = false,
    showBadge = false,
    showTagRow = false,
    items,
    options,
    value: valueProp,
    defaultValue,
    onChange,
    multiple = false,
    allowExclude = false,
    excludedValues: excludedProp,
    defaultExcludedValues,
    onExcludedChange,
    disabled = false,
    placeholder = "Select...",
    "aria-label": ariaLabel,
    onOpenChange,
    fullWidth = false,
    showClearButton = false,
    onClear,
    children,
    className,
    ...rest
  } = props;
  if (true) {
    if (showSubmenu !== void 0) console.warn("[Dropdown] `showSubmenu` is deprecated and has no effect. Submenu is controlled via `submenuItems` on DropdownItem.");
    if (props.maxVisibleChips !== void 0) console.warn("[Dropdown] `maxVisibleChips` is deprecated. Chips now dynamically fill available width.");
  }
  const listboxId = useId();
  const normalizeValue = useCallback(
    (v) => {
      if (v === void 0) return [];
      return Array.isArray(v) ? v : [v];
    },
    []
  );
  const [selected, setSelected] = useControllableState({
    value: valueProp !== void 0 ? normalizeValue(valueProp) : void 0,
    defaultValue: normalizeValue(defaultValue),
    onChange: (v) => onChange?.(multiple ? v : v[0] ?? "")
  });
  const [excluded, setExcluded] = useControllableState({
    value: excludedProp,
    defaultValue: defaultExcludedValues ?? [],
    onChange: (v) => onExcludedChange?.(v)
  });
  const { isOpen, open: openPopover, close: closePopover, toggle } = usePopoverState({
    defaultOpen: state === "open",
    onOpenChange,
    disabled
  });
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const chipsRef = useRef(null);
  const mergedRef = mergeRefs(ref, containerRef);
  const optionList = options ?? [];
  const itemCount = items?.length ?? optionList.length;
  const allChipValues = useMemo(() => [...selected, ...excluded], [selected, excluded]);
  const { renderCount, overflowCount, showGradient } = useOverflowCounter(chipsRef, allChipValues.length);
  const close = useCallback(() => {
    closePopover();
    setActiveIndex(-1);
  }, [closePopover]);
  const open = useCallback(() => {
    openPopover();
    setActiveIndex(0);
  }, [openPopover]);
  useClickOutside(containerRef, close, isOpen);
  useEscapeKey(close, isOpen);
  const toggleOption = useCallback(
    (val) => {
      if (multiple) {
        if (allowExclude) {
          const isSelected = selected.includes(val);
          const isExcluded = excluded.includes(val);
          if (!isSelected && !isExcluded) {
            setSelected((prev) => [...prev, val]);
          } else if (isSelected) {
            setSelected((prev) => prev.filter((v) => v !== val));
            setExcluded((prev) => [...prev, val]);
          } else {
            setExcluded((prev) => prev.filter((v) => v !== val));
          }
        } else {
          setSelected(
            (prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
          );
        }
      } else {
        setSelected([val]);
        close();
      }
    },
    [multiple, allowExclude, selected, excluded, setSelected, setExcluded, close]
  );
  const removeChip = useCallback(
    (val) => {
      if (val) {
        setSelected((prev) => prev.filter((v) => v !== val));
        setExcluded((prev) => prev.filter((v) => v !== val));
      }
    },
    [setSelected, setExcluded]
  );
  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      setSelected([]);
      setExcluded([]);
      onClear?.();
    },
    [setSelected, setExcluded, onClear]
  );
  const findNextEnabled = useCallback(
    (from, direction) => {
      if (itemCount === 0) return -1;
      for (let attempt = 0; attempt < itemCount; attempt++) {
        const idx = (from + direction * (attempt + 1) + itemCount * itemCount) % itemCount;
        const opt = optionList[idx];
        if (!opt || !opt.disabled) return idx;
      }
      return from;
    },
    [itemCount, optionList]
  );
  const findFirstEnabled = useCallback(
    (from, direction) => {
      const start = direction === 1 ? 0 : itemCount - 1;
      for (let i = start; direction === 1 ? i < itemCount : i >= 0; i += direction) {
        const opt = optionList[i];
        if (!opt || !opt.disabled) return i;
      }
      return from;
    },
    [itemCount, optionList]
  );
  const handleTriggerKeyDown = useCallback(
    (e) => {
      if (disabled) return;
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => findNextEnabled(i, 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => findNextEnabled(i, -1));
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(findFirstEnabled(0, 1));
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(findFirstEnabled(itemCount - 1, -1));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (activeIndex >= 0) {
            if (optionList.length > 0) {
              const opt = optionList[activeIndex];
              if (opt && !opt.disabled) toggleOption(opt.value);
            } else if (items?.[activeIndex]) {
              items[activeIndex].onClick?.();
              close();
            }
          }
          break;
      }
    },
    [isOpen, disabled, activeIndex, itemCount, optionList, items, open, close, toggleOption, findNextEnabled, findFirstEnabled]
  );
  useEffect(() => {
    if (activeIndex < 0 || !popoverRef.current) return;
    const el = popoverRef.current.children[activeIndex];
    el?.scrollIntoView?.({ block: "nearest" });
  }, [activeIndex]);
  const vcArgs = { state: isOpen ? "open" : "closed", size };
  if (appearance) vcArgs.appearance = appearance;
  const vc = findClasses(rules, vcArgs);
  const focusRing = contract.focusRing ?? "";
  const optionMap = useMemo(
    () => new Map(optionList.map((o) => [o.value, o.label ?? o.value])),
    [optionList]
  );
  const hasSelection = allChipValues.length > 0;
  const hasMeaningfulSelection = allChipValues.length > 0 && allChipValues.some((v) => v !== "");
  const useStructuredOptions = optionList.length > 0;
  const clearVisible = showClearButton && hasMeaningfulSelection && !disabled;
  return /* @__PURE__ */ jsxs("div", { ref: mergedRef, className: cn("relative", fullWidth && "w-full !min-w-0 !max-w-none", className), ...rest, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: triggerRef,
        className: cn(
          "transition-colors duration-150 font-base box-border flex flex-row items-center w-full",
          SIZE_CLASSES[size],
          ...vc,
          !disabled && !isOpen && focusRing,
          disabled ? "cursor-not-allowed opacity-[var(--opacity-disabled)]" : "cursor-pointer select-none",
          fullWidth && "!min-w-0 !max-w-none"
        ),
        style: fullWidth ? { maxWidth: "none", minWidth: 0 } : void 0,
        onClick: toggle,
        onKeyDown: handleTriggerKeyDown,
        role: "combobox",
        tabIndex: disabled ? -1 : 0,
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox",
        "aria-controls": isOpen ? listboxId : void 0,
        "aria-activedescendant": activeIndex >= 0 ? `dropdown-opt-${activeIndex}` : void 0,
        "aria-label": ariaLabel,
        "aria-disabled": disabled || void 0,
        children: [
          showIconLeft && iconLeft && /* @__PURE__ */ jsx(IconSlot, { icon: iconLeft }),
          multiple && hasSelection ? /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: chipsRef,
                className: "flex items-center gap-1 overflow-hidden flex-1 min-w-0",
                style: showGradient ? {
                  maskImage: "linear-gradient(to right, black calc(100% - 24px), transparent)",
                  WebkitMaskImage: "linear-gradient(to right, black calc(100% - 24px), transparent)"
                } : void 0,
                children: allChipValues.slice(0, renderCount).map((val) => {
                  const isExcluded = excluded.includes(val);
                  return /* @__PURE__ */ jsx(
                    Chip,
                    {
                      size: "sm",
                      value: val,
                      state: isExcluded ? "exclude" : void 0,
                      onClose: removeChip,
                      onClick: (e) => e.stopPropagation(),
                      className: "shrink-0",
                      children: isExcluded ? `\u2212 ${optionMap.get(val) ?? val}` : optionMap.get(val) ?? val
                    },
                    `${isExcluded ? "ex-" : ""}${val}`
                  );
                })
              }
            ),
            overflowCount > 0 && /* @__PURE__ */ jsxs(Badge, { appearance: "brand", size: "sm", className: "shrink-0", children: [
              "+",
              overflowCount
            ] })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            showTagRow && tagRow && /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center", children: tagRow }),
            /* @__PURE__ */ jsx("span", { className: cn("flex-1 min-w-0 text-left truncate", !hasSelection && "text-[var(--color-text-muted)]"), children: hasSelection && !multiple ? optionMap.get(selected[0]) ?? selected[0] ?? children : children ?? placeholder })
          ] }),
          showBadge && badge && /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center", children: badge }),
          clearVisible && /* @__PURE__ */ jsx(ClearButton, { onClick: handleClear, visible: true }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "shrink-0 flex items-center justify-center transition-colors duration-200",
                isOpen && "text-[var(--color-brand-primary)]"
              ),
              style: { width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" },
              children: chevron ?? /* @__PURE__ */ jsx(DefaultChevron, { open: isOpen })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Popover, { ref: popoverRef, anchorRef: triggerRef, open: isOpen, id: listboxId, "aria-multiselectable": multiple, children: [
      multiple && hasSelection && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 pb-1 border-b border-[var(--color-divider)] mb-1", children: [
        selected.map((val) => /* @__PURE__ */ jsx(Chip, { size: "sm", value: val, onClose: removeChip, children: optionMap.get(val) ?? val }, val)),
        excluded.map((val) => /* @__PURE__ */ jsx(Chip, { size: "sm", value: val, state: "exclude", onClose: removeChip, children: `\u2212 ${optionMap.get(val) ?? val}` }, `ex-${val}`))
      ] }),
      useStructuredOptions ? optionList.map((opt, i) => {
        const isSelected = selected.includes(opt.value);
        const isExcluded = excluded.includes(opt.value);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            id: `dropdown-opt-${i}`,
            role: "option",
            "aria-selected": isSelected,
            "aria-disabled": opt.disabled || void 0,
            className: cn(
              "flex items-center cursor-pointer rounded-[var(--radius-default)]",
              multiple ? "gap-[var(--space-20)]" : "gap-2",
              "px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)]",
              "hover:bg-[var(--color-surface-3)] transition-colors duration-100",
              i === activeIndex && "bg-[var(--color-surface-3)]",
              opt.disabled && "opacity-50 cursor-not-allowed"
            ),
            onClick: () => !opt.disabled && toggleOption(opt.value),
            children: [
              multiple && /* @__PURE__ */ jsx("span", { className: "pointer-events-none shrink-0 flex items-center", children: /* @__PURE__ */ jsx(Checkbox, { size: "md", checked: isSelected, exclude: isExcluded, onChange: () => {
              } }) }),
              /* @__PURE__ */ jsx("span", { className: cn("flex-1 min-w-0 truncate", isExcluded && "line-through text-[var(--color-text-muted)]"), children: opt.label ?? opt.value }),
              !multiple && isSelected && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center text-[var(--color-brand-primary)]", children: /* @__PURE__ */ jsx(CheckIcon, {}) })
            ]
          },
          opt.value
        );
      }) : items ? items.map(({ onClick, children: itemChildren, ...itemProps }, i) => /* @__PURE__ */ jsx(
        DropdownItem,
        {
          id: `dropdown-opt-${i}`,
          size,
          ...itemProps,
          className: cn(
            "cursor-pointer rounded-[var(--radius-default)] hover:bg-[var(--color-surface-3)] transition-colors duration-100 px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)]",
            i === activeIndex && "bg-[var(--color-surface-3)]",
            itemProps.className
          ),
          onClick: () => {
            onClick?.();
            close();
          },
          role: "option",
          "aria-selected": i === activeIndex,
          children: itemChildren
        },
        i
      )) : children
    ] })
  ] });
});
Dropdown.displayName = "Dropdown";
export {
  Dropdown
};
