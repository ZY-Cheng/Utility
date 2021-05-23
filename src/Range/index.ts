export interface Point {
  row: number;
  col: number;
}

export interface PointRange {
  start: Point; // closed;
  end: Point; // opened;
}

export interface SimplePointRange {
  start: number; // closed;
  end: number; // opened;
}

type NodeRange = Pick<Selection, 'anchorNode' | 'anchorOffset' | 'focusNode' | 'focusOffset'>;

export enum PointRelation {
  BEFORE = -1,
  EQUAL = 0,
  AFTER = 1,
}

export function getPointRelation(mainPoint: Point, point: Point): PointRelation {
  if (mainPoint.row === point.row) {
    if (mainPoint.col === point.col) {
      return PointRelation.EQUAL;
    }
    if (mainPoint.col < point.col) {
      return PointRelation.BEFORE;
    }
    return PointRelation.AFTER;
  }
  if (mainPoint.row < point.row) {
    return PointRelation.BEFORE;
  }
  return PointRelation.AFTER;
}
export function getSimplePointRelation(mainPoint: number, point: number): PointRelation {
  if (mainPoint === point) {
    return PointRelation.EQUAL;
  }
  if (mainPoint < point) {
    return PointRelation.BEFORE;
  }
  return PointRelation.AFTER;
}

export enum PointRangeRelation {
  BEFORE = 'BEFORE',
  END_INTERSECT = 'END_INTERSECT',
  END_ADJACENT = 'END_ADJACENT',
  START_INCLUDE = 'START_INCLUDE',
  IN_START = 'IN_START',
  MID_IN = 'MID_IN',
  MID_INCLUDE = 'MID_INCLUDE',
  EQUAL = 'EQUAL',
  IN_END = 'IN_END',
  END_INCLUDE = 'END_INCLUDE',
  START_ADJACENT = 'START_ADJACENT',
  START_INTERSECT = 'START_INTERSECT',
  AFTER = 'AFTER',
}

export function getPointRangeRelation(mainPointRange: PointRange, pointRange: PointRange): PointRangeRelation {
  if (getPointRelation(mainPointRange.end, pointRange.start) === PointRelation.BEFORE) {
    return PointRangeRelation.BEFORE;
  }
  if (getPointRelation(mainPointRange.end, pointRange.start) === PointRelation.EQUAL) {
    return PointRangeRelation.END_ADJACENT;
  }
  if (getPointRelation(mainPointRange.end, pointRange.start) === PointRelation.AFTER) {
    if (getPointRelation(mainPointRange.end, pointRange.end) === PointRelation.BEFORE) {
      if (getPointRelation(mainPointRange.start, pointRange.start) === PointRelation.BEFORE) {
        return PointRangeRelation.END_INTERSECT;
      }
      if (getPointRelation(mainPointRange.start, pointRange.start) === PointRelation.EQUAL) {
        return PointRangeRelation.IN_START;
      }
      return PointRangeRelation.MID_IN;
    }
    if (getPointRelation(mainPointRange.end, pointRange.end) === PointRelation.EQUAL) {
      if (getPointRelation(mainPointRange.start, pointRange.start) === PointRelation.BEFORE) {
        return PointRangeRelation.END_INCLUDE;
      }
      if (getPointRelation(mainPointRange.start, pointRange.start) === PointRelation.EQUAL) {
        return PointRangeRelation.EQUAL;
      }
      return PointRangeRelation.IN_END;
    }

    if (getPointRelation(mainPointRange.end, pointRange.end) === PointRelation.AFTER) {
      if (getPointRelation(mainPointRange.start, pointRange.start) === PointRelation.BEFORE) {
        return PointRangeRelation.MID_INCLUDE;
      }
      if (getPointRelation(mainPointRange.start, pointRange.start) === PointRelation.EQUAL) {
        return PointRangeRelation.START_INCLUDE;
      }
      if (getPointRelation(mainPointRange.start, pointRange.start) === PointRelation.AFTER) {
        if (getPointRelation(mainPointRange.start, pointRange.end) === PointRelation.BEFORE) {
          return PointRangeRelation.START_INTERSECT;
        }
        if (getPointRelation(mainPointRange.start, pointRange.end) === PointRelation.EQUAL) {
          return PointRangeRelation.START_ADJACENT;
        }
      }
    }
  }
  return PointRangeRelation.AFTER;
}

export function getSimplePointRangeRelation(
  mainPointRange: SimplePointRange,
  pointRange: SimplePointRange
): PointRangeRelation {
  if (getSimplePointRelation(mainPointRange.end, pointRange.start) === PointRelation.BEFORE) {
    return PointRangeRelation.BEFORE;
  }
  if (getSimplePointRelation(mainPointRange.end, pointRange.start) === PointRelation.EQUAL) {
    return PointRangeRelation.END_ADJACENT;
  }
  if (getSimplePointRelation(mainPointRange.end, pointRange.start) === PointRelation.AFTER) {
    if (getSimplePointRelation(mainPointRange.end, pointRange.end) === PointRelation.BEFORE) {
      if (getSimplePointRelation(mainPointRange.start, pointRange.start) === PointRelation.BEFORE) {
        return PointRangeRelation.END_INTERSECT;
      }
      if (getSimplePointRelation(mainPointRange.start, pointRange.start) === PointRelation.EQUAL) {
        return PointRangeRelation.IN_START;
      }
      return PointRangeRelation.MID_IN;
    }
    if (getSimplePointRelation(mainPointRange.end, pointRange.end) === PointRelation.EQUAL) {
      if (getSimplePointRelation(mainPointRange.start, pointRange.start) === PointRelation.BEFORE) {
        return PointRangeRelation.END_INCLUDE;
      }
      if (getSimplePointRelation(mainPointRange.start, pointRange.start) === PointRelation.EQUAL) {
        return PointRangeRelation.EQUAL;
      }
      return PointRangeRelation.IN_END;
    }

    if (getSimplePointRelation(mainPointRange.end, pointRange.end) === PointRelation.AFTER) {
      if (getSimplePointRelation(mainPointRange.start, pointRange.start) === PointRelation.BEFORE) {
        return PointRangeRelation.MID_INCLUDE;
      }
      if (getSimplePointRelation(mainPointRange.start, pointRange.start) === PointRelation.EQUAL) {
        return PointRangeRelation.START_INCLUDE;
      }
      if (getSimplePointRelation(mainPointRange.start, pointRange.start) === PointRelation.AFTER) {
        if (getSimplePointRelation(mainPointRange.start, pointRange.end) === PointRelation.BEFORE) {
          return PointRangeRelation.START_INTERSECT;
        }
        if (getSimplePointRelation(mainPointRange.start, pointRange.end) === PointRelation.EQUAL) {
          return PointRangeRelation.START_ADJACENT;
        }
      }
    }
  }
  return PointRangeRelation.AFTER;
}

export function isInclude(relation: PointRangeRelation): boolean {
  return (
    relation === PointRangeRelation.END_INCLUDE ||
    relation === PointRangeRelation.START_INCLUDE ||
    relation === PointRangeRelation.MID_INCLUDE
  );
}
export function isAdjacent(relation: PointRangeRelation): boolean {
  return relation === PointRangeRelation.END_ADJACENT || relation === PointRangeRelation.START_ADJACENT;
}
export function isIntersect(relation: PointRangeRelation): boolean {
  return relation === PointRangeRelation.END_INTERSECT || relation === PointRangeRelation.START_INTERSECT;
}
export function isIn(relation: PointRangeRelation): boolean {
  return (
    relation === PointRangeRelation.IN_END ||
    relation === PointRangeRelation.IN_START ||
    relation === PointRangeRelation.MID_IN
  );
}

class PointRangeComparator {
  pointRange: PointRange | SimplePointRange;

  constructor(pointRange: PointRange | SimplePointRange) {
    this.pointRange = pointRange;
  }

  get type(): 'simple' | 'paragraph' {
    return typeof this.pointRange.start === 'number' ? 'simple' : 'paragraph';
  }

  getRelation(sourcePointRange: PointRange | SimplePointRange): PointRangeRelation {
    if (this.type === 'paragraph') {
      return getPointRangeRelation(this.pointRange as PointRange, sourcePointRange as PointRange);
    }
    return getSimplePointRangeRelation(this.pointRange as SimplePointRange, sourcePointRange as SimplePointRange);
  }

  isEqual(sourcePointRange: PointRange | SimplePointRange): boolean {
    return this.getRelation(sourcePointRange) === PointRangeRelation.EQUAL;
  }

  isInclude(sourcePointRange: PointRange | SimplePointRange): boolean {
    const relation = this.getRelation(sourcePointRange);
    return isInclude(relation);
  }

  isIn(sourcePointRange: PointRange | SimplePointRange): boolean {
    const relation = this.getRelation(sourcePointRange);
    return isIn(relation);
  }

  isIntersect(sourcePointRange: PointRange | SimplePointRange): boolean {
    const relation = this.getRelation(sourcePointRange);
    return isIntersect(relation);
  }

  isAdjacent(sourcePointRange: PointRange | SimplePointRange): boolean {
    const relation = this.getRelation(sourcePointRange);
    return isAdjacent(relation);
  }
}

export default PointRangeComparator;
