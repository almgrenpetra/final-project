import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { challengeBoard } from "../reducers/challengeBoard";
import "./Header.css";

export const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.challengeBoard.categories);

  const isHomeActive = () => location.pathname === "/";

  return (
    <header>
      <h1>EcoChampion</h1>
      <div className="header-lower">
        <ul className="nav-links">
          <li>
            <NavLink to="/" isActive={isHomeActive}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/challengeboard">Challenge Board</NavLink>
          </li>
          <li>
            <NavLink to="/mypage">My Page</NavLink>
          </li>
        </ul>

        {isHomeActive() && (
          <div className="select-container">
            <select
              aria-label="choose category"
              className="select"
              onChange={(event) =>
                dispatch(challengeBoard.actions.setCategory(event.target.value))
              }
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <div className="select-arrow"></div>
          </div>
        )}
      </div>
    </header>
  );
};
