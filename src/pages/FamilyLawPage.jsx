import React from 'react';
import WorkArea from '../components/WorkArea';
import workAreasData from '../data/workAreas';

const FamilyLawPage = () => {
  // workAreasData'dan "aile" alanına ait verileri al
  const familyLawData = workAreasData["aile"];
  
  return <WorkArea workAreaData={familyLawData} />;
};

export default FamilyLawPage; 