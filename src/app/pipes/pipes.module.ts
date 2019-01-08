import { NgModule } from '@angular/core';

// Pipes
import { ImagenPipe } from './imagen.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
  ],
  exports: [
    ImagenPipe,
  ]

})
export class PipesModule { }
