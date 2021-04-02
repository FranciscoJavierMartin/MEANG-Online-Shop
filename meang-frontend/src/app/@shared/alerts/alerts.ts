import Swal from 'sweetalert2';

export async function formBasicDialog(
  title: string,
  html: string,
  property: string
) {
  return await Swal.fire({
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancel',
    showCancelButton: true,
    preConfirm: () => {
      const value = (document.getElementById(property) as HTMLInputElement)
        .value;
      return value || Swal.showValidationMessage('Name is required');
    },
  });
}

export async function infoDetailsBasic(
  title: string,
  html: string,
  width: number
) {
  return await Swal.fire({
    title,
    text: html,
    width: `${width}px`,
    showCancelButton: true,
    confirmButtonColor: '#6c757d',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'Edit',
    cancelButtonText: 'Lock',
  });
}
