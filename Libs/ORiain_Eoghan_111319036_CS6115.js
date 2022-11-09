let icon, target = null;
let popupMenu = null;
var selectedIcon = null;
var fileName = null;
var fileType = null;

window.addEventListener('DOMContentLoaded', setupEvents);

function setupEvents() {
  if (window.File && window.FileList && window.FileReader){
      target1 = document.getElementById('dropSection');
      target1.addEventListener('dragenter', dragEnter);
      target1.addEventListener('dragover', dragOver);
      target1.addEventListener('dragleave', dragLeave);
      target1.addEventListener('drop', dropFile);
      target2 = document.getElementById('fileDisplaySection');
  }
}

function dragEnter(evt) {
  target1.style.backgroundColor = 'lime';
}

function dragLeave(evt) {
  target1.style.backgroundColor = 'grey';
  document.getElementById("dropSection").innerHTML = "Drag and Drop File";
}

function dragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  document.getElementById("dropSection").innerHTML = "Drop File Here";
}

function dropFile(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  let file = evt.dataTransfer.files[0];
  fileName = file.name;
  fileType = file.type;
  target1.style.backgroundColor = 'grey';
  target1.style.opacity = "1";
  document.getElementById('fileDisplaySection').value = "Filename:\n" + fileName + " \nFile Size:\n" + file.size + " bytes";
  document.getElementById("dropSection").innerHTML = "Select Conversion Type";
  if (popupMenu == null){
    let menuDiv = document.createElement('div');
    menuDiv.style.position = 'absolute';
    menuDiv.style.width = '34vw';
    menuDiv.style.height = '34vw';
    menuDiv.style.panning = '20px';
    menuDiv.style.left = '30vw';
    menuDiv.style.top = '6vw';
    menuDiv.style.borderRadius = '125px';
    popupMenu = document.documentElement.appendChild(menuDiv);
    document.addEventListener('click', closeMenu);
    addIcon('PDF', '50%', '0%', '#f56042');
    addIcon('CSV', '85%', '15%', '#f5e342');
    addIcon('DOC', '100%', '50%', '#42b3f5');
    addIcon('XML', '85%', '85%', '#1c7532');
    addIcon('TXT', '50%', '100%', '#9433de');
    addIcon('HTML', '15%', '85%', '#d92b85');
    addIcon('PPT', '0%', '50%', '#d97c2b');
    addIcon('XLS', '15%', '15%', '#abd92b');
  }
}

function closeMenu(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  document.documentElement.removeChild(popupMenu);
  document.removeEventListener('click', closeMenu);
  popupMenu = null;
  alert('\n\n' + fileName + ' will be convert to ' + selectedIcon + '\n\n\nProceed with conversion?');
  target1.style.opacity = "0.75";
  target1.style.backgroundColor = 'grey';
  document.getElementById("dropSection").innerHTML = "Drag and Drop File";
  document.getElementById("fileDisplaySection").value = "File Successfully Converted\n\n" + fileType + " --> " + selectedIcon;
  selectedIcon = null;
  fileName = null;
}

function addIcon(id, x, y, colour){
  let iconDiv = document.createElement('div');
  iconDiv.id = id;
  iconDiv.style.position = 'absolute';
  iconDiv.style.width = '20%';
  iconDiv.style.height = '20%';
  iconDiv.style.backgroundColor = '#8FB544';
  iconDiv.style.border = "solid black";
  iconDiv.style.borderRadius = '10px';
  iconDiv.style.left = x;
  iconDiv.style.top = y;
  iconDiv.style.textAlign = 'center';
  iconDiv.style.fontSize = '2.2vw';
  iconDiv.style.backgroundColor = colour;
  iconDiv.style.borderTopRightRadius = '50%';
  iconDiv.style.borderTopLeftRadius = '50%';
  iconDiv.style.borderBottomRightRadius = '50%';
  iconDiv.style.borderBottomLeftRadius = '50%';
  iconDiv.innerHTML = "<strong>" + iconDiv.id + "</strong>";
  let newIcon = popupMenu.appendChild(iconDiv);
  newIcon.addEventListener('mouseover', selectIcon);
}

function selectIcon(evt){
  selectedIcon = evt.target.id;
}
