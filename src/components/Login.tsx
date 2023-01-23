/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import {FormEvent, useState} from "react";
import {login, useLocalState} from "./Utilities";
import {LOCAL_STORAGE_KEY_IS_ADMIN, LOCAL_STORAGE_KEY_JWT} from "../constants";

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [jwt, setJwt] = useLocalState("", LOCAL_STORAGE_KEY_JWT)
    const [isAdmin, setIsAdmin] = useLocalState("", LOCAL_STORAGE_KEY_IS_ADMIN)
    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        login(username, password)
            .then(response => {
                if (response.ok) {
                    return Promise.all([response.json(), response.headers])
                } else {
                    return Promise.reject("Kirjautuminen epäonnistui.")
                }
            })
            .then(([body, headers]) => {
                setJwt(body.token)
                setIsAdmin(body.isAdmin)
                setPassword("")
                setUsername("")
                window.location.replace("/management")
            })
            .catch(error => {
                setErrorMsg(error)
                setShowError(true)
            })
        return false
    }

    return (
        <>
            <section className={"section"}>

            </section>
            <div className={"columns is-centered"}>
                <div className={"column is-half"}>
                    <h2>Kirjaudu sisään</h2>
                    {showError &&
                        <div className="notification is-danger is-light">
                            <button className="delete"
                                    onClick={() => setShowError(false)}></button>
                            {errorMsg}
                        </div>
                    }
                    <form method={"post"} onSubmit={event => handleLogin(event)}>
                        <div className="field">
                            <label className="label">Käyttäjätunus</label>
                            <div className="control">
                                <input className="input" type="text" id={"username"} name={"username"} required={true}
                                       autoFocus={true} placeholder="Käyttäjätunnus" value={username}
                                       onChange={event => setUsername(event.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Salasana</label>
                            <div className="control">
                                <input className="input" type="password" id={"password"} name={"password"}
                                       required={true}
                                       placeholder="Salasana" value={password}
                                       onChange={event => setPassword(event.target.value)}/>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-link" type={"submit"}>Kirjaudu</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
