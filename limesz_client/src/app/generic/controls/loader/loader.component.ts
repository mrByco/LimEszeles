import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public loaderStyle: string = '3px solid ';
  constructor(public loadingService: LoadingService, public themeService: ThemeService) { }

  ngOnInit(): void {

  }

}
