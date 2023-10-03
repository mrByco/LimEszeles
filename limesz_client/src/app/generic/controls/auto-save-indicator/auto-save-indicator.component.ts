import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { AutosaveService } from 'src/app/services/autosave.service';

@Component({
  selector: 'app-auto-save-indicator',
  templateUrl: './auto-save-indicator.component.html',
  styleUrls: ['./auto-save-indicator.component.scss']
})
export class AutoSaveIndicatorComponent implements OnInit {
  faCheck = faCheck;

  constructor(public autoSaveService: AutosaveService) { }

  ngOnInit(): void {
  }

}
