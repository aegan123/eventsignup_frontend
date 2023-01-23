/*
Copyright Juhani Vähä-Mäkilä (juhani@fmail.co.uk) 2022.
Licenced under EUROPEAN UNION PUBLIC LICENCE v. 1.2.
 */
import {Link} from "react-router-dom";
import {useState} from "react";

interface NavBarProps {
    showAdminStatus: boolean,
    showLoginStatus: boolean,
    managementIsActive: boolean,
    showManagement: boolean
}

const classNameActive = 'navbar-item is-tab is-active';
const classNameInactive = 'navbar-item is-tab';

export default function NavBar({ showAdminStatus, showLoginStatus, managementIsActive, showManagement }: NavBarProps) {
    const [adminIsActive, setAdminIsActive] = useState(false)
    const [myEventsIsActive, setMyEventsIsActive] = useState(managementIsActive)
    const [newEventIsActive, setNewEventIsActive] = useState(false)

    function toggleMyEventIsActiveState(): void {
        setMyEventsIsActive(true)
        setNewEventIsActive(false)
        setAdminIsActive(false)
    }

    function toggleNewEventIsActiveState(): void {
        setMyEventsIsActive(false)
        setNewEventIsActive(true)
        setAdminIsActive(false)
    }

    function toggleAdminIsActiveState(): void {
        setMyEventsIsActive(false)
        setNewEventIsActive(false)
        setAdminIsActive(true)
    }

    return (
        <nav className="navbar is-fixed-top is-light has-shadow" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to={`/`} className="navbar-item">
                    <img
                        src="https://www.asteriski.fi/wp-content/themes/wp-asteriski-theme/assets/img/asteriski-logo.png"
                        width="46" height="46" alt="Asteriski logo"/>
                </Link>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                   data-target="mainNavigation">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="mainNavigation" className="navbar-menu">
                <div className="navbar-start">
                    {showManagement &&
                        <>
                            <Link to={`management`}
                                  className={myEventsIsActive ? classNameActive : classNameInactive}
                                  onClick={toggleMyEventIsActiveState}>
                                <span className="icon is-small"><i
                                    className="fas fa-home" aria-hidden="true"></i>
                                                     </span>
                                <span>Omat tapahtumat</span>
                            </Link>

                            <Link to={`newEvent`}
                                  className={newEventIsActive ? classNameActive : classNameInactive}
                                  onClick={toggleNewEventIsActiveState}>
                                <span className="icon is-small"><i
                                    className="fas fa-plus-square" aria-hidden="true"></i>
                                                     </span>
                                <span>Luo uusi tapahtuma</span>
                            </Link>
                            {showAdminStatus &&
                                <Link to={`admin`}
                                      className={adminIsActive ? classNameActive : classNameInactive}
                                      onClick={toggleAdminIsActiveState}>
                                    <span className="icon is-small"><i
                                        className="fas fa-tools" aria-hidden="true"></i>
                                                     </span>
                                    <span>Admin</span>
                                </Link>
                            }
                        </>
                    }
                </div>
                <div className="navbar-end">
                    {showLoginStatus &&
                        <div className={classNameActive}>
                            <Link to={'login'}>
                                   <span className="icon is-small"><i className="fas fa-sign-in-alt"></i>
                                    <span>Kirjaudu sisään</span>
                                </span>
                            </Link>
                        </div>
                    }
                    {!showLoginStatus &&
                        <div className="navbar-item">
                            <Link to={'logout'}>
                                    <span className="icon is-small"><i
                                        className="fas fa-sign-out-alt" aria-hidden="true"></i>
                                                     </span>
                                <span>Kirjaudu ulos</span>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}