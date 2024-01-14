class CustomSelect {
#id
#options
#selectButton
#selectUl
#select

    static #defoultText = { // текст для кнопки
        buttonText: 'Виберіть елемент'
    }

    constructor(id, options = []) {
        this.#selectButton = document.createElement('button')
        this.#selectUl = document.createElement('ul')
        this.#select = document.createElement('select')

        this.#id = id
        this.#options = options
    }


    //! select Button
    #renderSelectButton(container) {
        this.#selectButton.className = `select-dropdown__button select-dropdown__button--${this.#id}` // додаю клас 
        
        const selectButtonText = document.createElement('span') // створую внутрішню оболонку для тексту
        selectButtonText.className = `select-dropdown select-dropdown--${this.#id}`
        selectButtonText.textContent = CustomSelect.#defoultText.buttonText

        this.#selectButton.append(selectButtonText)
        container.append(this.#selectButton)
    }

    

    //! render
    // тут додаю елементи в загальний контейнер
    render(container) {
        const selectDropDownContainer = document.createElement('div')
        selectDropDownContainer.className =`select-dropdown select-dropdown--${this.#id}`

        if(container) {
            this.#renderSelectButton(selectDropDownContainer)
            container.append(selectDropDownContainer)
        }
    }
}





const options = [
    { value: 1, text: 'JavaScript' },
    { value: 2, text: 'NodeJS' },
    { value: 3, text: 'ReactJS' },
    { value: 4, text: 'HTML' },
    { value: 5, text: 'CSS' }
];


const customSelect = new CustomSelect('123', options);
const mainContainer = document.querySelector('#container');
customSelect.render(mainContainer);