import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifiToast = (text,type) => {
    if(type === 'info'){
  toast.info(text, {
    position: 'top-right',
    autoClose: 750,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    toastId: 'custom-id-yes',
  });
}
else {
    toast.error(text, {
        position: 'top-right',
        autoClose: 750,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        toastId: 'custom-id-yes',
      });
}
  return (<ToastContainer/>)
};
