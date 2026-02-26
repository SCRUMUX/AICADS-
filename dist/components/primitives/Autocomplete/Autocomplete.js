import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useEffect, useRef, useId, useMemo } from "react";
import { cn, findClasses } from "../_shared";
import { ClearButton } from "../_shared/ClearButton";
import { Popover } from "../_shared/Popover";
import { Chip } from "../Chip/Chip";
import { Checkbox } from "../Checkbox/Checkbox";
import { Badge } from "../Badge/Badge";
import { Spinner } from "../Spinner/Spinner";
import { AutocompleteItem } from "../AutocompleteItem/AutocompleteItem";
import { useControllableState } from "../../../hooks/useControllableState";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { usePopoverState } from "../../../hooks/usePopoverState";
import { useOverflowCounter } from "../../../hooks/useOverflowCounter";
import { mergeRefs } from "../../../hooks/mergeRefs";
import contract from "../../../contracts/components/Autocomplete.contract.json";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "!px-[var(--space-button-x-sm)] !py-[var(--space-button-y-sm)] !min-h-[var(--space-28)] min-w-[var(--space-container-compact-min)] !gap-[var(--space-button-gap-sm)] text-style-caption rounded-[var(--radius-default)] [--icon-size:20px]",
  md: "!px-[var(--space-button-x-md)] !py-[var(--space-button-y-md)] !min-h-[var(--space-36)] min-w-[var(--space-container-content-min)] !gap-[var(--space-button-gap-md)] text-style-body rounded-[var(--radius-default)] [--icon-size:20px]",
  lg: "!px-[var(--space-button-x-lg)] !py-[var(--space-button-y-lg)] !min-h-[var(--space-40)] min-w-[var(--space-container-content-min)] !gap-[var(--space-button-gap-lg)] text-style-body-lg rounded-[var(--radius-default)] [--icon-size:24px]"
};
const SearchIcon = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: [
  /* @__PURE__ */ jsx("circle", { cx: "9", cy: "9", r: "5.5", stroke: "currentColor", strokeWidth: "1.5" }),
  /* @__PURE__ */ jsx("path", { d: "M13 13l3.5 3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
] });
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8.5L6.5 11.5L12.5 5.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
function defaultFilter(opt, query) {
  const label = (opt.label ?? opt.value).toLowerCase();
  return label.includes(query.toLowerCase());
}
const Autocomplete = React.forwardRef((props, ref) => {
  const {
    state = "closed",
    size = "sm",
    appearance,
    searchIcon,
    tagRow,
    clearIcon,
    showTagRow = false,
    showClearIcon = false,
    placeholder = "Search...",
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
    inputValue: inputValueProp,
    onInputChange,
    filterFn = defaultFilter,
    minLength = 0,
    loading = false,
    noResultsMessage = "No results found",
    disabled = false,
    "aria-label": ariaLabel,
    onOpenChange,
    fullWidth = false,
    children,
    className,
    ...rest
  } = props;
  if (true) {
    if (tagRow !== void 0) console.warn("[Autocomplete] `tagRow` is deprecated. Use `multiple` + `options` API instead.");
    if (clearIcon !== void 0) console.warn("[Autocomplete] `clearIcon` is deprecated. Use structured `options` API with `showClearButton`.");
    if (showTagRow) console.warn("[Autocomplete] `showTagRow` is deprecated. Use `multiple` + `options` API instead.");
    if (props.maxVisibleChips !== void 0) console.warn("[Autocomplete] `maxVisibleChips` is deprecated. Chips now dynamically fill available width.");
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
  const allChipValues = useMemo(() => [...selected, ...excluded], [selected, excluded]);
  const [internalQuery, setInternalQuery] = useState("");
  const query = inputValueProp ?? internalQuery;
  const setQuery = useCallback(
    (v) => {
      if (inputValueProp === void 0) setInternalQuery(v);
      onInputChange?.(v);
    },
    [inputValueProp, onInputChange]
  );
  const { isOpen, open: openInternal, close: closeInternal, setIsOpen } = usePopoverState({
    defaultOpen: state === "open",
    onOpenChange,
    disabled
  });
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const inputRef = useRef(null);
  const chipsRef = useRef(null);
  const mergedRef = mergeRefs(ref, containerRef);
  const optionList = options ?? [];
  const filteredOptions = useMemo(() => {
    if (optionList.length === 0) return [];
    if (!query) return optionList;
    return optionList.filter((o) => filterFn(o, query));
  }, [optionList, query, filterFn]);
  const effectiveItemCount = items?.length ?? filteredOptions.length;
  const { renderCount, overflowCount, showGradient } = useOverflowCounter(chipsRef, allChipValues.length);
  const close = useCallback(() => {
    closeInternal();
    setActiveIndex(-1);
  }, [closeInternal]);
  const openPopover = useCallback(() => {
    if (query.length >= minLength) {
      openInternal();
    }
  }, [minLength, query, openInternal]);
  useClickOutside(containerRef, close, isOpen);
  useEscapeKey(close, isOpen);
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);
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
        setQuery("");
        close();
      }
    },
    [multiple, allowExclude, selected, excluded, setSelected, setExcluded, setQuery, close]
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
  const handleClear = useCallback(() => {
    setQuery("");
    setSelected([]);
    setExcluded([]);
    inputRef.current?.focus();
  }, [setQuery, setSelected]);
  const handleInputChange = useCallback(
    (e) => {
      const val = e.target.value;
      setQuery(val);
      if (!isOpen && val.length >= minLength) {
        setIsOpen(true);
      }
      setActiveIndex(0);
    },
    [setQuery, isOpen, minLength, setIsOpen]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          openPopover();
        }
        return;
      }
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => (i + 1) % effectiveItemCount);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => (i - 1 + effectiveItemCount) % effectiveItemCount);
          break;
        case "Home":
          e.preventDefault();
          setActiveIndex(0);
          break;
        case "End":
          e.preventDefault();
          setActiveIndex(effectiveItemCount - 1);
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0) {
            if (filteredOptions.length > 0) {
              const opt = filteredOptions[activeIndex];
              if (opt && !opt.disabled) toggleOption(opt.value);
            } else if (items?.[activeIndex]) {
              items[activeIndex].onClick?.();
              close();
            }
          }
          break;
        case "Backspace":
          if (multiple && query === "" && selected.length > 0) {
            removeChip(selected[selected.length - 1]);
          }
          break;
      }
    },
    [isOpen, activeIndex, effectiveItemCount, filteredOptions, items, multiple, query, selected, openPopover, close, toggleOption, removeChip]
  );
  useEffect(() => {
    if (activeIndex < 0 || !popoverRef.current) return;
    const el = popoverRef.current.querySelector(`[data-index="${activeIndex}"]`);
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
  const singleLabel = !multiple && selected.length > 0 ? optionMap.get(selected[0]) ?? selected[0] : "";
  const showClear = (showClearIcon || query.length > 0 || allChipValues.length > 0) && !disabled;
  return /* @__PURE__ */ jsxs("div", { ref: mergedRef, className: cn("relative", fullWidth && "w-full !min-w-0 !max-w-none", className), ...rest, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: triggerRef,
        className: cn(
          "transition-colors duration-150 font-base box-border flex flex-row items-center overflow-hidden w-full",
          SIZE_CLASSES[size],
          ...vc,
          !disabled && !isOpen && focusRing,
          disabled ? "cursor-not-allowed opacity-[var(--opacity-disabled)]" : isOpen ? "cursor-text" : "cursor-pointer select-none",
          fullWidth && "!min-w-0 !max-w-none"
        ),
        style: fullWidth ? { maxWidth: "none", minWidth: 0 } : void 0,
        onClick: () => {
          openPopover();
          inputRef.current?.focus();
        },
        onKeyDown: handleKeyDown,
        role: "combobox",
        tabIndex: disabled ? -1 : 0,
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox",
        "aria-controls": isOpen ? listboxId : void 0,
        "aria-activedescendant": activeIndex >= 0 ? `ac-opt-${activeIndex}` : void 0,
        "aria-label": ariaLabel,
        "aria-autocomplete": "list",
        children: [
          /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center text-[var(--color-text-muted)]", style: { width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: searchIcon ?? /* @__PURE__ */ jsx(SearchIcon, {}) }),
          !isOpen && multiple && allChipValues.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex items-center gap-1", children: [
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
          ] }) : !isOpen && !multiple && singleLabel ? /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0 truncate text-[var(--color-text-primary)]", children: singleLabel }) : !isOpen ? /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0 text-left truncate text-[var(--color-text-muted)]", children: placeholder }) : null,
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              className: cn(
                "bg-transparent outline-none text-[inherit] font-[inherit] leading-[inherit] placeholder:text-[var(--color-text-muted)]",
                isOpen ? "flex-1 min-w-[40px] cursor-text" : "sr-only"
              ),
              placeholder,
              value: query,
              onChange: handleInputChange,
              disabled,
              "aria-label": ariaLabel,
              tabIndex: isOpen ? 0 : -1
            }
          ),
          loading && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center", style: { width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: /* @__PURE__ */ jsx(Spinner, { size: "xs", appearance: "brand" }) }),
          showClear && !loading && /* @__PURE__ */ jsx(ClearButton, { onClick: handleClear, visible: true })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Popover, { ref: popoverRef, anchorRef: triggerRef, open: isOpen, id: listboxId, "aria-multiselectable": multiple, children: [
      multiple && allChipValues.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 pb-1 border-b border-[var(--color-divider)] mb-1", children: [
        selected.map((val) => /* @__PURE__ */ jsx(Chip, { size: "sm", value: val, onClose: removeChip, children: optionMap.get(val) ?? val }, val)),
        excluded.map((val) => /* @__PURE__ */ jsx(Chip, { size: "sm", value: val, state: "exclude", onClose: removeChip, children: `\u2212 ${optionMap.get(val) ?? val}` }, `ex-${val}`))
      ] }),
      loading && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-4 text-[var(--color-text-muted)]", children: [
        /* @__PURE__ */ jsx(Spinner, { size: "xs", appearance: "brand" }),
        /* @__PURE__ */ jsx("span", { className: "ml-2 text-style-body-sm", children: "Loading..." })
      ] }),
      !loading && effectiveItemCount === 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-4 text-[var(--color-text-muted)] text-style-body-sm", children: noResultsMessage }),
      !loading && filteredOptions.length > 0 && filteredOptions.map((opt, i) => {
        const isSelected = selected.includes(opt.value);
        const isExcluded = excluded.includes(opt.value);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            id: `ac-opt-${i}`,
            "data-index": i,
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
      }),
      !loading && items && filteredOptions.length === 0 && items.map(({ onClick, children: itemChildren, ...itemProps }, i) => /* @__PURE__ */ jsx(
        AutocompleteItem,
        {
          id: `ac-opt-${i}`,
          size,
          ...itemProps,
          className: cn(
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
      )),
      !loading && !items && filteredOptions.length === 0 && children
    ] })
  ] });
});
Autocomplete.displayName = "Autocomplete";
export {
  Autocomplete
};
