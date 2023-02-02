/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import {HTTP_METHOD_GET, SERVER_ADDRESS} from "../constants";

export function get(path: string): Promise<Response> {
    return fetch(`${SERVER_ADDRESS}${path}`, {
        method: HTTP_METHOD_GET,
        headers: {'Accept': 'application/json'}
    })
}