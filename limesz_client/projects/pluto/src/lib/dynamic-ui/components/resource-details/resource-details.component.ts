import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../../api-providers/default-services/loading.service';
import { FieldChange } from '../../../api-providers/generated-api/models/field-change';
import { PlResource } from '../../directives/pl-resource.directive';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrls: ['./resource-details.component.scss'],
})
export class ResourceDetailsComponent {

  private router = inject(Router);
  private loadingService = inject(LoadingService);

  @ViewChild(PlResource) public resource: PlResource;

  public resourceType: string;
  public objectId: string;

  private changes: FieldChange[] = [];

  constructor(protected activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(p => {
      let resourceName = p.resourceName;
      let id = p.id;
      if (!resourceName || !id) {
        return;
      }
      this.resourceType = resourceName;
      this.objectId = id;
    });
  }

  protected removeResource = async () => {
    // TODO call directive to remove
    await this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  };

  protected updateResource = async () => {
    await this.resource.save()
  }

  public registerChange = (path: string, value: any) => {

    if (!path){
      // print stack trace
      // console.log("Path is null");
      // console.log(new Error().stack);
    }

    function isCommand(value): boolean {
      return typeof value === "string" && value.startsWith('$') && value.endsWith('$');
    }
    let lastWasCommand = isCommand(this.changes[this.changes.length - 1]?.value)
    let currentIsCommand = isCommand(value)

    let lastWasSamePath = this.changes.length > 0 && this.changes[this.changes.length - 1].path === path;

    if (!currentIsCommand && !lastWasCommand && lastWasSamePath) {
      this.changes[this.changes.length - 1].value = value;
    }else {
      this.changes.push({ path: path, value: value });
      console.log("Changes:");
      console.log(this.changes);
      this.changes.forEach(c => console.log(c.path + " = " + c.value?.toString()));
    }
  };

}
