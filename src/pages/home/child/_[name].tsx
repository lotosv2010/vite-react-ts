import React from 'react';
import { useParams } from 'react-router-dom';

function Name() {
  const { name } = useParams();
  return <div>{name}</div>;
}

export default Name;
