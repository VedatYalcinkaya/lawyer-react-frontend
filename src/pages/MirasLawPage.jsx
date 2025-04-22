import React from 'react';
import WorkArea from '../components/WorkArea';
import workAreasData from '../data/workAreas';

const MirasLawPage = () => {
  // workAreasData'dan "miras" alanına ait verileri al
  const mirasLawData = workAreasData["miras"];
  
  return <WorkArea workAreaData={mirasLawData} />;
};

export default MirasLawPage; 