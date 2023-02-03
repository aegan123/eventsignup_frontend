/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
*/
// Corresponds to its counterpart in the backend.
import {Gender} from "./Gender";
import {MealChoice} from "./MealChoice";

export type Participant = {
    name:string
    email: string
    event: string
    gender?: Gender
    mealChoice?: MealChoice
    drinkChoice?: {}
    belongsToQuota?: string
    isMember?: boolean
    hasPaid?: boolean
    otherData?: {}
    metaData?: {}
}