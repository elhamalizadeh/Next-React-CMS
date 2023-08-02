import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
    const router = useRouter();
    const { user, logout } = useContext(AuthContext);
    console.log(user);
    
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/posts">Posts</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <div className="d-flex">
                        {user ? (
                            <>
                                <span className="me-3">{user.name}</span>
                                <button onClick={logout} className="btn btn-sm btn-dark">logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/login" className="btn btn-sm btn-outline-secondary me-2">
                                  login
                                </Link>
                                <Link href="/auth/register" className="btn btn-sm btn-dark">
                                    register
                                </Link>
                            </>
                        )}
                    </div>

          </div>
        </div>
      </nav>

    )
}
export default Header;