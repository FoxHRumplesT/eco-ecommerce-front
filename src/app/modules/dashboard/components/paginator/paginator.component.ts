import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {

  @Input() currentPage: number;
  @Input() perPage = 1;
  @Input() total = 0;
  @Output() selectPage: EventEmitter<number> = new EventEmitter();

  get pagesToShow(): Array<number> {
    const x = Math.ceil((this.total / this.perPage) || 0);
    return [].constructor(x);
  }

  get showPreview(): boolean {
    return this.currentPage !== 1;
  }

  get showNext(): boolean {
    return this.pagesToShow.length !== this.currentPage;
  }

  public isCurrentPage(index: number): boolean {
    return (index + 1) === this.currentPage;
  }

  public selectPreview(): void {
    this.selectPage.emit(this.currentPage - 1);
  }

  public selectNext(): void {
    this.selectPage.emit(this.currentPage + 1);
  }

}
