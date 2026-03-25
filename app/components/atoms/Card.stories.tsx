import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardContent, Typography } from '@mui/material';

const meta: Meta<typeof Card> = {
    title: 'RSTO/Atoms/Card',
    component: Card,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 320 }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        variant: {
            control: 'select',
            options: ['outlined', 'elevation'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    render: (args) => (
        <Card {...args}>
            <CardContent>
                <Typography variant="h6">Card title</Typography>
                <Typography variant="body2" color="text.secondary">
                    Card content goes here. This is how data cards look in the RSTO app.
                </Typography>
            </CardContent>
        </Card>
    ),
};

export const Elevated: Story = {
    args: { variant: 'elevation' },
    render: (args) => (
        <Card {...args}>
            <CardContent>
                <Typography variant="h6">Elevated card</Typography>
                <Typography variant="body2" color="text.secondary">
                    This variant has a subtle drop shadow.
                </Typography>
            </CardContent>
        </Card>
    ),
};
