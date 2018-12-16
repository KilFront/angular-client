import {NgModule} from '@angular/core';
import {AvatarComponent} from './avatar.component';
import {CommonModule} from '@angular/common';

@NgModule({
  exports: [AvatarComponent],
  declarations: [AvatarComponent],
  imports: [CommonModule]
})
export class AvatarModule {
}
