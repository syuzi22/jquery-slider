import { Grid } from '../src/Grid'

describe('Grid testing', () => {
    it('zero', () => {
        let node = document.createElement('div');
        let grid = new Grid(node);
        grid.drawLabels_H(0);
        expect(node.childNodes.length).toBe(0);
    })
    it('negative', () => {
        let node = document.createElement('div');
        let grid = new Grid(node);
        grid.drawLabels_H(-3);
        expect(node.childNodes.length).toBe(0);
    })
});
