
import { IMaskInput } from 'react-imask';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl/FormControl';
import ComboBox from '../comboBox';
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
                mask="(#0) 00000-0000"
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

const TextMaskCEP = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="#0000-000"
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
    cep: string;
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
        cep: "",
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
        <section className="auth-wrapper d-flex flex-wrap">
            <div className="auth-inner-cli d-flex flex-wrap">
                <form>
                    <Stack
                        direction="row"
                        spacing={30}
                        alignItems="flex-start"
                        paddingTop={0}
                    >
                        <h3>Cadastro do Cliente - olá usuário: {login.email}</h3>
                        <div>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={handleToHomePage}
                            >
                                Voltar
                            </Button>
                        </div>
                    </Stack>
                    <br />
                    <div className="form-row">
                        <div className="form-gp-cad col-md-6 ">
                            <TextField
                                name="primeiroNome"
                                type="text"
                                className="textbox"
                                id="inputEmail4"
                                label="Primeiro Nome"
                                onChange={handleInput}
                                value={objcliente.primeiroNome}
                            ></TextField>
                        </div>
                        <div className="form-gp-cad col-md-6">
                            <TextField
                                name="segundoNome"
                                type="text"
                                className="textbox"
                                id="sobrenome"
                                label="Sobre Nome"
                                onChange={handleInput}
                                value={objcliente.segundoNome}
                            ></TextField>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-gp-cad col-md-3 pb-2">
                            <FormControl variant="outlined" sx={{ m: 1, width: 200 }}>
                                <InputLabel> Número CPF </InputLabel>
                                <Input
                                    value={values.cpf}
                                    onChange={handleChange}
                                    name="cpf"
                                    className="textbox-cpf-fone"
                                    id="inputcpf"
                                    inputComponent={TextMaskCPF as any}
                                />
                            </FormControl>
                        </div>

                        <div className="form-gp-cad col-md-3 pb-2">
                            <FormControl variant="outlined" sx={{ m: 1, width: 200 }}>
                                <InputLabel> Telefone </InputLabel>
                                <Input
                                    className="textbox-cpf-fone"
                                    value={values.textmask}
                                    onChange={handleChange}
                                    name="textmask"
                                    id="telefone"
                                    inputComponent={TextMaskCustom as any}
                                />
                            </FormControl>
                        </div>

                        <div className="form-gp-cad col-md-6 py-4">
                            <TextField
                                type="email"
                                className="textbox"
                                id="emailAdrres"
                                label="Endereço Email"
                                name="email"
                            ></TextField>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-gp-cad col-md-6">
                            <TextField
                                type="text"
                                className="textbox"
                                id="inputAddress"
                                label="Nome da Rua"
                                name="endrua"
                            ></TextField>
                        </div>

                        <div className="form-gp-cad col-md-6">
                            <TextField
                                type="text"
                                className="textbox"
                                id="inputAddress2"
                                label="Complemento Endereço, hotel, casa, etc."
                                name="endcomplemento"
                            ></TextField>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-gp-cad col-8">
                            <TextField
                                type="text"
                                className="textbox"
                                id="inputCity"
                                label="Nome Cidade"
                                name="endcidade"
                            ></TextField>
                        </div>

                        <div className="form-gp-cad col-4 ">
                            <TextField
                                type="text"
                                className="textbox"
                                id="numero"
                                label="Numero"
                                name="endnumero"
                            ></TextField>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-gp-cad pb-2">
                            <FormControl variant="outlined" sx={{ m: 0, width: 200 }}>
                                <InputLabel htmlFor="inputCEP">CEP</InputLabel>
                                <Input
                                    className="textbox-cpf-fone"
                                    value={values.cep}
                                    onChange={handleChange}
                                    id="inputCEP"
                                    name="cep"
                                    inputComponent={TextMaskCEP as any}
                                />
                            </FormControl>
                        </div>
                        <div className="form-gp-cad py-3">
                       
                        </div>
                    </div>

                    <div className="form-gp-cad pb-3 py-3">
                        <Stack direction="row" spacing={3}>
                            <div className="form">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        alert(objcliente.primeiroNome + objcliente.segundoNome);
                                    }}
                                >
                                    {" "}
                                    Gravar
                                </Button>
                            </div>
                            <div className="form">
                                <Button type="submit" variant="contained">
                                    Cancelar
                                </Button>
                            </div>
                            <div className="form">
                                <Button type="submit" variant="contained" onClick={() => navegar("/cli-reg")}>
                                    Listar Clientes
                                </Button>
                            </div>
                        </Stack>
                    </div>
                </form>
            </div>
        </section>
    );
}

