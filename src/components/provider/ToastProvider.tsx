import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastProvider = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      limit={5}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      theme="dark"
      transition={Slide}
    />
  );
};
