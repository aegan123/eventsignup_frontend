/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import {Event} from "../types/Event";
import {SERVER_ADDRESS} from "../constants";
import {FormGeneratorOnSubmitParams, ReactFormGenerator} from 'react-form-builder2';
import {convertUTCIsoStringToLocalDateTimeString} from "./Utilities";


interface EventProps {
    event: Event
}

export function EventComponent({event}: EventProps) {

    function handleSignup(event: FormGeneratorOnSubmitParams[]): void {
        console.log(event)
    }

    return (
        <>
            <section className={"section"}>
                <h1 className={"title"}>{event.name}</h1>
                {event.bannerImg &&
                    <figure className={"image"}>
                        <img className={"has-ratio"} src={`${SERVER_ADDRESS}/api/event/banner/get/${event.bannerImg}`}
                             alt={"Tapahtuman kansikuva"}/>
                    </figure>
                }
                <div className={"block"}>
                    {event.description}
                </div>
                <div className={"block"}>
                    Paikka: {event.place}
                </div>
                {(event.startDate && event.endDate) ?
                    <div className={"block"}>
                        Tapahtuman aika: {convertUTCIsoStringToLocalDateTimeString(event.startDate)} - {convertUTCIsoStringToLocalDateTimeString(event.endDate)}
                    </div>
                    :
                    <div className={"block"}>
                        Tapahtuman aika: {convertUTCIsoStringToLocalDateTimeString(event.startDate)}
                    </div>
                }
                {event.price &&
                    <div className={"block"}>
                        Hinta: {event.price} €
                    </div>
                }
                <div className={"block"}>
                    <ReactFormGenerator
                        form_action={""}
                        form_method={"POST"}
                        data={event.form.formData.task_data}
                        action_name={"Ilmoittaudu"}
                        back_name={"Peruuta"}
                        onSubmit={(event) => handleSignup(event)}
                    />
                </div>
            </section>
        </>
    );
}
