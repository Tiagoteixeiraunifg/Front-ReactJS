
import { IMaskInput } from 'react-imask';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl/FormControl';
import ComboBox from '../comboBox';
import { Checkbox } from '@mui/material';


interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
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



    const [values, setValues] = React.useState<State>({
        textmask: '(077) 00000-0000',
        cpf: '000.000.000-00',
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
        setValue({ ...objcliente, [event.target.name]: event.target.value, });
    }


    return (

        <div className="App">
            <form>
                <h3>Cadastro do Cliente - olá usuário: {login.email}</h3>
                <div className="row">
                    <div className="form-gp-cad col-md-6">
                        <TextField
                            name="primeiroNome"
                            type="text"
                            className="textbox"
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
                            className="textbox"
                            id="sobrenome"
                            label="Sobre Nome"
                            onChange={handleInput}
                            value={objcliente.segundoNome}>
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="form-gp-cad col-md-3">
                        <FormControl variant="standard">
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
                        <FormControl variant="standard">
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
                            className="textbox"
                            id="emailAdrres"
                            label="Endereço Email"
                            name="email">
                        </TextField>
                    </div>
                </div>
                <div className="form-gp-cad-cli">
                    <TextField
                        type="text"
                        className="textbox"
                        id="inputAddress"
                        label="Nome da Rua"
                        name="endrua">
                    </TextField>
                </div>
                <div className="form-gp-cad-cli">
                    <TextField
                        type="text"
                        className="textbox"
                        id="inputAddress2"
                        label="Complemento Endereço, hotel, casa, etc."
                        name="endcomplemento">
                    </TextField>
                </div>
                <Stack direction="row" spacing={4}>
                   
                        <div className="form-gp col-md-5">
                            <TextField
                                type="text"
                                className="textbox"
                                id="inputCity"
                                label="Nome Cidade"
                                name="endcidade">
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

                        <div className="form-gp col-md-3">
                            < ComboBox />
                        </div>
                        
            
                </Stack>
                <div className="form-gp col-md-4">
                            <TextField
                                type="text"
                                className="textbox"
                                id="inputCEP"
                                label="CEP"
                                name="endcep">
                            </TextField>
                        </div>

                <Stack direction="row" spacing={2} alignItems={'center'} marginBottom={5}>
                    <Checkbox className="form-check-input" id="gridCheck"></Checkbox>
                    <InputLabel className="form-check-label" htmlFor="gridCheck">Ativo?</InputLabel>
                </Stack>
                <div>

                </div>
                <Stack direction="row" spacing={2}>
                    <div>
                        <Button type="submit" variant="contained" onClick={() => { alert(objcliente.primeiroNome) }}> Gravar</Button>
                    </div>
                    <div className="form">
                        <Button type="submit" variant="contained">Cancelar</Button>
                    </div>
                    <Stack direction="row" spacing={2} paddingLeft={85}>
                        <div className="form">
                            <Button type="submit" variant="contained">Listar Clientes</Button>
                        </div>
                    </Stack>

                </Stack>
            </form>
        </div>

    );
}

