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
    confirmButtonText: 'Close',
    toast: true,
  });
}
