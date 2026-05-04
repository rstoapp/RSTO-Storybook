import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CardContent, Typography } from '@mui/material';
import InfoCard from './InfoCard';
import WarningCard from './WarningCard';

const meta: Meta<typeof InfoCard> = {
    title: 'RSTO/Molecules/InfoCard',
    component: InfoCard,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 380 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

export const Default: Story = {
    render: () => (
        <InfoCard>
            <CardContent>
                <Typography variant="body1">
                    This is an InfoCard — used to highlight contextual information with a blue border.
                </Typography>
            </CardContent>
        </InfoCard>
    ),
};

export const Warning: StoryObj<typeof WarningCard> = {
    render: () => (
        <WarningCard>
            <CardContent>
                <Typography variant="body1">
                    This is a WarningCard — used to flag caution states with an orange border.
                </Typography>
            </CardContent>
        </WarningCard>
    ),
};
