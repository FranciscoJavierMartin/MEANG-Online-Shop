import { EMAIL_PATTERN } from '@core/constants/regexp';
import { ROLES } from '@core/enums/roles';
import Swal from 'sweetalert2';

const swalWithBasicOptions = (title: string, html: string) =>
  Swal.mixin({
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancel',
    showCancelButton: true,
  });

export async function formBasicDialog(
  title: string,
  html: string,
  property: string
) {
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: () => {
      const value = (document.getElementById(property) as HTMLInputElement)
        .value;
      return value || Swal.showValidationMessage('Field is required');
    },
  });
}

export async function userFormBasicDialog(title: string, html: string) {
  return await swalWithBasicOptions(title, html).fire({
    preConfirm: () => {
      let roleAssigned: ROLES;
      let error: string = '';
      const name = (document.getElementById('name') as HTMLInputElement).value;
      const lastname = (document.getElementById('lastname') as HTMLInputElement)
        .value;
      const email = (document.getElementById('email') as HTMLInputElement)
        .value;
      const role = (document.getElementById('role') as HTMLInputElement).value;

      switch (role) {
        case ROLES.ADMIN:
          roleAssigned = ROLES.ADMIN;
          break;
        case ROLES.CLIENT:
          roleAssigned = ROLES.CLIENT;
          break;
      }

      if (!name) {
        error += 'Name is required';
      }

      if (!lastname) {
        error += 'Last Name is required';
      }

      if (!EMAIL_PATTERN.test(email)) {
        error += 'Email bad formatted';
      }

      if (error) {
        Swal.showValidationMessage(error);
      }

      return {
        name,
        lastname,
        email,
        role: roleAssigned,
        dateOfBirth: new Date().toISOString(),
      };
    },
  });
}

export async function infoDetailsBasic(
  title: string,
  html: string,
  width: number,
  confirmButtonText: string = 'Edit',
  cancelButtonText: string = 'Block'
): Promise<boolean> {
  const { value, dismiss } = await Swal.fire({
    title,
    html,
    width: `${width}px`,
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonColor: '#6c757d',
    cancelButtonColor: '#dc3545',
    confirmButtonText,
    cancelButtonText,
  });

  return value ? true : dismiss.toString() === 'cancel' ? false : undefined;
}
