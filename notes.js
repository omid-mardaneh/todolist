const fs = require('fs');

let fetchNotes = () =>{

    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (error) {
        return [];
    }

}

let saveNotes = (notes) =>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

let addNote = ( title,body ) =>{
    let notes = fetchNotes();
    let note = {
        title : title,
        body : body
    }

    let duplicateNotes = notes.filter((note)=> note.title === title);

    if(duplicateNotes.length == 0 ){
        notes.push(note);
        saveNotes(notes);
        return note;
    }

}

let listNote = () =>{
    return fetchNotes();
}

let readNote = (title) =>{
    let notes = fetchNotes();
    let filterNotes = notes.filter((note)=> note.title === title);
    return filterNotes[0];
}

let removeNote = (title) =>{
    let notes = fetchNotes();
    let filterNotes = notes.filter((note)=> note.title !== title );
    saveNotes(filterNotes);
    return notes.length != filterNotes.length;  
}

module.exports = {
    addNote,
    listNote,
    readNote,
    removeNote
}
