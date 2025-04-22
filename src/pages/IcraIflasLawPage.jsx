import React from 'react';
import WorkArea from '../components/WorkArea';
import workAreasData from '../data/workAreas';

const IcraIflasLawPage = () => {
  // workAreasData'dan "icra-iflas" alanına ait verileri al
  const icraIflasLawData = workAreasData["icra-iflas"];
  
  return <WorkArea workAreaData={icraIflasLawData} />;
};

export default IcraIflasLawPage; 