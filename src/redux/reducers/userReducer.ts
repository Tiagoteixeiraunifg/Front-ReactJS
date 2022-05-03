import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({ 
    
    name: 'userLogin',
    initialState:{
       
        id: 0,
        nome: "",
        sobrenome: "", 
        email: "",
        password: "",
        userperfil: "",
        token: "",
        logado: false,

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
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setUserPerfil: (state, action) => {
            state.userperfil = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },        
        setLogado: (state, action) => {
            state.logado = action.payload;
        }
    }
});

export default slice.reducer;

export const {setNome, setSobrenome, setEmail, setPassword, setToken, setUserPerfil, setLogado} = slice.actions;
