import React from 'react';

const MyContainer = ({children, className}) => {
    return (
        <div className='px-4'>
            <div className={`container mx-auto ${className}`}>
                {children}
            </div>
        </div>
    );
};

export default MyContainer;