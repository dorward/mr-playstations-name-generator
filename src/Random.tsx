import React, { useState } from 'react';
import { GiPerspectiveDiceSixFacesOne, GiPerspectiveDiceSixFacesSix } from 'react-icons/gi';
import { Button } from './Button';

export const Random = ({ onClick }: { onClick: (e: React.MouseEvent) => void }): JSX.Element => {
    const [over, setOver] = useState(false);
    return (
        <Button onClick={onClick} onMouseEnter={() => setOver(true)} onMouseLeave={() => setOver(false)}>
            {!over && <GiPerspectiveDiceSixFacesOne />}
            {over && <GiPerspectiveDiceSixFacesSix />}
        </Button>
    );
};
