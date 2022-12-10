import graphql from '../assets/graphql.svg'

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={graphql} alt="logo" /> GraphQL Task
      </div>
      <ul className="nav_list">
        <li className="nav_link">Home</li>
        <li className="nav_link">About</li>
      </ul>
    </header>
  )
}

export default Header
