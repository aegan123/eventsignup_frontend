/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/NavBar";
import {useLocalState, validateToken} from "../components/Utilities";
import {LOCAL_STORAGE_KEY_IS_ADMIN, LOCAL_STORAGE_KEY_JWT} from "../constants";

// Source: Bulma css documentation
function toggleNavBurgerEvents() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            if ($target !== null) {
                $target.classList.toggle('is-active');
            }
        })
    });
}

export default function Root() {

    const [isLoggedIn, setIsLoggedIn] = useLocalState("", LOCAL_STORAGE_KEY_JWT)
    const [isAdmin, setIsAdmin] = useLocalState("", LOCAL_STORAGE_KEY_IS_ADMIN)

    function logTheUserOut() {
        setIsLoggedIn("")
        setIsAdmin("")
        const pathName = window.location.pathname
        if (pathName !== "/login" && pathName !== "/" && !pathName.includes("signup")) {
            window.location.replace("/login")
        }
    }

    useEffect(() => {
        if (!validateToken()) {
            logTheUserOut()
        }
        // Continuously check whether JWT has expired and log the user out if it has.
        const interval = setInterval(() => {
            if (!validateToken()) {
                // TODO somehow inform the user that the session has expired and they have been logged out
                logTheUserOut()
            }
        }, 60000);
        return () => clearInterval(interval);
    });

    document.addEventListener('DOMContentLoaded', toggleNavBurgerEvents);

    return (
        <>
            <Navbar showAdminStatus={isAdmin} showLoginStatus={!isLoggedIn} showManagement={isLoggedIn} managementIsActive={isLoggedIn}/>
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