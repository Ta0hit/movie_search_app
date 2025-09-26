import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  @Output() clearEvent = new EventEmitter<void>();

  searchValue = signal<string>('');

  onSearchInput(): void {
    // todo
  }

  onSearch(): void {
    const query = this.searchValue().trim();
    if(query.length > 0) {
      this.searchEvent.emit(query);
    }
  }

  clearSearch(): void {
    this.searchValue.set('');
    this.clearEvent.emit();
  }
}
