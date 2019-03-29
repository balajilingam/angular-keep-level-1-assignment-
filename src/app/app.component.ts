import { Component } from '@angular/core';
import { Note } from './note'
import { NotesService } from './notes.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  errMessage: string;
  note: Note;
  noteList: Array<Note>;

  constructor(private noteService: NotesService) {
    this.note = new Note();
    this.noteList = [];
  }

  ngOnInit() {
    this.noteService.getNotes().subscribe(
      notesResponseList => {
        this.noteList = notesResponseList;
      },
      error => {
        console.log('error:' + error);
        this.errMessage = error.message;
      }
    );
  }

  addNote() {
    this.noteList.push(this.note);
    this.noteService.addNote(this.note).subscribe(addedNote => {
      console.log('addNote', addedNote);
    },
      error => {
        this.errMessage = error.message;
      }
    );
  }

}

