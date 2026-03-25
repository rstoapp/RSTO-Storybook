import { PropsWithChildren } from 'react';
import styles from './AspectRatio.module.css';

type AspectRatioProps = { width: number; height: number };

const AspectRatio = ({ width, height, children }: PropsWithChildren<AspectRatioProps>) => {
    const paddingBottom = `${Math.round((height / width) * 100)}%`;
    return (
        <div className={styles.aspectRatio} style={{ paddingBottom }}>
            <div>{children}</div>
        </div>
    );
};

export default AspectRatio;
export type { AspectRatioProps };
