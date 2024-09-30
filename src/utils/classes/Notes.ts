import type NoteType from '../../utils/types/noteType';
import type TaskType from '../../utils/types/taskType';

export class NotesService {
  private notes: NoteType[] = [];
  private currentIndex: number = 1;
  private static taskIndex: number = 1;

  static generateEmptyNote(): NoteType {
    return {
      id: 0,
      title: '',
      tasks: [] as TaskType[],
    }
  }
  
  static addEmptyTasks(amount = 1) {
    const emptyTaskList: TaskType[] = [];
    
    for (let i = 0; i < amount; i++) {
      emptyTaskList.push({
        id: this.taskIndex++,
        text: '',
        checked: false,
      } as TaskType)
    }
    
    return emptyTaskList;
  }

  addNote(note: NoteType): void {
    note.id = this.currentIndex++;
    this.notes.push({
      ...note,
      id: this.currentIndex++,
      tasks: note.tasks.filter(task => !!task.text),
    });
  }

  getNotes(): NoteType[] {
    return this.notes;
  }

  getNoteById(id: number): NoteType | undefined {
    return this.notes.find((note) => note.id === id);
  }

  updateNoteById(id: number, updatedNote: NoteType, filterEmpty = true): boolean {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      this.notes[index] = {
        id,
        title: updatedNote.title,
        tasks: filterEmpty ? updatedNote.tasks.filter(task => !!task.text) : updatedNote.tasks,
      };
      return true;
    }

    return false;
  }

  deleteNoteById(id: number) {
    const index = this.notes.findIndex((note) => note.id === id);

    if (index !== -1) {
      this.notes.splice(index, 1);
      return true;
    }

    return false;
  }
}