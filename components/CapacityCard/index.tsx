import React, { useEffect, useState } from 'react';
import CapacityCardComponent from './CapacityCardComponent';
import { exibirPublico, ExibirPublicoResponse } from '@/api/app/agenda';

const CapacityCard: React.FC = () => {
  const [publico, setPublico] = useState<ExibirPublicoResponse[]>([]);
  useEffect(() => {
    exibirPublico().then((response) => {
      return setPublico(response);
    });
  }, [])
  return (
    <>
      {publico[0]?.EXIBIR_PUBLICO && <CapacityCardComponent
        currentCapacity={publico[0]?.PUBLICO}
        operatingHours={publico[0]?.TITULO}
      />}
    </>
  );
};

export default CapacityCard;