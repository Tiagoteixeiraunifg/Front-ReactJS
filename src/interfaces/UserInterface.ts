export interface IUserLogin {
    email: string,
    id: number,
    nome: string,
    password: string,
    sobrenome: string, 
    token: string,
    userperfil: string,
}

export interface IUserSingIn {
    email: string,
    password: string,
}

export interface IErros {

    timestamp: string;
    details: string;

}