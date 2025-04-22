import React from 'react';
import WorkArea from '../components/WorkArea';
import workAreasData from '../data/workAreas';

const KiraLawPage = () => {
  // workAreasData'dan "kira" alanına ait verileri al
  const kiraLawData = workAreasData["kira"];
  
  return <WorkArea workAreaData={kiraLawData} />;
};

export default KiraLawPage; 