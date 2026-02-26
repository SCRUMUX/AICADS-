import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, Toaster, toast } from './Toast';
import type { ToastAppearance } from './Toast.types';
import { Button } from '../Button/Button';

const InfoIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9v4M10 7h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckCircle: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarningIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3L2 17h16L10 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10 8v4M10 14h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof Toast> = {
  title: 'Primitives/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component:
          '`Toast` — transient notification. Appearances: info, success, warning, danger. Auto-dismisses after a configurable duration. Use `Toaster` + `toast()` for imperative API.',
      },
    },
  },
  argTypes: {
    appearance: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title:      { control: 'text' },
    description:{ control: 'text' },
    showClose:  { control: 'boolean' },
    duration:   { control: 'number' },
    open:       { control: 'boolean' },
    icon:       { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    appearance: 'info',
    title: 'Information',
    description: 'This is an informational notification.',
    showClose: true,
    open: true,
    duration: 0,
    icon: <InfoIcon />,
  },
};

export const AllAppearances: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {([
        { appearance: 'info' as const, title: 'Info', desc: 'Something happened.', icon: <InfoIcon /> },
        { appearance: 'success' as const, title: 'Success', desc: 'Operation completed.', icon: <CheckCircle /> },
        { appearance: 'warning' as const, title: 'Warning', desc: 'Please review this.', icon: <WarningIcon /> },
        { appearance: 'danger' as const, title: 'Error', desc: 'Something went wrong.', icon: <WarningIcon /> },
      ]).map((t) => (
        <Toast
          key={t.appearance}
          appearance={t.appearance}
          title={t.title}
          description={t.desc}
          icon={t.icon}
          showClose
          duration={0}
          onClose={() => {}}
        />
      ))}
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    appearance: 'success',
    title: 'Saved',
    description: 'Your changes have been saved.',
    showClose: true,
    open: true,
    duration: 0,
  },
};

export const TitleOnly: Story = {
  args: {
    appearance: 'warning',
    title: 'Connection lost',
    showClose: true,
    open: true,
    duration: 0,
    icon: <WarningIcon />,
  },
};

export const ImperativeAPI: Story = {
  render: () => {
    const appearances: ToastAppearance[] = ['info', 'success', 'warning', 'danger'];
    const icons = { info: <InfoIcon />, success: <CheckCircle />, warning: <WarningIcon />, danger: <WarningIcon /> };
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Toaster position="top-right" />
        {appearances.map((a) => (
          <Button
            key={a}
            appearance="base"
            size="sm"
            onClick={() =>
              toast({
                appearance: a,
                title: `${a.charAt(0).toUpperCase() + a.slice(1)} toast`,
                description: `This is a ${a} notification.`,
                icon: icons[a],
                showClose: true,
                duration: 4000,
              })
            }
          >
            Show {a}
          </Button>
        ))}
      </div>
    );
  },
};
