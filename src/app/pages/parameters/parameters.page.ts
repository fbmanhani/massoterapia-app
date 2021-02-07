import { Component, OnInit } from '@angular/core';
import { Parameters } from 'src/app/core/models/parameters';
import { Unit } from 'src/app/core/models/unit';
import { ParametersService } from 'src/app/services/parameters.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.page.html',
  styleUrls: ['./parameters.page.scss'],
})
export class ParametersPage implements OnInit {
  constructor(private unitService: UnitService, private paramsService: ParametersService) {}

  private units = new Array<Unit>();
  private parameters = new Array<Parameters>();

  ngOnInit() {
    this.loadUnits();
  }

  async loadUnits() {
    this.units = await this.unitService.findAll();
  }
}
