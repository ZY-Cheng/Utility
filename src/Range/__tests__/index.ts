import PointRangeComparator, { getPointRelation, PointRelation, PointRangeRelation } from '../index';

describe('testing function getPointRelation()', () => {
  describe('points at the same row', () => {
    const point1 = { row: 1, col: 1 };
    const point2 = { row: 1, col: 4 };

    test(`point:${JSON.stringify(point1)} before point:${JSON.stringify(point2)}`, () => {
      const relation = getPointRelation(point1, point2);
      expect(relation).toBe(PointRelation.BEFORE);
      expect(relation).not.toBe(PointRelation.EQUAL);
      expect(relation).not.toBe(PointRelation.AFTER);
    });

    const point3 = { row: 1, col: 1 };
    const point4 = { row: 1, col: 1 };

    test(`point:${JSON.stringify(point3)} equal to point:${JSON.stringify(point4)}`, () => {
      const relation = getPointRelation(point3, point4);
      expect(relation).not.toBe(PointRelation.BEFORE);
      expect(relation).toBe(PointRelation.EQUAL);
      expect(relation).not.toBe(PointRelation.AFTER);
    });

    const point5 = { row: 1, col: 5 };
    const point6 = { row: 1, col: 1 };

    test(`point:${JSON.stringify(point5)} after point:${JSON.stringify(point6)}`, () => {
      const relation = getPointRelation(point5, point6);
      expect(relation).not.toBe(PointRelation.BEFORE);
      expect(relation).not.toBe(PointRelation.EQUAL);
      expect(relation).toBe(PointRelation.AFTER);
    });
  });

  describe('points at the different row', () => {
    const point1 = { row: 0, col: 1 };
    const point2 = { row: 1, col: 4 };

    test(`point:${JSON.stringify(point1)} before point:${JSON.stringify(point2)}`, () => {
      const relation = getPointRelation(point1, point2);
      expect(relation).toBe(PointRelation.BEFORE);
      expect(relation).not.toBe(PointRelation.EQUAL);
      expect(relation).not.toBe(PointRelation.AFTER);
    });

    const point3 = { row: 6, col: 5 };
    const point4 = { row: 4, col: 1 };

    test(`point:${JSON.stringify(point3)} after point:${JSON.stringify(point4)}`, () => {
      const relation = getPointRelation(point3, point4);
      expect(relation).not.toBe(PointRelation.BEFORE);
      expect(relation).not.toBe(PointRelation.EQUAL);
      expect(relation).toBe(PointRelation.AFTER);
    });
  });
});

describe('testing function getPointRangeRelation()', () => {
  const range1 = { start: { row: 6, col: 5 }, end: { row: 6, col: 10 } };
  const comparator = new PointRangeComparator(range1);

  describe('equal', () => {
    const range2 = { start: { row: 6, col: 5 }, end: { row: 6, col: 10 } };

    test(`range:${JSON.stringify(range1)} EQUAL range:${JSON.stringify(range2)}`, () => {
      const relation = comparator.getRelation(range2);
      expect(relation).toBe(PointRangeRelation.EQUAL);
      expect(comparator.isEqual(range2)).toBe(true);
    });
  });

  describe('before', () => {
    const range3 = { start: { row: 7, col: 5 }, end: { row: 8, col: 5 } };

    test(`range:${JSON.stringify(range1)} BEFORE range:${JSON.stringify(range3)}`, () => {
      const relation = comparator.getRelation(range3);
      expect(relation).toBe(PointRangeRelation.BEFORE);
    });
  });

  describe('in', () => {
    const range4 = { start: { row: 6, col: 5 }, end: { row: 6, col: 11 } };

    test(`range:${JSON.stringify(range1)} IN_START range:${JSON.stringify(range4)}`, () => {
      const relation = comparator.getRelation(range4);
      expect(relation).toBe(PointRangeRelation.IN_START);
      expect(comparator.isIn(range4)).toBe(true);
    });

    const range41 = { start: { row: 6, col: 3 }, end: { row: 6, col: 10 } };

    test(`range:${JSON.stringify(range1)} IN_END range:${JSON.stringify(range41)}`, () => {
      const relation = comparator.getRelation(range41);
      expect(relation).toBe(PointRangeRelation.IN_END);
      expect(comparator.isIn(range41)).toBe(true);
    });

    const range42 = { start: { row: 6, col: 3 }, end: { row: 6, col: 11 } };

    test(`range:${JSON.stringify(range1)} MID_IN range:${JSON.stringify(range42)}`, () => {
      const relation = comparator.getRelation(range42);
      expect(relation).toBe(PointRangeRelation.MID_IN);
      expect(comparator.isIn(range42)).toBe(true);
    });
  });

  describe('include', () => {
    const range5 = { start: { row: 6, col: 6 }, end: { row: 6, col: 10 } };

    test(`range:${JSON.stringify(range1)} END_INCLUDE range:${JSON.stringify(range5)}`, () => {
      const relation = comparator.getRelation(range5);
      expect(relation).toBe(PointRangeRelation.END_INCLUDE);
      expect(comparator.isInclude(range5)).toBe(true);
    });

    const range51 = { start: { row: 6, col: 6 }, end: { row: 6, col: 9 } };

    test(`range:${JSON.stringify(range1)} MID_INCLUDE range:${JSON.stringify(range51)}`, () => {
      const relation = comparator.getRelation(range51);
      expect(relation).toBe(PointRangeRelation.MID_INCLUDE);
      expect(comparator.isInclude(range51)).toBe(true);
    });

    const range52 = { start: { row: 6, col: 5 }, end: { row: 6, col: 8 } };

    test(`range:${JSON.stringify(range1)} START_INCLUDE range:${JSON.stringify(range52)}`, () => {
      const relation = comparator.getRelation(range52);
      expect(relation).toBe(PointRangeRelation.START_INCLUDE);
      expect(comparator.isInclude(range52)).toBe(true);
    });
  });

  describe('intersect', () => {
    const range6 = { start: { row: 6, col: 6 }, end: { row: 8, col: 5 } };

    test(`range:${JSON.stringify(range1)} END_INTERSECT range:${JSON.stringify(range6)}`, () => {
      const relation = comparator.getRelation(range6);
      expect(relation).toBe(PointRangeRelation.END_INTERSECT);
      expect(comparator.isIntersect(range6)).toBe(true);
    });

    const range61 = { start: { row: 3, col: 6 }, end: { row: 6, col: 7 } };

    test(`range:${JSON.stringify(range1)} START_INTERSECT range:${JSON.stringify(range61)}`, () => {
      const relation = comparator.getRelation(range61);
      expect(relation).toBe(PointRangeRelation.START_INTERSECT);
      expect(comparator.isIntersect(range61)).toBe(true);
    });
  });

  describe('adjacent', () => {
    const range7 = { start: { row: 6, col: 10 }, end: { row: 8, col: 5 } };

    test(`range:${JSON.stringify(range1)} END_ADJACENT range:${JSON.stringify(range7)}`, () => {
      const relation = comparator.getRelation(range7);
      expect(relation).toBe(PointRangeRelation.END_ADJACENT);
      expect(comparator.isAdjacent(range7)).toBe(true);
    });

    const range71 = { start: { row: 6, col: 4 }, end: { row: 6, col: 5 } };

    test(`range:${JSON.stringify(range1)} START_ADJACENT range:${JSON.stringify(range71)}`, () => {
      const relation = comparator.getRelation(range71);
      expect(relation).toBe(PointRangeRelation.START_ADJACENT);
      expect(comparator.isAdjacent(range71)).toBe(true);
    });
  });

  describe('after', () => {
    const range8 = { start: { row: 6, col: 0 }, end: { row: 6, col: 3 } };

    test(`range:${JSON.stringify(range1)} AFTER range:${JSON.stringify(range8)}`, () => {
      const relation = comparator.getRelation(range8);
      expect(relation).toBe(PointRangeRelation.AFTER);
    });
  });
});
