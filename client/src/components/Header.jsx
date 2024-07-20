import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FiUser } from "react-icons/fi";

const Header = () => {
  const { user } = useContext(UserContext);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Extracting first name from full name, assuming full name is stored in user.user.name
  const firstName = user ? user.user.name.split(' ')[0] : '';

  // Toggle calendar visibility and update dates
  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    setShowCalendar(false); // Hide calendar after selection
  };

  // Placeholder function for search action
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search action');
  };

  return (
    <header className="  bg-bg flex justify-between items-center">
      <a href="/" className="flex items-center gap-1">
        <img src="src/assets/BYSmain.png" alt="BookYourStay" className="w-20 m-4 h-20" />
        <span></span>
      </a>
       
      <Link to={user ? '/account' : '/login'} className="flex items-center m-4">
        <button>
        <FiUser size={25} />
        </button>
        {user && <div className="ml-2">{firstName}</div>}
      </Link>
    </header>
  );
}

export default Header;
