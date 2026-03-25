import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box, Stack, Typography, useTheme } from '@mui/material';

const SpacingScale = () => {
    const theme = useTheme();
    const steps = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 10, 12];

    return (
        <Stack spacing={2}>
            {steps.map((step) => {
                const px = theme.spacing(step);
                return (
                    <Stack key={step} direction="row" alignItems="center" spacing={3}>
                        <Typography variant="body2" sx={{ width: 110, color: 'text.secondary', fontFamily: 'monospace' }}>
                            spacing({step})
                        </Typography>
                        <Typography variant="body2" sx={{ width: 50, color: 'text.disabled', fontFamily: 'monospace' }}>
                            {px}
                        </Typography>
                        <Box
                            sx={{
                                height: 24,
                                width: px,
                                backgroundColor: 'primary.main',
                                borderRadius: '4px',
                                minWidth: '2px',
                            }}
                        />
                    </Stack>
                );
            })}
        </Stack>
    );
};

const meta: Meta = {
    title: 'RSTO/Foundation/Spacing',
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
    render: () => <SpacingScale />,
};
