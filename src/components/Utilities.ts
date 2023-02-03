/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import {HTTP_METHOD_GET, SERVER_ADDRESS} from "../constants";
import {convert, ZonedDateTime, ZoneId} from "@js-joda/core";

export function get(path: string): Promise<Response> {
    return fetch(`${SERVER_ADDRESS}${path}`, {
        method: HTTP_METHOD_GET,
        headers: {'Accept': 'application/json'},
    })
}

export function convertUTCIsoStringToLocalDateTimeString(timeString: string): string {
    const parsedDate = ZonedDateTime.parse(timeString).withZoneSameInstant(ZoneId.SYSTEM)
    const jsDate = convert(parsedDate).toDate()
    const dayOfWeek = parsedDate.dayOfWeek().toString().toLocaleLowerCase(navigator.language)
    return `${dayOfWeek} ${jsDate.toLocaleString(navigator.language)}`
}
