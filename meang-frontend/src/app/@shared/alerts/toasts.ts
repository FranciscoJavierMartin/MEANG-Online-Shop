import Swal from 'sweetalert2';
import { TYPE_ALERT } from './values.config';

export function basicAlert(
  title: string = '',
  icon: TYPE_ALERT = TYPE_ALERT.SUCCESS
) {
  Swal.fire({
    title,
    icon,
    position: 'top',
    showConfirmButton: false,
    toast: true,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
}
