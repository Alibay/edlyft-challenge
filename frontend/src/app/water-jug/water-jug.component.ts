import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRequest, IResult, THumanReadableOperation } from '../types';
import { WaterJugService } from '../water-jug.service';

@Component({
  selector: 'app-water-jug',
  templateUrl: './water-jug.component.html',
  styleUrls: ['./water-jug.component.css']
})
export class WaterJugComponent implements OnInit {

  loading = false;

  result?: IResult<THumanReadableOperation> = undefined;

  form = new FormGroup({
    x: new FormControl(),
    y: new FormControl(),
    z: new FormControl(),
  })

  constructor(
    private readonly waterJugService: WaterJugService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      x: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      y: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      z: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  get x() { return this.form.get('x'); }

  get y() { return this.form.get('y'); }

  get z() { return this.form.get('z'); }

  onSubmit(value: IRequest) {
    this.loading = true;
    this.waterJugService.solve(value)
      .subscribe(result => {
        this.loading = false;
        this.result = result;
      });
  }
}

