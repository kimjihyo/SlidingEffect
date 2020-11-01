export class ActionBar {
  constructor() {
    this.element = document.createElement('div');
    this.buttonContainer = document.createElement('div');
    this.title = document.createElement('h2');
    this.title.innerHTML = 'Sliding Effect';

    this.addDialogButton = document.createElement('button');
    this.addDialogButton.innerHTML = 'ADD DIALOG';

    this.removeDialogButton = document.createElement('button');
    this.removeDialogButton.innerHTML = 'REMOVE DIALOG';

    this.element.appendChild(this.title);
    this.element.appendChild(this.buttonContainer);
    this.buttonContainer.appendChild(this.addDialogButton);
    this.buttonContainer.appendChild(this.removeDialogButton);

    this.initStyle();
  }

  initStyle() {
    this.element.style.height = '80px';
    this.element.style.widows = '100%';
    this.element.style.backgroundColor = 'white';
    this.element.style.display = 'flex';
    this.element.style.alignItems = 'center';
    this.element.style.paddingLeft = '30px';

    this.buttonContainer.style.display = 'flex';
    this.buttonContainer.style.alignItems = 'center';
    this.buttonContainer.style.flex = '1';
    this.buttonContainer.style.height = '100%';
    this.buttonContainer.style.marginLeft = '10px';
    this.buttonContainer.style.justifyContent = 'flex-end';

    this.styleButton(this.addDialogButton);
    this.styleButton(this.removeDialogButton);
  }

  styleButton(btn) {
    btn.style.backgroundColor = '#e0e0e0';
    btn.style.border = 'none';
    btn.style.padding = '10px 20px';
    btn.style.fontWeight = 'bold';
    btn.style.marginRight = '10px';
  }

  getElement() {
    return this.element;
  }
}