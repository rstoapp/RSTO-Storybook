import * as React from 'react';
import RstoChip from './RstoChip';

export type PublicationStatus = 'PUBLISHED' | 'DRAFT';

export interface PublishedStatusChipProps {
    status: PublicationStatus;
}

/**
 * Displays a publication status badge. Maps PUBLISHED → primary (teal) and
 * DRAFT → secondary (orange). The production version is store-connected; this
 * Storybook version is fully prop-driven.
 */
const PublishedStatusChip = ({ status }: PublishedStatusChipProps) => {
    return (
        <RstoChip
            text={status === 'PUBLISHED' ? 'Published' : 'Draft'}
            color={status === 'PUBLISHED' ? 'primary' : 'secondary'}
        />
    );
};

export default PublishedStatusChip;
