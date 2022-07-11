import { IPrice } from '@core/models/price.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() isOpen = false;
  @Input() detailedPrices: IPrice[] = [];
  @Input() isLoading = false;
  @Input() existsDetailError = false;
  @Output() handleClose = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleCloseModal() {
    this.handleClose.emit();
  }
}
