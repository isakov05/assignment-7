import * as db from './transcriptManager';
import { addStudent } from './transcriptManager';

describe('Testing addStudent() method', () => {
  beforeEach(() => {
    db.initialize();
  });

  it('should create 4 dummy students when you call initialize()', () => {
    const transcripts = db.getAll();
    expect(transcripts.length).toBe(4);
  });

  it('should check valid inputs for addStudent()', () => {
    const lengthBefore = db.getAll().length;
    const newId = addStudent('Li');

    expect(typeof newId).toBe('number');
    expect(newId).toBeGreaterThanOrEqual(lengthBefore);
  });

  it('should check invalid inputs for addStudent()', () => {
    // invalid name cases
    expect(() => addStudent(null as unknown as string)).toThrow();
    expect(() => addStudent('')).toThrow();
    //expect(() => addStudent('A')).toThrow();
    //expect(() => addStudent('Abcd1234')).toThrow();
  });
});
