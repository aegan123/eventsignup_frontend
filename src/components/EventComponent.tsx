/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import {Event} from "../types/Event";
import {SERVER_ADDRESS} from "../constants";
import {ReactFormGenerator} from 'react-form-builder2';


interface EventProps {
    event: Event
}

export function EventComponent({event}: EventProps) {

    function handleSignup(): void {
        console.log("in handleSignup")

    }

    return (
        <>
            <section className={"section"}>
                <h1 className={"title"}>{event.name}</h1>
                {event.bannerImg &&
                    // FIXME set pic size relative to page (column) size
                    <figure className={"image"}>
                        <img className={"has-ratio"} src={`${SERVER_ADDRESS}/event/banner/get/${event.bannerImg}`}
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
                    // FIXME convert to localDate and format properly
                    <div className={"block"}>
                        Tapahtuman aika: {event.startDate} - {event.endDate}
                    </div>
                    :
                    <div className={"block"}>
                        Tapahtuman aika: {event.startDate}
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
                        data={event.form.formData}
                        action_name={"Ilmoittaudu"}
                        back_name={"Peruuta"}
                        onSubmit={handleSignup}
                        read_only={true}
                    />
                </div>
            </section>
        </>
    );
}