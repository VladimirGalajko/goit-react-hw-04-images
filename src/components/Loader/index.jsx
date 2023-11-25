import React from 'react';
import { GridLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <div>
      <GridLoader
        color="#8baa8b"
        size={150}
        cssOverride={{ position: 'absolute', top: '25%', left: '35%' }}
        ariaLabel="grid-loading"
   
      />
    </div>
  );
};


