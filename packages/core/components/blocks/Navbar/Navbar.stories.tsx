import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import type { NavbarUserMenuItem } from './Navbar.types';
import { AicaIcon, BellIcon } from '../../icons';
import { Avatar } from '../../primitives/Avatar/Avatar';
import { Autocomplete } from '../../primitives/Autocomplete/Autocomplete';

const Logo = () => (
  <div className="flex items-center gap-[var(--space-8)]">
    <AicaIcon size={28} />
    <span className="text-style-heading-sm text-[var(--color-text-primary)]">Logo</span>
  </div>
);

const navItems = ['Dashboard', 'Projects', 'Analytics', 'Settings'];

const searchOptions = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'projects', label: 'Projects' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'settings', label: 'Settings' },
  { value: 'users', label: 'Users' },
];

const NotifBell = () => (
  <button
    className="flex items-center justify-center w-[var(--space-36)] h-[var(--space-36)] rounded-[var(--radius-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] transition-colors"
    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    aria-label="Notifications"
  >
    <BellIcon size={20} />
  </button>
);

const userMenuItems: NavbarUserMenuItem[] = [
  { label: 'Profile', onClick: () => console.log('Profile') },
  { label: 'Settings', onClick: () => console.log('Settings') },
  { label: 'Sign out', onClick: () => console.log('Sign out') },
];

const meta: Meta<typeof Navbar> = {
  title: 'Blocks/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    size: 'default',
    logo: <Logo />,
    nav: navItems,
    search: (
      <Autocomplete
        size="sm"
        placeholder="Search…"
        options={searchOptions}
      />
    ),
    notifications: <NotifBell />,
    avatar: <Avatar size="sm" variant="registered-no-photo" initials="JD" />,
    username: 'John Doe',
    userMenuItems,
    activeIndex: 0,
  },
};

export const Compact: Story = {
  args: {
    ...Default.args,
    size: 'compact',
  },
};

export const WithoutSearch: Story = {
  name: 'Without Search',
  args: {
    ...Default.args,
    search: undefined,
  },
};

export const WithoutNav: Story = {
  name: 'Without Navigation',
  args: {
    ...Default.args,
    nav: undefined,
  },
};

export const Anonymous: Story = {
  name: 'Anonymous (no user)',
  args: {
    size: 'default',
    logo: <Logo />,
    nav: navItems,
    search: (
      <Autocomplete
        size="sm"
        placeholder="Search…"
        options={searchOptions}
      />
    ),
    activeIndex: 0,
  },
};

export const WithPhoto: Story = {
  name: 'User with Photo',
  args: {
    ...Default.args,
    avatar: (
      <Avatar
        size="sm"
        variant="registered-with-photo"
        src="https://i.pravatar.cc/64?img=12"
      />
    ),
    username: 'Alice Smith',
  },
};

export const Sticky: Story = {
  args: {
    ...Default.args,
    sticky: true,
  },
  decorators: [
    (Story) => (
      <div style={{ height: 1200 }}>
        <Story />
        <div className="p-[var(--space-24)]">
          <p className="text-style-body text-[var(--color-text-secondary)]">
            Scroll down to test sticky behavior.
          </p>
          <div style={{ height: 1000 }} />
        </div>
      </div>
    ),
  ],
};

export const CenteredNav: Story = {
  name: 'Centered Navigation',
  args: {
    ...Default.args,
    centerNav: true,
    search: undefined,
  },
};

const MobileMenuContent = () => (
  <div className="flex flex-col gap-[var(--space-8)]">
    {navItems.map((item) => (
      <a
        key={item}
        href="#"
        className="text-style-body text-[var(--color-text-primary)] py-[var(--space-8)] px-[var(--space-12)] rounded-[var(--radius-default)] hover:bg-[var(--color-surface-2)]"
        style={{ textDecoration: 'none' }}
      >
        {item}
      </a>
    ))}
    <div className="border-t border-t-[var(--color-border-base)] pt-[var(--space-8)] mt-[var(--space-4)]">
      <Autocomplete size="sm" placeholder="Search…" options={searchOptions} />
    </div>
  </div>
);

const MobileDemo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ maxWidth: 375, border: '1px solid var(--color-border-base)', borderRadius: 'var(--radius-default)' }}>
      <Navbar
        size="compact"
        logo={<Logo />}
        notifications={<NotifBell />}
        avatar={<Avatar size="xs" variant="registered-no-photo" initials="JD" />}
        onMobileMenuToggle={() => setOpen(!open)}
        mobileMenuOpen={open}
        mobileMenu={<MobileMenuContent />}
      />
    </div>
  );
};

export const Mobile: Story = {
  name: 'Mobile (with burger)',
  render: () => <MobileDemo />,
};
