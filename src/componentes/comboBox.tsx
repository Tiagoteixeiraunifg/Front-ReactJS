import * as React from 'react';
import {useState} from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import {Estados} from '../types/Estados'
import { FormSelect } from 'react-bootstrap';


let names = ['Selecione'];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface props {
  disabled: boolean;
}

export default function ComboBox(props: props) {

  const [estados, setEstado] = useState<Estados[]>([]);
  const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

  React.useEffect(() => {
    names.splice(1, names.length);
    loadEstados();
  },[props.disabled])

  const loadEstados = async () => {
    await fetch(baseURL)
    .then((res) => {
       return res.json();
     })
     .then((json)=> {
       setEstado(json);
     }).catch(() => alert("Erro ao obter lista de estados"));
  }

  estados.map((item, index)=> {
    names.push(item.nome);
  })
  

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string | number>('');

  return (
        <FormSelect
          id="comboEstado"
          className="textbox"
          value={personName}
          onChange={e => setPersonName(e.target.value)} 
          disabled={props.disabled}      
        >
          {names.map((name) => (
            <option
              key={name}
              value={name}
              style={getStyles(name, names, theme)}
            >
              {name}
            </option>
          ))}
        </FormSelect>
  );
}
