import {useEffect} from "react";
import {logout} from "./Utilities";

export default function Logout() {

    useEffect(() => {
        logout()
        window.location.replace("/")
    })
    return (
        <div className={"content"}>
            <p>Olet kirjautunut ulos.</p>
        </div>
    )
}