import { faGithubSquare, faTwitterSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer className="py-8 px-20 text-orange-500 border-t border-orange-900 max-md:text-center">
            <p><a className="hover:text-orange-900 underline" href="https://d7mi-b.github.io/abdulrahman/">Abdulrahman</a> &copy; 2023</p>
        </footer>
    )
}

export default Footer;