import { Injectable } from '@angular/core';
import { GridItemComponent } from './grid-item/grid-item.component';

@Injectable()
export class GridLayoutService {

    items: GridItemComponent[] = [];

    constructor() { }

    registItem(item: GridItemComponent) {
        if (!this.items) {
            this.items = [];
        }
        this.items.push(item);
    }

    unregistItem(item) {
        const items = this.items;
        if (!items || items.length === 0) {
            return;
        }
        const index = items.indexOf(item);
        items.splice(index, 1);
    }

    getSiblings(item): GridItemComponent[] {
        const items = this.items;
        if (!items || items.length === 0) {
            return;
        }

        return items.filter(it => it !== item);
    }

    compact(item: GridItemComponent, cols = 12, type: 'horizontal' | 'vertical' = 'vertical') {
        const items = this.items;
        const compareWith = items.filter(it => !!it.static);
        const sorted = this._sortItems(items);

        sorted.forEach(it => {
            if (!it.static) {
                this._compactItem(compareWith, it, cols, type, sorted);
                compareWith.push(it);
            }
        });
    }

    private _compactItem(compareWith: GridItemComponent[], currentItem: GridItemComponent, cols: number, type: 'horizontal' | 'vertical', allSortedItems: GridItemComponent[]) {
        const compactV = type === 'vertical';
        const compactH = type === 'horizontal';
        // console.log('compact item', currentItem);

        if (compactV) {
            currentItem.rect.y = Math.min(this._bottom(compareWith), currentItem.rect.y);
            while (currentItem.rect.y > 0 && !this._getFirstCollision(compareWith, currentItem)) {
                currentItem.rect.y--;
            }
        } else if (compactH) {
            currentItem.rect.y = Math.min(this._bottom(compareWith), currentItem.rect.y); // TODO ？？好像有问题
            while (currentItem.rect.x > 0 && !this._getFirstCollision(compareWith, currentItem)) {
                currentItem.rect.x--;
            }
        }

        let collides;
        while (!!(collides = this._getFirstCollision(compareWith, currentItem))) {
            if (compactH) {
                this._resolveCompactionCollision(allSortedItems, currentItem, collides.rect.x + collides.rect.w, "x");
            } else if (compactV) {
                this._resolveCompactionCollision(allSortedItems, currentItem, collides.rect.y + collides.rect.h, "y");
            }
            // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.
            if (compactH && currentItem.rect.x + currentItem.rect.w > cols) {
                currentItem.rect.x = cols - currentItem.rect.w;
                currentItem.rect.y++;
            }
        }

        currentItem.patchStyle();
    }

    allBottom() {
        return this._bottom(this.items);
    }

    private _bottom(items: GridItemComponent[]) {
        const bottoms = items.map(it => {
            const { rect } = it;
            // console.log('rect', rect, it);
            return rect ? rect.y + rect.h : 0;
        });
        // console.log("bottoms", bottoms);
        return Math.max(...bottoms, 0);
    }

    private _getFirstCollision(items: GridItemComponent[], currentItem: GridItemComponent): GridItemComponent {
        return items.find(it => this._collides(it, currentItem));
    }

    private _collides(a: GridItemComponent, b: GridItemComponent): boolean {
        const rectA = a.rect;
        const rectB = b.rect;
        const same = a === b || rectA === rectB;
        const aIsLeftOfB = rectA.x + rectA.w <= rectB.x;
        const aIsRightOfB = rectA.x >= rectB.x + rectB.w;
        const aIsAboveB = rectA.y + rectA.h <= rectB.y;
        const aIsBelowB = rectA.y >= rectB.y + rectB.h;

        return !(same || aIsLeftOfB || aIsRightOfB || aIsAboveB || aIsBelowB);
    }

    private _resolveCompactionCollision(allSortedItems: GridItemComponent[], item: GridItemComponent, moveToCoord: number, axis: 'x' | 'y') {
        const heightWidth = { x: "w", y: "h" };
        const sizeProp = heightWidth[axis];
        item.rect[axis] += 1;
        const itemIndex = allSortedItems.indexOf(item)
        //   .map(layoutItem => {
        //     return layoutItem.i;
        //   })
        //   .indexOf(item.i);

        // Go through each item we collide with.
        for (let i = itemIndex + 1; i < allSortedItems.length; i++) {
            const otherItem = allSortedItems[i];
            // Ignore static items
            if (otherItem.static) continue;

            // Optimization: we can break early if we know we're past this el
            // We can do this b/c it's a sorted layout
            if (otherItem.rect.y > (item.rect.y + item.rect.h)) break;

            // if (this._collides(item, otherItem)) {
            //     this._resolveCompactionCollision(
            //         allSortedItems,
            //         otherItem,
            //         moveToCoord + item.rect[sizeProp],
            //         axis
            //     );
            // }
        }

        item.rect[axis] = moveToCoord;
    }

    private _sortItems(items: GridItemComponent[], type: 'horizontal' | 'vertical' = 'vertical'): GridItemComponent[] {
        if (type === 'horizontal') {
            return this._sortItemsByColRow(items);
        } else {
            return this._sortItemsByRowCol(items);
        }
    }

    private _sortItemsByRowCol(items: GridItemComponent[]): GridItemComponent[] {
        return [].concat(items).sort((a, b) => {
            const rectA = a.rect;
            const rectB = b.rect;

            if (rectA.y > rectB.y || (rectA.y === rectB.y && rectA.x > rectB.x)) {
                return 1;
            } else if (rectA.y === rectB.y && rectA.x === rectB.x) {
                return 0;
            } else {
                return -1;
            }
        });
    }

    private _sortItemsByColRow(items: GridItemComponent[]): GridItemComponent[] {
        return [].concat(items).sort((a, b) => {
            const rectA = a.rect;
            const rectB = b.rect;

            if (rectA.x > rectB.x || (rectA.x === rectB.x && rectA.y > rectB.y)) {
                return 1;
            } else if (rectA.x === rectB.x && rectA.y === rectB.y) {
                return 0;
            } else {
                return -1;
            }
        });
    }
}