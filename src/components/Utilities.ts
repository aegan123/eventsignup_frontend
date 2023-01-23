/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {
    BASE_HTTP_HEADER,
    HTTP_METHOD_POST,
    LOCAL_STORAGE_KEY_IS_ADMIN,
    LOCAL_STORAGE_KEY_JWT,
    SERVER_ADDRESS
} from "../constants";

export function validateToken(): boolean {
    const jwt = getJwt()
    if (jwt) {
        const decodedToken = jwt_decode(jwt);
        const currentDate = new Date();
        // @ts-ignore
        return (decodedToken.exp * 1000) >= currentDate.getTime()
    }
    return false
}
export function login(username: string, password: string): Promise<Response> {
    const requestBody = {
        "username": username,
        "password": password
    }
    return fetch(`${SERVER_ADDRESS}/api/auth/authenticate`, {
        method: HTTP_METHOD_POST,
        body: JSON.stringify(requestBody),
        headers: BASE_HTTP_HEADER
    })
}

export function logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY_JWT)
    localStorage.removeItem(LOCAL_STORAGE_KEY_IS_ADMIN)
}

export function useLocalState(defaultValue: string, key: string) {
    const [value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key)
        return localStorageValue !== null ? JSON.parse(localStorageValue) : defaultValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export function stripCharacter(input: string | null, character: string): string {
    if (input && character) {
        input = input.replaceAll(character, "")
        return input
    }
    return ""
}

export function getJwt(): string {
    return stripCharacter(localStorage.getItem(LOCAL_STORAGE_KEY_JWT), '"')
}
