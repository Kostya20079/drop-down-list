class CustomSelect {
#id
#options
#selectButton
#select
#selectUl
#currentSelectedItem

    static #defoultText = { // текст для кнопки
        buttonText: 'Виберіть елемент',
    }

    constructor(id, options = []) {
        this.#selectButton = document.createElement('button')
        this.#select = document.createElement('select')
        this.#selectUl = document.createElement('ul')
        this.#select.id = this.#id
        this.#select.style.display = 'none'

        this.#id = id
        this.#options = options
        this.#currentSelectedItem = null
    }

    get selectedValue() {
        return this.#currentSelectedItem
    }


    //! list
    #renderSelect(container) {
        const classListId = `select-dropdown__list--${this.#id}`
        this.#selectUl.className = `select-dropdown__list ${classListId}` // додаю класи для ul елементу

        // створую список
        this.#options.forEach((option) => {
            const liItem = document.createElement('li')
            liItem.className = 'select-dropdown__list-item'
            liItem.dataset.value = option.value
            liItem.textContent = option.text

            liItem.addEventListener('click', this.#dropDownItemSelect.bind(this))

            this.#selectUl.append(liItem)
        })

        if(container) {
            container.append(this.#selectUl)
        }
    }


    //! select Button
    #renderSelectButton(container) {
        this.#selectButton.className = `select-dropdown__button select-dropdown__button--${this.#id}` // додаю клас 
        
        const selectButtonText = document.createElement('span') // створую внутрішню оболонку для тексту
        selectButtonText.className = `select-dropdown__text select-dropdown__text--${this.#id}`
        selectButtonText.textContent = CustomSelect.#defoultText.buttonText

        this.#selectButton.append(selectButtonText)
        container.append(this.#selectButton)

        this.#selectButton.addEventListener('click', this.#toShowdropDownToggle.bind(this))
    }

    #toShowdropDownToggle() {
        this.#selectUl.classList.toggle('active')
    }


    //! додаю вибраний елемент
    #dropDownItemSelect(event) {
        const { target } = event
        const getDataValue = target.getAttribute('data-value')
        const targetOption = this.#options.find((option) => option.value === Number(getDataValue))
        const selectButtonText = this.#selectButton.querySelector('.select-dropdown__text')

        if(selectButtonText && targetOption && getDataValue) {
            this.#currentSelectedItem = targetOption

            const alLiItems = document.querySelectorAll('.select-dropdown__list-item')

            alLiItems.forEach((itemOption) => itemOption.classList.remove('selected'))
            target.classList.add('selected')

            selectButtonText.textContent = targetOption.text
            this.#selectUl.classList.remove('active')
        }
    }
        


    //! render
    // додаю елементи в загальний контейнер
    render(container) {
        const selectDropDownContainer = document.createElement('div')
        selectDropDownContainer.className =`select-dropdown select-dropdown--${this.#id}`

        if(container) {
            this.#renderSelectButton(selectDropDownContainer)
            this.#renderSelect(selectDropDownContainer)
            container.append(selectDropDownContainer)
        }
    }
}

//! опції для вибору
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