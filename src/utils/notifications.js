import { toast as toastify } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toast = {
    success: (message, options) => toastify.success(message, options),
    error: (message, options) => toastify.error(message, options),
};