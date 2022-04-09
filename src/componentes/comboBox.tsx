import * as React from 'react';
import {useState} from 'react'
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {Estados} from '../types/Estados'



let names = ['Selecione'];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ComboBox() {

  const [estados, setEstado] = useState<Estados[]>([]);
  const baseURL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'

  React.useEffect(() => {
    names.splice(1, names.length);
    loadEstados();
  })

  const loadEstados = async () => {
    await fetch(baseURL)
    .then((res) => {
       return res.json();
     })
     .then((json)=> {
       setEstado(json);
     });
  }

  estados.map((item, index)=> {
    names.push(item.nome);
  })
  

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    setPersonName(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  

  return (
    <div>
      <FormControl sx={{ m: 0, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Estado</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Estado" />}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, names, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
