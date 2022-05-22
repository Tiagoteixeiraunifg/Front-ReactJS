import React, { useState, useEffect } from 'react';
import { FormSelect } from 'react-bootstrap';
import { Theme, useTheme } from '@mui/material/styles';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setUserPerfil } from '../../redux/reducers/userReducer'

function getStyles(name: string, perfil: string[], theme: Theme) {
  return {
    fontWeight:
      perfil.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  id: string;
  disabled: boolean;
}

let perfis = ['ADMIN', 'USUARIO'];

export default function SelectUserPerfil(props: Props) {

  const alteraUser = useDispatch();
  const userStore = useAppSelector(state => state.userLogin);

  const [perfilSelected, setPerfilSelected] = useState<string>('');
  const theme = useTheme();

  useEffect(() => {
    alteraUser(setUserPerfil(perfilSelected));
  }, [perfilSelected])

  return (

    <FormSelect
      id={props.id}
      className="textbox"
      value={perfilSelected}
      onChange={e => { setPerfilSelected(e.target.value); }}
      disabled={props.disabled}
    >
      {perfis.map((name, index) => (
        <option
          key={index}
          value={name}
          style={getStyles(name, perfis, theme)}
        >
          {name}
        </option>
      ))}
    </FormSelect>
  );
}