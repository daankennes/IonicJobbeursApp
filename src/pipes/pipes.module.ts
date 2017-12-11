import { NgModule } from '@angular/core';
import { StylePipe } from './style/style';
import { CssPipe } from './css/css';
import { FullTextSearchPipe } from './full-text-search/full-text-search';
import { GroupSelectionPipe } from './group-selection/group-selection';
@NgModule({
	declarations: [StylePipe,
    CssPipe,
    FullTextSearchPipe,
    GroupSelectionPipe],
	imports: [],
	exports: [StylePipe,
    CssPipe,
    FullTextSearchPipe,
    GroupSelectionPipe]
})
export class PipesModule {}
