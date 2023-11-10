import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements AfterViewInit, OnDestroy {
  private reader: any = {} as any;
  public scannerControls: any | undefined;

  public inputDevices: MediaDeviceInfo[] = [];
  public notAllowedError: boolean = false;

  @Output()
  public onStopped: EventEmitter<void> = new EventEmitter();
  @Output()
  public onResult: EventEmitter<string> = new EventEmitter();

  public initializing: boolean = true;

  private _selectedDevice: MediaDeviceInfo | undefined;
  public get selectedDevice(): MediaDeviceInfo | undefined {
    return this._selectedDevice;
  }
  public set selectedDevice(value: MediaDeviceInfo | undefined) {
    this._selectedDevice = value;
    if (value) {
      localStorage.setItem("prefered-qr-scanner-device", value.deviceId);
      this.initializing = true;
      this.scan().finally(() => this.initializing = false);
    } else if (this.scannerControls) {
      this.scannerControls.stop();
      this.scannerControls = undefined;
    }
  }

  ngAfterViewInit(): void {
    this.init();
  }

  private async init() {
    await this.fetchDevices();
    await this.selectDefaultDevice();
    await this.scan();
    this.initializing = false;
  }

  private async fetchDevices() {
    //this.inputDevices = await BrowserCodeReader.listVideoInputDevices();

  }

  private async selectDefaultDevice() {
    const preferedDeviceId = localStorage.getItem("prefered-qr-scanner-device");
    if (preferedDeviceId) {
      const device = this.inputDevices.find(x => x.deviceId == preferedDeviceId);
      if (device) {
        this._selectedDevice = device;
        return;
      }
    }
    this._selectedDevice = this.inputDevices[0];
  }

  private async scan() {
    this.scannerControls?.stop();

    const previewElem = document.querySelector('#test-area-qr-code-webcam > video');

    try {
      const controls = await this.reader.decodeFromVideoDevice(this.selectedDevice.deviceId, previewElem as any, (result, error, controls) => {
        if (result) {
          console.log(result);
          this.onResult.emit(result.getText());
          controls.stop();
        }
      });
      this.scannerControls = controls;

      setTimeout(() => {
        controls.stop();
        this.scannerControls = undefined;
      }, 60000);
    } catch (ex) {
      if (ex == "NotAllowedError: Permission denied") {
        this.notAllowedError = true;
        return;
      }

    }
  }

  ngOnDestroy(): void {
    this.scannerControls?.stop();
  }


  startStopScanning() {
    if (this.scannerControls) {
      this.scannerControls.stop();
      this.scannerControls = undefined;
      this.onStopped.emit();
    } else {
      this.scan();
    }
  }


}
