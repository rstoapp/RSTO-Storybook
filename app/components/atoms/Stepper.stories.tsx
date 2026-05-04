import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import {
    Stepper, Step, StepLabel, StepContent,
    Button, Box, Typography, Paper,
} from '@mui/material';

const meta: Meta<typeof Stepper> = {
    title: 'RSTO/Atoms/Stepper',
    component: Stepper,
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
        alternativeLabel: { control: 'boolean' },
        nonLinear: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const horizontalSteps = ['Select service type', 'Assign provider', 'Review & confirm'];

export const Horizontal: Story = {
    render: () => {
        const [activeStep, setActiveStep] = useState(1);
        return (
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {horizontalSteps.map((label) => (
                        <Step key={label}><StepLabel>{label}</StepLabel></Step>
                    ))}
                </Stepper>
                <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                    <Button disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        disabled={activeStep === horizontalSteps.length - 1}
                        onClick={() => setActiveStep((s) => s + 1)}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        );
    },
};

export const AlternativeLabel: Story = {
    render: () => (
        <Stepper activeStep={1} alternativeLabel>
            {horizontalSteps.map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
        </Stepper>
    ),
};

const verticalSteps = [
    { label: 'Identify family', description: 'Confirm family ID and primary contact details.' },
    { label: 'Assess needs', description: 'Complete the structured needs assessment form.' },
    { label: 'Assign support plan', description: 'Select and confirm the appropriate support plan.' },
];

export const Vertical: Story = {
    render: () => {
        const [activeStep, setActiveStep] = useState(0);
        return (
            <Box sx={{ maxWidth: 420 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {verticalSteps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                                <Typography variant="body2">{step.description}</Typography>
                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => setActiveStep((s) => s + 1)}
                                        disabled={index === verticalSteps.length - 1}
                                    >
                                        Continue
                                    </Button>
                                    <Button size="small" disabled={index === 0} onClick={() => setActiveStep((s) => s - 1)}>
                                        Back
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === verticalSteps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed.</Typography>
                        <Button onClick={() => setActiveStep(0)} sx={{ mt: 1 }}>Reset</Button>
                    </Paper>
                )}
            </Box>
        );
    },
};
