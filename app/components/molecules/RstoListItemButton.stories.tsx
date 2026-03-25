import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { List, ListItemText } from '@mui/material';
import RstoListItemButton from './RstoListItemButton';

const meta: Meta<typeof RstoListItemButton> = {
    title: 'RSTO/Molecules/RstoListItemButton',
    component: RstoListItemButton,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'Base styled list item button used across all RSTO navigation lists. Add the `.nested` class for the left-border behaviour used in indicator index lists.',
            },
        },
    },
    decorators: [(Story) => <List disablePadding sx={{ width: 280 }}><Story /></List>],
};

export default meta;
type Story = StoryObj<typeof RstoListItemButton>;

export const Default: Story = {
    name: 'Default',
    render: () => (
        <RstoListItemButton>
            <ListItemText primary="Dashboard" />
        </RstoListItemButton>
    ),
};

export const Selected: Story = {
    name: 'Selected',
    render: () => (
        <RstoListItemButton selected>
            <ListItemText primary="Dashboard" />
        </RstoListItemButton>
    ),
};

export const Nested: Story = {
    name: 'Nested (left-border variant)',
    render: () => (
        <>
            <RstoListItemButton className="nested">
                <ListItemText primary="QL1 — Continuity of midwife" secondary="Not selected" />
            </RstoListItemButton>
            <RstoListItemButton className="nested" selected>
                <ListItemText primary="QL2 — Complete routine records" secondary="Selected" />
            </RstoListItemButton>
        </>
    ),
};
