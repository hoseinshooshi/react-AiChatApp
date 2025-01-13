// import { useAuth } from '@clerk/clerk-react'
// import React, { useEffect } from 'react'
// import { Outlet, useNavigate } from 'react-router-dom'
// import ChatList from '../../components/ChatList/ChatList';

// const DashboardLayouts = () => {
//   const {userID, isLoaded} = useAuth(); 
//   const navigate = useNavigate();
//   useEffect(()=> {
//     if(isLoaded && !userID) {
//       navigate('/sign-in')
//     }
//   }, [isLoaded, userID, navigate]); 
//   //TODO: add a loading component
//   if (!isLoaded) return "is Loading"
    
//     return (
//       <div>
//         <div className='menu'>
//           <ChatList />
//         </div>
//         <div className='content'>
//             <Outlet />
//         </div>
//     </div>
//   )
// }

// //export default DashboardLayouts