import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Button } from "../Button/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_CONFIG = {
  sm: { gap: "gap-[var(--space-4)]", btnSize: "w-7 h-7", iconSize: 16 },
  md: { gap: "gap-[var(--space-6)]", btnSize: "w-8 h-8", iconSize: 20 },
  lg: { gap: "gap-[var(--space-8)]", btnSize: "w-10 h-10", iconSize: 24 }
};
function getActiveAppearance(appearance) {
  return appearance;
}
const NavButton = ({ direction, size, disabled, onClick }) => {
  const { btnSize, iconSize } = SIZE_CONFIG[size];
  const Icon = direction === "prev" ? ChevronLeftIcon : ChevronRightIcon;
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      disabled,
      onClick,
      "aria-label": direction === "prev" ? "Previous page" : "Next page",
      className: cn(
        "inline-flex items-center justify-center shrink-0 rounded-[2px]",
        "transition-colors duration-150",
        "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]",
        "disabled:opacity-[var(--opacity-disabled)] disabled:cursor-not-allowed disabled:pointer-events-none",
        btnSize
      ),
      children: /* @__PURE__ */ jsx(Icon, { size: iconSize })
    }
  );
};
const Pagination = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    appearance = "brand",
    variant = "with-numbers",
    currentPage: controlledPage,
    totalPages = 5,
    onPageChange,
    onPrev,
    onNext,
    pageWindowSize = 3,
    className,
    ...rest
  } = props;
  const [internalPage, setInternalPage] = useState(1);
  const currentPage = controlledPage ?? internalPage;
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    if (controlledPage === void 0) setInternalPage(page);
    onPageChange?.(page);
  };
  const handlePrev = () => {
    handlePageChange(currentPage - 1);
    onPrev?.();
  };
  const handleNext = () => {
    handlePageChange(currentPage + 1);
    onNext?.();
  };
  const { gap } = SIZE_CONFIG[size];
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;
  const getPageWindow = () => {
    const half = Math.floor(pageWindowSize / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + pageWindowSize - 1);
    start = Math.max(1, end - pageWindowSize + 1);
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      ref,
      "aria-label": "pagination",
      className: cn("inline-flex flex-row items-center", gap, className),
      ...rest,
      children: [
        /* @__PURE__ */ jsx(
          NavButton,
          {
            direction: "prev",
            size,
            disabled: isPrevDisabled,
            onClick: handlePrev
          }
        ),
        variant === "with-numbers" && /* @__PURE__ */ jsx(Fragment, { children: getPageWindow().map((page) => {
          const isActive = page === currentPage;
          return /* @__PURE__ */ jsx(
            Button,
            {
              size,
              appearance: isActive ? getActiveAppearance(appearance) : "ghost",
              onClick: () => handlePageChange(page),
              "aria-label": `Page ${page}`,
              "aria-current": isActive ? "page" : void 0,
              children: String(page)
            },
            page
          );
        }) }),
        variant === "compact" && /* @__PURE__ */ jsxs(
          "span",
          {
            className: "text-style-caption-xs font-medium text-[var(--color-text-primary)] select-none whitespace-nowrap",
            children: [
              currentPage,
              " / ",
              totalPages
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          NavButton,
          {
            direction: "next",
            size,
            disabled: isNextDisabled,
            onClick: handleNext
          }
        )
      ]
    }
  );
});
Pagination.displayName = "Pagination";
export {
  Pagination
};
