/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React from "react";
import {Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <div className="columns is-gapless is-8">
                {/* left column */}
                <div className="column is-desktop">

                </div>
                {/* center column */}
                <div className="column is-8">
                    <Outlet/>
                </div>
                {/* right column */}
                <div className="column is-2 is-desktop">

                </div>
            </div>
        </>
    )
}