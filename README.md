### Virtualized List

### Running the app

### Setup

1. You will need a globally installed 'npm' CLI to run the project. All other dependencies are managed within the code.
2. Run 'npm install' from command line (at the 'my-app' directory)

### Run in Browser

Run 'npm start' from command line (at the 'my-app' directory)

### Run test cases

Run 'npm test' from command line (at the 'my-app' directory)

### Functionalities covered

1. Generated 200k records data (generated using Javascript).
2. Implemented Infinitescroll, Will be loading 50 records at a time.
3. Given a flexibility to add a new row, And it will added at the top of the list.
4. Given a flexibility to remove individual record from the table.
5. Added 'Top Page' link at the top of the page, to scroll to the top of the page.
6. Added unit test cases using React testing library.
7. Added styling.

Javascript code to generate Records:

let array=[];
for(let i=0;i<=200000;i++){
let obj={};
obj['id']=i,
obj['item']="item no "+ i,
obj['itemDesc']="item description of " + i,
obj['price']=i+100
array.push(obj);
}
console.log(array);
