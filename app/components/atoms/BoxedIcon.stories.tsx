import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BoxedIcon from './BoxedIcon';

const meta = {
    title: 'RSTO/Atoms/BoxedIcon',
    component: BoxedIcon,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        a11y: {
            config: {
                rules: [
                    { id: 'color-contrast', enabled: true },
                ],
            },
        },
        viewport: {
            viewports: {
                mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
                tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
                desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
            },
        },
        docs: {
            description: {
                component: `
**BoxedIcon** — a 48×48 rounded container for MUI icons.

Used as a visual badge/icon wrapper in cards and list items. Accepts all MUI \`Box\` props
for colour customisation via \`sx\`. The default surface is transparent; pair with a token
background (e.g. \`rstoOrange._10\`, \`rstoBlue._10\`) and matching icon colour to apply
semantic tinting.
                `,
            },
        },
    },
} satisfies Meta<typeof BoxedIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — transparent surface, info-coloured icon. */
export const Default: Story = {
    render: () => (
        <BoxedIcon>
            <DescriptionOutlinedIcon color="info" fontSize="large" />
        </BoxedIcon>
    ),
};

/** Orange surface — used in charts/data sections. */
export const OrangeSurface: Story = {
    render: () => (
        <BoxedIcon sx={{ bgcolor: 'rstoOrange._10' }}>
            <BarChartOutlinedIcon sx={{ color: 'rstoOrange._70' }} fontSize="large" />
        </BoxedIcon>
    ),
};

/** Blue surface — used in folder/navigation contexts. */
export const BlueSurface: Story = {
    render: () => (
        <BoxedIcon sx={{ bgcolor: 'rstoBlue._10' }}>
            <FolderOutlinedIcon sx={{ color: 'rstoBlue._70' }} fontSize="large" />
        </BoxedIcon>
    ),
};

/** Green surface — used for education/goal contexts. */
export const GreenSurface: Story = {
    render: () => (
        <BoxedIcon sx={{ bgcolor: 'rstoGreen._10' }}>
            <SchoolOutlinedIcon sx={{ color: 'rstoGreen._70' }} fontSize="large" />
        </BoxedIcon>
    ),
};
