'use client';
import * as React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Stack,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import RstoDrawer from '../molecules/RstoDrawer';
import RstoChip from '../molecules/RstoChip';
import DropDownSelector from '../molecules/DropDownSelector';
import InfoCard from '../molecules/InfoCard';
import FieldLabelAndTooltip from '../atoms/FieldLabelAndTooltip';
import RstoTextField from '../atoms/RstoTextField';

export type GoalDrawerMode = 'create' | 'edit';
export type GoalCreationStep = 'indicator-selection' | 'goal-definition';

export interface GoalIndicator {
    id: string;
    title: string;
}

export interface GoalCentre {
    id: string;
    name: string;
}

export interface GoalStrategy {
    acronym: string;
    label: string;
}

export interface GoalFormData {
    centreId: string;
    qualityArea?: string;
    baseline: string;
    ifStatement: string;
    thenStatement: string;
    soThatStatement: string;
}

export interface GoalCreationDrawerProps {
    open: boolean;
    onClose: () => void;
    mode?: GoalDrawerMode;
    qualityIndicators: GoalIndicator[];
    quantityIndicators: GoalIndicator[];
    participationIndicators: GoalIndicator[];
    centres: GoalCentre[];
    /** Quality-area options — shown only when non-empty, for indicators that support them */
    qualityAreas?: string[];
    /** Optional strategy toggle (e.g. Parenting Programs / ECEC) when a provider runs more than one */
    strategies?: GoalStrategy[];
    selectedStrategy?: string;
    onStrategyChange?: (acronym: string) => void;
    initialIndicatorId?: string;
    initialFormData?: Partial<GoalFormData>;
    onSubmit: (payload: { indicatorId: string; formData: GoalFormData }) => void;
    isSubmitting?: boolean;
}

const EMPTY_FORM: GoalFormData = {
    centreId: '',
    qualityArea: '',
    baseline: '',
    ifStatement: '',
    thenStatement: '',
    soThatStatement: '',
};

const StyledIndicatorCard = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
    padding: theme.spacing(2.5),
    borderRadius: '6px',
    marginBottom: theme.spacing(1.5),
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: isSelected ? `2px solid ${theme.palette.rstoBlue._70}` : `2px solid ${theme.palette.rstoGray._40}`,
    backgroundColor: isSelected ? theme.palette.rstoBlue._10 : theme.palette.common.white,
    '&:hover': {
        backgroundColor: isSelected ? theme.palette.rstoBlue._20 : theme.palette.rstoBlue._10,
        borderColor: isSelected ? theme.palette.rstoBlue._80 : theme.palette.rstoBlue._50,
    },
}));

interface IndicatorSectionProps {
    title: string;
    indicators: GoalIndicator[];
    selectedIndicator: string | null;
    onSelect: (id: string) => void;
}

const IndicatorSection: React.FC<IndicatorSectionProps> = ({ title, indicators, selectedIndicator, onSelect }) => {
    const [expanded, setExpanded] = React.useState(true);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded((prev) => !prev)}
            disableGutters
            sx={{ boxShadow: 'none', '&:before': { display: 'none' }, mb: 1 }}
        >
            <AccordionSummary
                expandIcon={null}
                sx={{
                    flexDirection: 'row-reverse',
                    px: 0,
                    '& .MuiAccordionSummary-content': { display: 'flex', alignItems: 'center', gap: 1, margin: 0 },
                }}
            >
                {expanded ? (
                    <ExpandMoreIcon sx={{ mr: 1, color: 'rstoGray._90' }} />
                ) : (
                    <KeyboardArrowRightIcon sx={{ mr: 1, color: 'rstoGray._90' }} />
                )}
                <Typography variant="h6" color="text.secondary" fontWeight={600}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
                {indicators.map((indicator) => (
                    <StyledIndicatorCard
                        key={indicator.id}
                        isSelected={selectedIndicator === indicator.id}
                        onClick={() => onSelect(indicator.id)}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color={selectedIndicator === indicator.id ? 'rstoBlue._70' : 'text.primary'}
                        >
                            {indicator.title}
                        </Typography>
                    </StyledIndicatorCard>
                ))}
                {indicators.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                        No {title.toLowerCase()} indicators available
                    </Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

const GoalCreationDrawer: React.FC<GoalCreationDrawerProps> = ({
    open,
    onClose,
    mode = 'create',
    qualityIndicators,
    quantityIndicators,
    participationIndicators,
    centres,
    qualityAreas = [],
    strategies = [],
    selectedStrategy,
    onStrategyChange,
    initialIndicatorId,
    initialFormData,
    onSubmit,
    isSubmitting = false,
}) => {
    const [step, setStep] = React.useState<GoalCreationStep>(
        mode === 'edit' ? 'goal-definition' : 'indicator-selection'
    );
    const [selectedIndicator, setSelectedIndicator] = React.useState<string | null>(initialIndicatorId ?? null);
    const [formData, setFormData] = React.useState<GoalFormData>({ ...EMPTY_FORM, ...initialFormData });

    const allIndicators = React.useMemo(
        () => [...qualityIndicators, ...quantityIndicators, ...participationIndicators],
        [qualityIndicators, quantityIndicators, participationIndicators]
    );
    const selectedIndicatorData = allIndicators.find((ind) => ind.id === selectedIndicator) ?? null;
    const indicatorCategory = qualityIndicators.some((i) => i.id === selectedIndicator)
        ? 'Quality'
        : quantityIndicators.some((i) => i.id === selectedIndicator)
          ? 'Quantity'
          : 'Participation';

    const handleFieldChange = (field: keyof GoalFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const isFormValid = Boolean(formData.centreId && formData.baseline && formData.soThatStatement);

    const handleClose = () => {
        setStep(mode === 'edit' ? 'goal-definition' : 'indicator-selection');
        setSelectedIndicator(initialIndicatorId ?? null);
        setFormData({ ...EMPTY_FORM, ...initialFormData });
        onClose();
    };

    const handleBack = () => {
        if (mode === 'edit') {
            handleClose();
        } else {
            setStep('indicator-selection');
        }
    };

    const handleSubmit = () => {
        if (!selectedIndicator || !isFormValid) return;
        onSubmit({ indicatorId: selectedIndicator, formData });
    };

    const title = mode === 'edit' ? 'Edit goal' : 'Add goal';

    return (
        <RstoDrawer
            open={open}
            onClose={handleClose}
            title={title}
            icon={<FlagOutlinedIcon sx={{ fontSize: '2rem', color: 'rstoBlue._70' }} />}
            width={600}
            footer={
                step === 'indicator-selection' ? (
                    <Stack direction="row" justifyContent="flex-end" spacing={2}>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setStep('goal-definition')}
                            disabled={!selectedIndicator}
                        >
                            Next
                        </Button>
                    </Stack>
                ) : (
                    <Stack direction="row" justifyContent="space-between">
                        <Button variant="text" color="secondary" onClick={handleBack}>
                            Back
                        </Button>
                        <Stack direction="row" spacing={1}>
                            <Button variant="outlined" color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={!isFormValid || isSubmitting}
                            >
                                {isSubmitting
                                    ? mode === 'edit'
                                        ? 'Updating goal...'
                                        : 'Creating goal...'
                                    : mode === 'edit'
                                      ? 'Update goal'
                                      : 'Add goal'}
                            </Button>
                        </Stack>
                    </Stack>
                )
            }
        >
            {step === 'indicator-selection' && (
                <>
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                        {mode === 'edit' ? 'Confirm or change the indicator' : 'Which indicator would you like to focus on?'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        {mode === 'edit'
                            ? 'The current indicator is selected. You can change it if needed, then click Next to edit the goal details.'
                            : 'Select a dashboard indicator that you want to improve through this goal.'}
                    </Typography>

                    {strategies.length > 1 && (
                        <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                            {strategies.map((strategy) => (
                                <Button
                                    key={strategy.acronym}
                                    variant={selectedStrategy === strategy.acronym ? 'contained' : 'outlined'}
                                    color={selectedStrategy === strategy.acronym ? 'primary' : 'secondary'}
                                    size="large"
                                    onClick={() => onStrategyChange?.(strategy.acronym)}
                                    sx={{ flex: 1, textTransform: 'uppercase', fontWeight: 600 }}
                                >
                                    {strategy.label}
                                </Button>
                            ))}
                        </Stack>
                    )}

                    <IndicatorSection
                        title="Quality"
                        indicators={qualityIndicators}
                        selectedIndicator={selectedIndicator}
                        onSelect={setSelectedIndicator}
                    />
                    <IndicatorSection
                        title="Quantity"
                        indicators={quantityIndicators}
                        selectedIndicator={selectedIndicator}
                        onSelect={setSelectedIndicator}
                    />
                    <IndicatorSection
                        title="Participation"
                        indicators={participationIndicators}
                        selectedIndicator={selectedIndicator}
                        onSelect={setSelectedIndicator}
                    />
                </>
            )}

            {step === 'goal-definition' && selectedIndicatorData && (
                <>
                    <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                        {mode === 'edit' ? 'Edit your goal' : 'Define your goal'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {mode === 'edit'
                            ? 'Update your goal for improving your selected indicator.'
                            : 'Create a clear goal for improving your selected indicator.'}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
                        <RstoChip
                            text={indicatorCategory}
                            size="small"
                            sx={{ backgroundColor: 'rstoBlue._60', color: 'rstoGray.white' }}
                        />
                        <Typography variant="subtitle2">
                            {selectedIndicatorData.title}
                        </Typography>
                    </Stack>

                    <Box sx={{ mb: 4 }}>
                        <FieldLabelAndTooltip label="Centre" />
                        <DropDownSelector
                            value={formData.centreId}
                            onChange={(value) => handleFieldChange('centreId', value || '')}
                            options={centres.map((c) => ({ value: c.id, label: c.name }))}
                            placeholder="Select Centre"
                            startIcon={<LocationOnOutlinedIcon sx={{ color: 'rstoBlue._70' }} />}
                        />
                    </Box>

                    {qualityAreas.length > 0 && (
                        <Box sx={{ mb: 4 }}>
                            <FieldLabelAndTooltip label="Quality Area (Optional)" />
                            <DropDownSelector
                                value={formData.qualityArea ?? ''}
                                onChange={(value) => handleFieldChange('qualityArea', value || '')}
                                options={qualityAreas.map((qa) => ({ value: qa, label: qa }))}
                                placeholder="Select Quality Area"
                                startIcon={<TrackChangesIcon sx={{ color: 'rstoBlue._70' }} />}
                                allowClear
                            />
                        </Box>
                    )}

                    <Box sx={{ mb: 4 }}>
                        <FieldLabelAndTooltip
                            label="Indicator Baseline"
                            tooltip="The current measured state of the indicator you want to improve, e.g. '67% of children are tracking to attend 600+ hours per year'."
                        />
                        <RstoTextField
                            fullWidth
                            placeholder="Insert your baseline here"
                            value={formData.baseline}
                            onChange={(e) => handleFieldChange('baseline', e.target.value)}
                        />
                    </Box>

                    <Stack spacing={2}>
                        <FieldLabelAndTooltip label="Change Statement" sx={{ mb: 0 }} />
                        <InfoCard sx={{ p: 2 }}>
                            <Typography variant="body2">
                                Describe the improvement you want to test using{' '}
                                <strong>IF</strong> (the action) / <strong>THEN</strong> (the expected change) /{' '}
                                <strong>SO THAT</strong> (the indicator you want to improve).
                            </Typography>
                        </InfoCard>

                        <Box>
                            <FieldLabelAndTooltip label="If..." tooltip="Describe the action you will test — something observable you could start doing in the next few weeks." />
                            <RstoTextField
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Describe the condition or action you will take"
                                value={formData.ifStatement}
                                onChange={(e) => handleFieldChange('ifStatement', e.target.value)}
                            />
                        </Box>

                        <Box>
                            <FieldLabelAndTooltip label="Then..." tooltip="Describe what you expect will change as a result — usually a change in behaviour, engagement, or practice." />
                            <RstoTextField
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Describe what you expect to happen as a result"
                                value={formData.thenStatement}
                                onChange={(e) => handleFieldChange('thenStatement', e.target.value)}
                            />
                        </Box>

                        <Box>
                            <FieldLabelAndTooltip
                                label="So that..."
                                tooltip="Describe how the indicator will improve if the change works. This becomes the title of your improvement goal."
                                required
                            />
                            <RstoTextField
                                fullWidth
                                multiline
                                rows={2}
                                placeholder="Describe the ultimate outcome or benefit"
                                value={formData.soThatStatement}
                                onChange={(e) => handleFieldChange('soThatStatement', e.target.value)}
                                required
                            />
                        </Box>
                    </Stack>
                </>
            )}
        </RstoDrawer>
    );
};

export default GoalCreationDrawer;
