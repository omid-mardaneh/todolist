const fs = require('fs');
const yargs = require('yargs');
const titleOptions = {
    describe : 'Title of Note',
    demand : true,
    alias : 't'
};
const bodyOptions = {
    describe : 'Body of Note',
    demand : true,
    alias : 'b'
};
const argv = yargs.command('add','Add a note',{
    title : titleOptions,
    body : bodyOptions
})
.command('list','List all of notes')
.command('read','Read a notes',{
    title : titleOptions,
})
.command('remove','Remove a notes',{
    title : titleOptions,
})
.help().argv;




const command = argv._[0];
const { addNote , listNote , readNote, removeNote} = require('./notes');

if (command === 'add') {
    
    let note = addNote(argv.title,argv.body);

    if(note){
        console.log('Note Created!');
        console.log('--------------------');
        console.log(`Title : ${note.title} Body : ${note.body}`);
    }else{
        console.log('Note Title taken!');
    }


} else if (command === 'list') {

    let allNotes = listNote();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.map((note)=> console.log(`Title : ${note.title} Body : ${note.body}`));

} else if (command === 'read') {

    let note = readNote(argv.title);
    if(note){
        console.log('Note was Found');
        console.log('--------------------');
        console.log(`Title : ${note.title} Body : ${note.body}`);
    }else {
        console.log('Notes not Found!');
    }

} else if (command === 'remove') {
    let noteRemove = removeNote(argv.title);
    let message = noteRemove ? `Note was removed` : 'Note not found!';
    console.log(message);
} else {
    console.log('Not Found!');
}
