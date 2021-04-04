import { Component, OnInit } from '@angular/core';
import { ROLES } from '@core/enums/roles';
import {
  RegisterData,
  UpdateData,
} from '@core/interfaces/forms/register.interface';
import { User } from '@core/interfaces/models/user.interface';
import { IResultData } from '@core/interfaces/results/result-data.interface';
import { ITableColumns } from '@core/interfaces/ui/table-columns.interface';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import {
  formBasicDialog,
  infoDetailsBasic,
  userFormBasicDialog,
} from '@shared/alerts/alerts';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { DocumentNode } from 'graphql';
import { UsersAdminService } from './users-admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  query: DocumentNode = USERS_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  readonly columns: Array<ITableColumns> = [
    {
      property: 'id',
      label: '#',
    },
    {
      property: 'name',
      label: 'Name',
    },
    {
      property: 'lastname',
      label: 'Lastname',
    },
    {
      property: 'email',
      label: 'Email',
    },
    {
      property: 'role',
      label: 'Role',
    },
  ];

  constructor(private usersAdminService: UsersAdminService) {}

  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      listKey: 'users',
      definitionKey: 'users',
    };
    this.include = true;
  }

  public async addUser(): Promise<void> {
    const html = this.initializeAddUserForm();

    const result = await userFormBasicDialog('Add User', html);

    if (result.value) {
      const user: RegisterData = {
        ...result.value,
        password: '1234',
        active: false,
      };
      this.usersAdminService.register(user).subscribe((result) => {
        if (result.status) {
          basicAlert(result.message, TYPE_ALERT.SUCCESS);
        } else {
          basicAlert(result.message, TYPE_ALERT.ERROR);
        }
      });
    }
  }

  public async infoUser(user: User): Promise<void> {
    const result = await infoDetailsBasic(
      `Details ${user.name}`,
      `${user.name} ${user.lastname}<br/>
      ${user.email}`,
      375
    );
  }

  public async editUser(user: User): Promise<void> {
    const html = this.initializeUpdateUserForm(user);

    const result = await userFormBasicDialog('Edit User', html);

    if (result.value) {
      const userToUpdate: UpdateData = this.mapUserTable2UserData({
        ...user,
        ...result.value,
      });

      this.usersAdminService.update(userToUpdate).subscribe((result) => {
        if (result.status) {
          basicAlert(result.message, TYPE_ALERT.SUCCESS);
        } else {
          basicAlert(result.message, TYPE_ALERT.ERROR);
        }
      });
    }
  }

  public async blockUser(user: User): Promise<void> {}

  private initializeAddUserForm(): string {
    return `
      <input id="name" value="" class="swal2-input" required placeholder="Name">
      <input id="lastname" value="" class="swal2-input" required placeholder="Last Name">
      <input id="email" value="" class="swal2-input" required placeholder="Email">
      <select id="role" class="swal2-input">
        <option value="ADMIN">Admin</option>
        <option value="CLIENT">Client</option>
      </select>
    `;
  }

  private initializeUpdateUserForm(user: User): string {
    const roles = new Array(2);
    roles[0] = user.role === ROLES.ADMIN ? 'selected' : '';
    roles[1] = user.role === ROLES.CLIENT ? 'selected' : '';
    return `
      <input id="name" value="${user.name}" class="swal2-input" required placeholder="Name">
      <input id="lastname" value="${user.lastname}" class="swal2-input" required placeholder="Last Name">
      <input id="email" value="${user.email}" class="swal2-input" required placeholder="Email">
      <select id="role" class="swal2-input">
        <option value="ADMIN" ${roles[0]}>Admin</option>
        <option value="CLIENT" ${roles[1]}>Client</option>
      </select>
    `;
  }

  private mapUserTable2UserData({
    active,
    email,
    id,
    lastname,
    name,
    role,
    dateOfBirth,
  }: User): UpdateData {
    return {
      active,
      email,
      lastname,
      name,
      id,
      role,
      dateOfBirth,
    };
  }
}
