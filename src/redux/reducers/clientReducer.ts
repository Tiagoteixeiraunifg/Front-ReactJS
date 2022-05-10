import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({ 
    
    name: 'clientReducer',
    initialState:{
       
        id: 0,
        nome: "",
        sobrenome: "",
        cpf: "",
        celular: "", 
        email: "",
        endereco: "",
        numero: "",
        complemento: "",
        cidade: "",
        estado: "",
        cep: "",
        editando: false,
        salvo: false,
        novo: false,
        selectedEstado: false,

    },
    reducers: {

        setId: (state, action) => {
            state.id = action.payload;
        },
        setNome: (state, action) => {
            state.nome = action.payload;
        },
        setSobrenome: (state, action) => {
            state.sobrenome = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setCpf: (state, action) => {
            state.cpf = action.payload;
        },
        setCelular: (state, action) => {
            state.celular = action.payload;
        },
        setEndereco: (state, action) => {
            state.endereco = action.payload;
        },        
        setNumero: (state, action) => {
            state.numero = action.payload;
        },
        setComplemento: (state, action) => {
            state.complemento = action.payload;
        },
        setCidade: (state, action) => {
            state.cidade = action.payload;
        },
        setEstado: (state, action) => {
            state.estado = action.payload;
        },
        setCep: (state, action) => {
            state.cep = action.payload;
        },
        setEditando: (state, action) => {
            state.editando = action.payload;
        },
        setSalvo: (state, action) => {
            state.salvo = action.payload;
        },
        setNovo: (state, action) => {
            state.novo = action.payload;
        },
        setFlagSelEstado: (state, action) => {
            state.selectedEstado = action.payload;
        }

    }
});

export default slice.reducer;

export const {
    setId, 
    setNome, 
    setSobrenome, 
    setEmail, 
    setCpf, 
    setCelular, 
    setEndereco, 
    setNumero, 
    setComplemento, 
    setCidade, 
    setEstado, 
    setCep, 
    setEditando, 
    setSalvo, 
    setNovo,
    setFlagSelEstado} = slice.actions;