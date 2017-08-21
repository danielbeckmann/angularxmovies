import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './safe.pipe';
import { YoutubeEmbedPipe } from './youtube-embed.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SafePipe,
        YoutubeEmbedPipe
    ],
    exports: [
        SafePipe,
        YoutubeEmbedPipe
    ]
})
export class SharedModule { }
