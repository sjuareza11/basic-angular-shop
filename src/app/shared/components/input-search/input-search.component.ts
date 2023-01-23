import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSearchComponent implements OnInit {
  @Input() public idInput: string = 'search-input';
  @Output() public submitChanges: EventEmitter<string> = new EventEmitter<string>();
  public inputSearchField: string = '';
  constructor() { }

  ngOnInit(): void {
  }
}
