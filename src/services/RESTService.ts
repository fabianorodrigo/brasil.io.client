import axios, {AxiosInstance} from 'axios';
import {IRespostaServico} from '../models/IRespostaServico';

const apiClient: AxiosInstance = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});

function getTokenHeader() {
    if (process.env.BRASIL_IO_TOKEN_API == null || process.env.BRASIL_IO_TOKEN_API.trim() === '')
        throw new Error(
            `A variável de ambiente 'BRASIL_IO_TOKEN_API' deve conter o token gerado em brasil.io para que a requisição seja realizada`,
        );
    return {
        headers: {
            Authorization: `Token ${process.env.BRASIL_IO_TOKEN_API}`,
        },
    };
}

export async function get<T>(url: string): Promise<IRespostaServico<T>> {
    try {
        const response = await apiClient.get(url, getTokenHeader());
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function post<T>(
    token: string | undefined,
    url: string,
    dados: T,
    id: number | undefined,
): Promise<IRespostaServico<T>> {
    try {
        let response;
        if (id) {
            response = await apiClient.put(url.concat(String(id)), dados, getTokenHeader());
            // O PUT do Loopback não retorna dados, então, se foi bem sucedido vamos retornar
            //o mesmo valor enviado para manter um padrão na resposta
            if (response.status == 204) return {sucesso: true, dados: dados};
        } else {
            response = await apiClient.post(url, dados, getTokenHeader());
        }
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function postAcao<T>(token: string | undefined, url: string, dados: any): Promise<IRespostaServico<T>> {
    try {
        let response = await apiClient.post(url, dados, getTokenHeader());
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}

export async function del(token: string | undefined, url: string): Promise<IRespostaServico<void>> {
    try {
        console.log(token, url);
        const response = await apiClient.delete(url, getTokenHeader());
        return {sucesso: true, dados: response.data};
    } catch (e) {
        if (e && e.response) {
            return {sucesso: false, dados: e.response.data};
        }
        throw e;
    }
}
