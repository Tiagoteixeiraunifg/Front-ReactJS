
import { IMaskInput } from 'react-imask';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl/FormControl';
import ComboBox from '../comboBox';
import { Checkbox, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'


interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string;
}


interface CustonLoginProps {
    email: string;
    permissao: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="(#00) 00000-0000"
                definitions={{
                    '#': /[0-9]/,
                }}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

const TextMaskCPF = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="#00.000.000-00"
                definitions={{
                    '#': /[0-9]/,
                }}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

interface State {
    textmask: string;
    cpf: string;
}

interface StateObjeto {
    primeiroNome: string;
    segundoNome: string;
}





export const CadastroCliente = (login: CustonLoginProps) => {
    
    const navegar = useNavigate();

    const handleToHomePage = () => { 
        navegar('/');
    }

    const [values, setValues] = React.useState<State>({
        textmask: "",
        cpf: "",
    });



    const [objcliente, setValue] = React.useState<StateObjeto>({
        primeiroNome: '',
        segundoNome: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...objcliente,
            [event.target.name]: event.target.value,
        });
    }


    return (
        <Container className="container-fluid">
            <form>
                <Stack direction="row" spacing={2} alignItems='left' paddingTop={15}>
                    <h3>Cadastro do Cliente - olá usuário: {login.email}</h3>
                    <div>
                        <Button type="button" variant="contained" onClick={handleToHomePage}>Voltar</Button>
                    </div>
                </Stack>


                <div className="row">
                    <div className="form-gp-cad col-md-6">
                        <TextField
                            name="primeiroNome"
                            type="text"
                            className="textbox2"
                            id="inputEmail4"
                            label="Primeiro Nome"
                            onChange={handleInput}
                            value={objcliente.primeiroNome}>
                        </TextField>
                    </div>
                    <div className="form-gp-cad col-md-6">
                        <TextField
                            name="segundoNome"
                            type="text"
                            className="textbox2"
                            id="sobrenome"
                            label="Sobre Nome"
                            onChange={handleInput}
                            value={objcliente.segundoNome}>
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="form-gp-cad col-md-3">
                        <FormControl variant="outlined" sx={{ width: '22ch' }}>
                            <InputLabel> Número CPF </InputLabel>
                            <Input
                                value={values.cpf}
                                onChange={handleChange}
                                name="cpf"
                                className="textbox"
                                id="inputcpf"
                                inputComponent={TextMaskCPF as any}
                            />
                        </FormControl>
                    </div>
                    <div className="form-gp-cad col-md-3">
                        <FormControl variant="outlined" sx={{ width: '22ch' }} >
                            <InputLabel> Telefone </InputLabel>
                            <Input
                                className="textbox"
                                value={values.textmask}
                                onChange={handleChange}
                                name="textmask"
                                id="telefone"
                                inputComponent={TextMaskCustom as any}
                            />
                        </FormControl>
                    </div>
                    <div className="form-gp-cad col-md-6">
                        <TextField
                            type="email"
                            className="textbox2"
                            id="emailAdrres"
                            label="Endereço Email"
                            name="email">
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="form-gp-cad-cli col-md-6">
                        <TextField
                            type="text"
                            className="textbox2"
                            id="inputAddress"
                            label="Nome da Rua"
                            name="endrua">
                        </TextField>
                    </div>

                    <div className="form-gp-cad-cli col-md-6">
                        <TextField
                            type="text"
                            className="textbox2"
                            id="inputAddress2"
                            label="Complemento Endereço, hotel, casa, etc."
                            name="endcomplemento">
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <Stack direction="row" spacing={2}>
                        <div className="form-gp  col-md-5">
                            <TextField
                                type="text"
                                className="textbox2"
                                id="inputCity"
                                label="Nome Cidade"
                                name="endcidade">
                            </TextField>
                        </div>
                        <div className="form-gp-cad col-md-3">
                            < ComboBox />
                        </div>
                    </Stack>
                </div>
                <div className="row">
                    <div className="form-gp col-md-4">
                        <TextField
                            type="text"
                            className="textbox"
                            id="inputCEP"
                            label="CEP"
                            name="endcep">
                        </TextField>
                    </div>
                    <div className="form-gp col-md-3">
                            <TextField
                                type="text"
                                className="textbox"
                                id="numero"
                                label="Numero"
                                name="endnumero"></TextField>
                        </div>
                    <Stack direction="row" spacing={2} alignItems={'center'} marginBottom={5}>
                        <Checkbox className="form-check-input" id="gridCheck"></Checkbox>
                        <InputLabel className="form-check-label" htmlFor="gridCheck">Ativo?</InputLabel>
                    </Stack>
                    <div className="row">
                        <Stack direction="row" spacing={2}>
                            <div className="form">
                                <Button type="submit" variant="contained" onClick={() => { alert(objcliente.primeiroNome + objcliente.segundoNome  ) }}> Gravar</Button>
                            </div>
                            <div className="form">
                                <Button type="submit" variant="contained">Cancelar</Button>
                            </div>
                            <div className="form">
                                <Button type="submit" variant="contained">Listar Clientes</Button>
                            </div>
                        </Stack>
                    </div>
                </div>
            </form>
        </Container>

    );
}

