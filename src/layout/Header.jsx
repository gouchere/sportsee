import logo from "./../asset/images/logo.svg";

export default function Header(){
    return(
        <div>
            <div className="header__logo">
                <img src={logo} alt="logo site"/>
            </div>
            <div className="header__menu">
                <ul>
                    <li>Accueil</li>
                    <li>Profil</li>
                    <li>Réglage</li>
                    <li>Communauté</li>
                </ul>
            </div>
        </div>
    )
}