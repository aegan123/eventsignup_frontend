/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import {LocalDateTime, ZoneId} from "@js-joda/core";

export const serverAddress = "http://localhost:8080"

export function postEvent(path: string, data: any): Promise<Response> {
    return fetch(serverAddress + path, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    })
}

export function postImageData(path: string, fileToUpload: Blob): Promise<Response> {
    return fetch(serverAddress + path, {
        method: "POST",
        body: fileToUpload,
        headers: {"Content-Type": fileToUpload.type},
    })
}

export function convertLocalDateToUTCISOString(inputDate: string): string {
    return LocalDateTime.parse(inputDate).atZone(ZoneId.SYSTEM).withZoneSameInstant(ZoneId.UTC).toString()
}
