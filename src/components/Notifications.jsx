
import { useEffect } from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const Notification = ({title, msg, color}) => {

    useEffect(()=>{
        Store.addNotification({
            title: title,
            message: msg,
            type: color,
            insert: "top",
            container: "bottom-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: { duration: 1000, onScreen: true }
          })
    
    },[])
    
      
  return (
      <ReactNotifications />
  );
};



export default Notification