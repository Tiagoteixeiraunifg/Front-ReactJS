import * as React from 'react';
import {useState} from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import {Estados} from '../../types/Estados'
import { FormSelect } from 'react-bootstrap';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setEstado as setEstadoReducer, setFlagSelEstado} from '../../redux/reducers/clientReducer'



let names = ['Selecione'];

function getStyles(name: string, estados: string[], theme: Theme) {
  return {
    fontWeight:
        estados.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface props {
  id: string;
  disabled: boolean;
}

export default function ComboBox(props: props) {
  
  const storeCliente = useAppSelector(state => state.clientReducer)
  const usedispach = useDispatch();
  
  const [selectedEstado, setSelectedEstado] = React.useState<string>();
  const [estados, setEstado] = useState<Estados[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [click, setClick] = useState<boolean>(false);
  const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'


  const handleClick = (event: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    setClick(true);
    setEditando(false);
  }

  React.useEffect(() => {
    if(storeCliente.editando){
      setEditando(true);
    }else{
      setEditando(false);
    }
  })

  React.useEffect(() => {
    if(!editando){
      names.splice(0, names.length);
      names.push('Selecione');
      console.log('chegou aqui editando false');
      usedispach(setFlagSelEstado(false));
      loadEstados();
    }else{
      names.splice(0, names.length);
      setEstado([{ id: 1, nome: storeCliente.end_estado, sigla: "DF"}]);
      setSelectedEstado(storeCliente.end_estado);
      console.log(names[0])
      usedispach(setFlagSelEstado(true));
    }
  },[click, editando])

  if(editando){
    names.splice(0, names.length);
    estados.map((item, index)=> {
      names.push(item.nome);
    })
  }else{
    names.splice(1, names.length);
    estados.map((item, index)=> {
      names.push(item.nome);
    })
  }
  
  const loadEstados = async () => {
    await fetch(baseURL)
    .then((res) => {
       return res.json();
     })
     .then((json)=> {
       setEstado(json);
     }).catch(() => alert("Erro ao obter lista de estados"));
  }


  const theme = useTheme();

  React.useEffect(() => {
    if(click){
      usedispach(setEstadoReducer(selectedEstado));
      usedispach(setFlagSelEstado(true));
    }
    //para para o Store do cliente o estado aqui! // criar flag de estado selecionado para tratar o erro!
  }, [selectedEstado])

  return (
        <FormSelect
          id={props.id}
          className="textbox"
          value={selectedEstado}
          onChange={e => {setSelectedEstado(e.target.value);}}
          onClick={handleClick}
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
