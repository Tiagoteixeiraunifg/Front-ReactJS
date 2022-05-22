import React from 'react';

export interface IClient {

    id: number;
    user:{
        id: number;
    }
    nome: string;
    sobrenome: string;
    cpf: string;
    telefone: string;
    email: string;
    end_rua: string;
    end_complemento: string;
    end_cidade: string;
    end_numero: string;
    end_estado: string;
    end_cep: string;
}