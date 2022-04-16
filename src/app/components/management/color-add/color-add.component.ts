import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  addColorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createAddColorForm();
  }

  createAddColorForm() {
    this.addColorForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  add() {
    if (this.addColorForm.valid) {
      let colorModel = Object.assign({}, this.addColorForm.value);
      this.colorService.addColor(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.message);
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
}
