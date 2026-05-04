import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import PPServiceDashboard from './PPServiceDashboard';
import {
    MOCK_PARTICIPATION_DATA,
    MOCK_SA_DATA,
    MOCK_PARTICIPATION_BY_POPULATION,
    PRIORITY_POPULATIONS,
} from '../../lib/pp-service-types';

const meta: Meta<typeof PPServiceDashboard> = {
    title: 'RSTO/Organisms/PPServiceDashboard',
    component: PPServiceDashboard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        populationOptions: PRIORITY_POPULATIONS,
        selectedPopulation: 'all',
        onPopulationChange: () => {},
    },
};

export default meta;
type Story = StoryObj<typeof PPServiceDashboard>;

export const Populated: Story = {
    name: 'Populated — all families',
    render: () => {
        const [population, setPopulation] = useState('all');
        return (
            <PPServiceDashboard
                state="populated"
                populationOptions={PRIORITY_POPULATIONS}
                selectedPopulation={population}
                participationData={MOCK_PARTICIPATION_BY_POPULATION[population]}
                saData={MOCK_SA_DATA}
                onPopulationChange={setPopulation}
            />
        );
    },
};

export const Loading: Story = {
    name: 'Loading',
    args: {
        state: 'loading',
    },
};

export const Empty: Story = {
    name: 'Empty — no data submitted',
    args: {
        state: 'empty',
    },
};

export const Error: Story = {
    name: 'Error',
    args: {
        state: 'error',
        errorMessage: 'Failed to load participation data. Please try again later.',
    },
};
