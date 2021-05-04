import { AfterContentChecked, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { tap } from 'rxjs/operators';
import { BaseRequestObject } from 'src/app/core/class/base-request-object';
import { StandModel } from 'src/app/core/models/stand.model';
import { StandService } from 'src/app/core/services/stand.service';

@Component({
  selector: 'app-stand',
  templateUrl: './stand.component.html',
  styleUrls: ['./stand.component.scss']
})
export class StandComponent {
  standRequestObject = new BaseRequestObject<StandModel>();

  idFarm: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private standService: StandService,
  ) { }

  ngOnInit(): void {
    this.getStand();
  }

  private getStand() {
    this.idFarm = this.activatedRoute.snapshot.params['idFarm'];
    const idStand = this.activatedRoute.snapshot.params['idStand'];

    this.standRequestObject = new BaseRequestObject<StandModel>(
      this.standService.getStandById(idStand, this.idFarm).pipe(
        tap(response => {
          response.sampleList.forEach(sample => {
            // Calculo da estivativa de produção em um talhão
            sample.estimate = sample.quantityPlant * sample.mediaQuantityCerealsPlant * sample.mediaWeight / 1000;
          });

          this.standRequestObject.response = response;
        }),
      ));

      this.standRequestObject.observable.subscribe();
  }

}
