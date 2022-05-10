import * as React from 'react';
import {useState} from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import {Estados} from '../types/Estados'
import { FormSelect } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setEstado as setEstadoReducer, setFlagSelEstado} from '../redux/reducers/clientReducer'



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
  
  const storeCliente = useAppSelector(state => state.clientReducer)
  const usedispach = useDispatch();
  
  const [estados, setEstado] = useState<Estados[]>([]);
  const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

  React.useEffect(() => {
    names.splice(1, names.length);
    usedispach(setFlagSelEstado(false));
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
  const [selectedEstado, setSelectedEstado] = React.useState<string>('Selecione');


  console.log(storeCliente.estado); 
  React.useEffect(() => {
    //para para o Store do cliente o estado aqui! // criar flag de estado selecionado para tratar o erro!
    usedispach(setEstadoReducer(selectedEstado));
    usedispach(setFlagSelEstado(true));
    //alert(selectedEstado);
  }, [selectedEstado])

  return (
        <FormSelect
          id="comboEstado"
          className="textbox"
          value={selectedEstado}
          onChange={e => {setSelectedEstado(e.target.value);}}
          disabled={props.disabled}      
        >
          {names.map((name, index) => (
            <option
              key={index}
              value={name}
              style={getStyles(name, names, theme)}
            >
              {name}
            </option>
          ))}
        </FormSelect>
  );
}
