import React from 'react';
import WorkArea from '../components/WorkArea';
import workAreasData from '../data/workAreas';

const CriminalLawPage = () => {
  // workAreasData'dan "ceza" alanına ait verileri al
  const criminalLawData = workAreasData["ceza"];
  
  return <WorkArea workAreaData={criminalLawData} />;
};

export default CriminalLawPage; 