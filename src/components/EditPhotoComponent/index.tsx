import React from 'react';

type EditPhotoComponentProps = {
    photoSrc: string;
    photoAlt: string;
};

const EditPhotoComponent = ({
    photoSrc,
    photoAlt,
}: EditPhotoComponentProps) => {
    return (
        <div>
            <img src={photoSrc} alt={photoAlt} />
        </div>
    );
};

export default EditPhotoComponent;
