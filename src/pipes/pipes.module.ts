import { NgModule } from '@angular/core';
import { StylePipe } from './style/style';
import { CssPipe } from './css/css';
import { FullTextSearchPipe } from './full-text-search/full-text-search';
import { GroupSelectionPipe } from './group-selection/group-selection';
import { FavoriteSelectionPipe } from './favorite-selection/favorite-selection';
@NgModule({
	declarations: [StylePipe,
    CssPipe,
    FullTextSearchPipe,
    GroupSelectionPipe,
    FavoriteSelectionPipe],
	imports: [],
	exports: [StylePipe,
    CssPipe,
    FullTextSearchPipe,
    GroupSelectionPipe,
    FavoriteSelectionPipe]
})
export class PipesModule {}
