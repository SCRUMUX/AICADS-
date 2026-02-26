import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { TableHeaderRow } from "../TableHeaderRow/TableHeaderRow";
import { TableRow } from "../TableRow/TableRow";
import { TableCell } from "../TableCell/TableCell";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
function getWrapperBorder(appearance) {
  if (appearance === "bordered") return "border border-[var(--color-border-strong)]";
  return "border border-[var(--color-border-base)]";
}
const Table = React.forwardRef((props, ref) => {
  const {
    size = "md",
    appearance = "base",
    showCheckboxColumn = false,
    headerCheckbox,
    columns,
    rows,
    getRowKey,
    getRowCheckbox,
    selectedRowKeys,
    disabledRowKeys,
    onRowSelect,
    children,
    className,
    style,
    ...rest
  } = props;
  const headerColumns = columns?.map((col) => ({
    key: col.key,
    label: col.label,
    iconLeft: col.headerIconLeft,
    showIconLeft: !!col.headerIconLeft,
    sort: col.sort ?? "none",
    onSortChange: col.onSortChange
  }));
  return (
    /* Обёртка нужна для overflow-hidden + border-radius, т.к. на <table> они не работают */
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "rounded-[4px] overflow-hidden",
          getWrapperBorder(appearance),
          className
        ),
        style,
        children: /* @__PURE__ */ jsxs(
          "table",
          {
            ref,
            className: cn(
              "border-collapse w-full",
              "bg-[var(--color-surface-1)]",
              /* striped: чётные строки получают surface-2 */
              appearance === "striped" && "[&_tbody_tr:nth-child(even)]:bg-[var(--color-surface-2)]"
            ),
            ...rest,
            children: [
              (columns || headerCheckbox !== void 0) && /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(
                TableHeaderRow,
                {
                  size,
                  showCheckboxColumn,
                  checkbox: headerCheckbox,
                  columns: headerColumns
                }
              ) }),
              rows && columns && /* @__PURE__ */ jsx("tbody", { children: rows.map((row, rowIndex) => {
                const key = getRowKey ? getRowKey(row, rowIndex) : rowIndex;
                const isSelected = selectedRowKeys?.includes(key) ?? false;
                const isDisabled = disabledRowKeys?.includes(key) ?? false;
                const rowCheckbox = getRowCheckbox ? getRowCheckbox(row, rowIndex) : void 0;
                return /* @__PURE__ */ jsx(
                  TableRow,
                  {
                    size,
                    selected: isSelected,
                    disabled: isDisabled,
                    showCheckboxColumn,
                    checkbox: rowCheckbox,
                    onSelect: onRowSelect ? () => onRowSelect(row, key) : void 0,
                    children: columns.map((col) => {
                      const cellContent = col.render ? col.render(row, rowIndex) : String(row[col.key] ?? "");
                      const showBadge = col.cellType === "badge" || col.cellType === "tag";
                      return /* @__PURE__ */ jsx(
                        TableCell,
                        {
                          size,
                          type: col.cellType ?? "text",
                          showIconLeft: !!col.cellIconLeft,
                          iconLeft: col.cellIconLeft,
                          showBadge,
                          badge: showBadge ? cellContent : void 0,
                          style: col.width ? { width: col.width } : void 0,
                          children: !showBadge ? cellContent : null
                        },
                        col.key
                      );
                    })
                  },
                  key
                );
              }) }),
              !rows && children && /* @__PURE__ */ jsx("tbody", { children })
            ]
          }
        )
      }
    )
  );
});
Table.displayName = "Table";
var Table_default = Table;
export {
  Table,
  Table_default as default
};
