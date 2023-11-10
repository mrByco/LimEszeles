import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../../../api-providers/default-services/loading.service';
import { ThemeService } from '../../../../api-providers/default-services/theme.service';

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
