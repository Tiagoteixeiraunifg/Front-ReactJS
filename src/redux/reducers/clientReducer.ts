import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({ 
    
    name: 'clientReducer',
    initialState:{
       
        id: 0,
        user: {id: 0, nome: ""},
        nome: "",
        sobrenome: "",
        cpf: "",
        telefone: "", 
        email: "",
        end_rua: "",
        end_numero: "",
        end_complemento: "",
        end_cidade: "",
        end_estado: "",
        end_cep: "",
        editando: false,
        salvo: false,
        novo: false,
        selectedEstado: false,
        excluir: false,
        cancExcluir: false,

    },
    reducers: {

        setId: (state, action) => {
            state.id = action.payload;
        },
        setIdUser: (state, action) => {
            state.user.id = action.payload;
        },
        setNomeUser: (state, action) => {
            state.user.nome = action.payload;
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
            state.telefone = action.payload;
        },
        setEndereco: (state, action) => {
            state.end_rua = action.payload;
        },        
        setNumero: (state, action) => {
            state.end_numero = action.payload;
        },
        setComplemento: (state, action) => {
            state.end_complemento = action.payload;
        },
        setCidade: (state, action) => {
            state.end_cidade = action.payload;
        },
        setEstado: (state, action) => {
            state.end_estado = action.payload;
        },
        setCep: (state, action) => {
            state.end_cep = action.payload;
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
        },
        setExcluir: (state, action) => {
            state.excluir = action.payload;
        },
        setCancExcluir: (state, action) => {
            state.cancExcluir = action.payload;
        }

    }
});

export default slice.reducer;

export const {
    setId,
    setIdUser,
    setNomeUser, 
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
    setFlagSelEstado,
    setExcluir,setCancExcluir} = slice.actions;