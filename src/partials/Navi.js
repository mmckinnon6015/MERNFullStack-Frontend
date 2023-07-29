import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthConext"

function Navi() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }


  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Bad Banking App
      </Link>
      <ul>
        
        <CustomLink to="/Deposit">Deposit Page</CustomLink>
        <CustomLink to="/Withdraw">Withdraw Page</CustomLink>
        <CustomLink to="/Balance">Balance Page</CustomLink>
      </ul>
      {user && (
      <div>
        <span>{user.email}</span>
        <button onClick={handleClick}>Log Out</button>
      </div>
      )}
      {!user && (
      <div><ul>
      <CustomLink to="/CreateAccount">Create Account Page</CustomLink>
      <CustomLink to="/Login">Login Page</CustomLink>
      </ul></div>
      )}
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navi;
