/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React, { useState, useEffect } from "react"

/**
 * TODO
 * - Get the actual events
 * - Figure out properties that are going to be used
 */


// Placeholder event for now
interface Event {
    name: string
    place: string
    startDate: string
    endDate?: string
}

const IndexRoute: React.FC = () => {
    const [events, setEvents] = useState<Array<Event>>([])

    // Initial render
    useEffect(() => {
        getEvents()
    }, [])

    const getEvents = () => {
        const result: Event[] = [] // Api call to get events
        setEvents(result)
    }

    return (
        <section className={"section"}>
            Tervetuloa tapahtumailmoittautumisjärjestelmään.

            <div>
                { events.map((event) => (
                    <div>
                        { event.name } { event.place }
                        {/* Whatever info one event should have */}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default IndexRoute