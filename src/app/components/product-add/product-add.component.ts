import { Component, OnInit } from '@angular/core';
import {  FormGroup,FormBuilder,FormControl,Validators,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      // ürün eklerken, formda olmasını istediğimiz alanları buraya yazıyoruz.
      productName: ['', Validators.required], //ilk değer, productName'in default'U
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  add(){
    if(this.productAddForm.valid){
      let productModel = Object.assign({}, this.productAddForm.value)
      this.productService.add(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responsError=>{
        if(responsError.error.Errors.length>0){
          for (let i = 0; i<responsError.error.Errors.length; i++) {
            this.toastrService.error(responsError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
          //this.toastrService.error(responsError.error.Errors,"Doğrulama Hatası")
        }
      })
    }else{
      this.toastrService.error("Form eksik.","Dikkat")
    }
  }
}