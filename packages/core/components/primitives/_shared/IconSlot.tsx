/**
 * Shared IconSlot — обёртка для иконок в компонентах.
 * Масштабирует SVG до 100%×100% контейнера, применяет currentColor.
 * Поддерживает per-icon hover через hoverColor prop.
 */
import React, { useState } from 'react';

interface IconSlotProps {
  icon: React.ReactNode;
  color?: string;
  /** Цвет при наведении на эту конкретную иконку. Если не задан — ховер-эффекта нет. */
  hoverColor?: string;
  /** CSS переменная или пиксельное значение, default: var(--icon-size, 20px) */
  size?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const IconSlotInner: React.FC<IconSlotProps> = ({
  icon,
  color = 'var(--icon-color, currentColor)',
  hoverColor,
  size = 'var(--icon-size, 20px)',
  className = '',
  onClick,
}) => {
  if (!icon) return null;

  const [hovered, setHovered] = useState(false);
  const effectiveColor = hovered && hoverColor ? hoverColor : color;

  const cloned = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ style?: React.CSSProperties }>, {
        style: { width: '100%', height: '100%' },
      })
    : icon;

  return (
    <span
      className={`shrink-0 flex items-center justify-center transition-colors duration-200 ${className}`}
      style={{ color: effectiveColor, width: size, height: size }}
      onMouseEnter={hoverColor ? () => setHovered(true) : undefined}
      onMouseLeave={hoverColor ? () => setHovered(false) : undefined}
      onClick={onClick}
    >
      {cloned}
    </span>
  );
};

export const IconSlot = React.memo(IconSlotInner);
