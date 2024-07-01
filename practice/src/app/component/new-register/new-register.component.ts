import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, endpoints } from 'src/app/Config/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.component.html',
  styleUrls: ['./new-register.component.css'],
})
export class NewRegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  Apis = inject(ApiService);
  router = inject(Router);

  registerForm!: FormGroup;
  err: string | null = null;
  loading: boolean = false;
  avatar: File | null | undefined = null;
  imgSrc !: any;

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        firstName: [, Validators.required],
        lastName: [, Validators.required],
        email: [, [Validators.required, Validators.email]],
        phone: [, Validators.required],
        username: [, Validators.required],
        password: [, Validators.required],
        confirmPass: [, Validators.required],
      },
      {
        validators: this.controlValueError('password', 'confirmPass'),
      }
    );
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPass() {
    return this.registerForm.get('confirmPass');
  }

  register(event: Event) {
    event.preventDefault();
    if (
      this.registerForm.invalid ||
      this.registerForm.value.password !== this.registerForm.value.confirmPass
    ) {
      return;
    }

    this.loading = true;

    const formData = new FormData();
    for (const field in this.registerForm.value) {
      if (field !== 'confirmPass') {
        formData.append(field, this.registerForm.value[field]);
      }
    }

    if (this.avatar) {
      formData.append('avatar', this.avatar);
    }

    // console.log(formData);
    this.Apis.post(endpoints.register, formData).subscribe((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Congratulations',
        text: 'Chúc mừng bạn đã đăng ký thành công',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    });
  }

  onFileChange(event: Event) {
    this.avatar = (event.target as HTMLInputElement).files?.[0];
    this.imgSrc = URL.createObjectURL(this.avatar as any)
    // console.log(this.avatar)
  }

  private controlValueError(
    controlNameA: string,
    controlNameB: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueOfControlA = formGroup.get(controlNameA)?.value;
      const valueOfControlB = formGroup.get(controlNameB)?.value;

      if (valueOfControlA === valueOfControlB) {
        return null;
      } else {
        return { valuesNotMatch: true };
      }
    };
  }
}
