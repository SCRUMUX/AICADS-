import type { Meta, StoryObj } from '@storybook/react';
import { AppShellBlock } from './AppShellBlock';
import { AppSidebarBlock } from '../AppSidebarBlock';
import { SectionHeader } from '../../../components/primitives/SectionHeader';
import { Card } from '../../../components/primitives/Card';
import { Diagram3Icon } from '../../../components/icons';

const iconStyle = { width: '100%', height: '100%' };
const navIcon = <Diagram3Icon style={iconStyle} />;

const meta: Meta<typeof AppShellBlock> = {
  title: 'Blocks/App/AppShellBlock',
  component: AppShellBlock,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof AppShellBlock>;

export const Dashboard: Story = {
  render: () => (
    <AppShellBlock
      sidebarItems={[
        { id: '1', label: 'Dashboard', icon: navIcon, active: true },
        { id: '2', label: 'Analytics', icon: navIcon },
        { id: '3', label: 'Settings', icon: navIcon },
      ]}
      header={
        <header className="flex items-center gap-[var(--space-24)] px-[var(--space-24)] py-[var(--space-12)] border-b border-[var(--color-border-base)]">
          <SectionHeader size="lg" appearance="base">
            Live Ops Console
          </SectionHeader>
        </header>
      }
    >
      <div className="flex flex-wrap gap-[var(--space-16)] p-[var(--space-24)]">
        <Card variant="outlined" size="md" title="Overview" className="min-w-[var(--space-280)]">
          Metrics summary
        </Card>
        <Card variant="outlined" size="md" title="Activity" className="min-w-[var(--space-280)]">
          Recent events
        </Card>
      </div>
    </AppShellBlock>
  ),
};

export const SidebarOnly: Story = {
  render: () => (
    <AppSidebarBlock
      items={[
        { id: 'a', label: 'Home', icon: navIcon, active: true },
        { id: 'b', label: 'Projects', icon: navIcon },
      ]}
    />
  ),
};
