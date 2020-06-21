import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  faCaretDown,
  faSignOutAlt,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from './../context/AuthContext';
import defaultAvatar from './../images/defaultAvatar.png';




 const DropdownItem = ({ item }) => (
  <button
    className=""
    onClick={item.onClick}
  >
    <FontAwesomeIcon icon={item.icon} />
    <p className="ml-2">{item.title}</p>
  </button>
);

const DropdownContent = ({ dropdownItems }) => {
  return (
    <div className="">
      {dropdownItems.map((item, i) => {
        return (
          <div className="mt-1" key={i}>
            <DropdownItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

const AvatarDropdown = () => {
  const node = useRef();
  const auth = useContext(AuthContext);
  const { authState } = auth;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownItems = [
    {
      title: 'Profile',
      icon: faUserCircle,
      onClick: auth.logout
    },
 
    {
      title: 'Log Out',
      icon: faSignOutAlt,
      onClick: auth.logout
    }
  ];

  const handleClick = e => {
    if (!node.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClick
      );
    };
  }, []);

  return (
    <div ref={node}>
      <button
        ref={node}
        className="avatar-button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={ authState.userInfo.avatar || defaultAvatar}
          alt="Avatar" className='avatar'
        />
        <div className="avatar-name">
          {authState.userInfo.firstName}
        </div>
        <div className="facaret">
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </button>

      {dropdownOpen && (
        <div className="dropdown-items">
          <DropdownContent dropdownItems={dropdownItems} />
        </div>
      )}
    </div>
  );
};

export default AvatarDropdown;
