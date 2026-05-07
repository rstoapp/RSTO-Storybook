import { Link, LinkProps } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export interface RstoLinkProps extends LinkProps {
    text: string;
}

/**
 * A styled MUI Link — caption weight, RSTO blue, no underline.
 * Use for inline action links such as "Download transformed data".
 */
const RstoLink = ({ text, ...props }: RstoLinkProps) => {
    return (
        <Link {...props} sx={{ textDecoration: 'none', ...props.sx }}>
            <Typography variant="caption" display="block" fontWeight={600} color="rstoBlue._70">
                {text}
            </Typography>
        </Link>
    );
};

export default RstoLink;
