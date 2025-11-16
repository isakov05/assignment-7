// manage the transcript database
export type StudentID = number;
export type Student = { studentID: number; studentName: string };
export type Course = string;
export type CourseGrade = { course: Course; grade: number };
export type Transcript = { student: Student; grades: CourseGrade[] };

// the database of transcripts
let allTranscripts: Transcript[] = [];

export function initialize(): void {
  allTranscripts = [];

  addStudent('Sardor', [
    { course: 'CS360', grade: 100 },
    { course: 'CS411', grade: 100 },
  ]);

  addStudent('Jasur', [{ course: 'CS360', grade: 80 }]);

  addStudent('Jasur', [
    { course: 'CS360', grade: 85 },
    { course: 'CS360', grade: 40 },
  ]);

  addStudent('Nigora', [{ course: 'CS360', grade: 100 }]);
}

export function getAll(): Transcript[] {
  return allTranscripts;
}

// manages the student IDs
class StudentIDManager {
  private static lastUsedID = 0;

  public static newID(): number {
    StudentIDManager.lastUsedID += 1;
    return StudentIDManager.lastUsedID;
  }
}

// relies on freshness of studentIDs
export function addStudent(name: string, grades: CourseGrade[] = []): StudentID {
  if (name === null) throw new Error("Name can't be null");
  if (name.length === 0) throw new Error("Name can't be empty");

  const newID = StudentIDManager.newID();
  const newStudent: Student = { studentID: newID, studentName: name };
  allTranscripts.push({ student: newStudent, grades });
  return newID;
}

// gets transcript for given ID. Returns undefined if missing
export function getTranscript(studentID: StudentID): Transcript | undefined {
  return allTranscripts.find(t => t.student.studentID === studentID);
}

// gets studentIDs matching a given name
export function getStudentIDs(studentName: string): StudentID[] {
  return allTranscripts
    .filter(t => t.student.studentName === studentName)
    .map(t => t.student.studentID);
}

// deletes student with the given ID from the database
export function deleteStudent(studentID: StudentID): void {
  const index = allTranscripts.findIndex(t => t.student.studentID === studentID);
  if (index === -1) {
    throw new Error(`no student with ID = ${studentID}`);
  }
  allTranscripts.splice(index, 1);
}

export function addGrade(studentID: StudentID, course: Course, grade: number): void {
  const tIndex = allTranscripts.findIndex(t => t.student.studentID === studentID);
  if (tIndex === -1) {
    throw new Error(`no student with ID = ${studentID}`);
  }

  const transcript = allTranscripts[tIndex];

  // call helper for immutability
  try {
    const updated = addGradeToTranscript(transcript, course, grade);
    allTranscripts[tIndex] = updated;
  } catch {
    throw new Error(`student ${studentID} already has a grade in course ${course}`);
  }
}

// helper to add new grade
function addGradeToTranscript(
  theTranscript: Transcript,
  course: Course,
  grade: number,
): Transcript {
  const { grades } = theTranscript;

  if (grades.some(entry => entry.course === course)) {
    throw new Error();
  }

  return { student: theTranscript.student, grades: [...grades, { course, grade }] };
}

// gets the grade for the given student in a course
export function getGrade(studentID: StudentID, course: Course): number {
  const transcript = allTranscripts.find(t => t.student.studentID === studentID);

  if (!transcript) {
    throw new Error(`no student with ID = ${studentID}`);
  }

  const entry = transcript.grades.find(g => g.course === course);

  if (!entry) {
    throw new Error(`no grade for student ${studentID} in course ${course}`);
  }

  return entry.grade;
}
