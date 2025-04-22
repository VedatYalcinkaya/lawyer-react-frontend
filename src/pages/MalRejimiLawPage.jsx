import React from 'react';
import WorkArea from '../components/WorkArea';
import workAreasData from '../data/workAreas';

const MalRejimiLawPage = () => {
  // workAreasData'dan "mal-rejimi" alanına ait verileri al
  const malRejimiLawData = workAreasData["mal-rejimi"];
  
  return <WorkArea workAreaData={malRejimiLawData} />;
};

export default MalRejimiLawPage; 