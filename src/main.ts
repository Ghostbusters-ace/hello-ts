import { HTMLTable } from './html-elements/html-table'
import { ListHTML } from './html-elements/list-html'
import { HttpClient } from './http-client/http-client';

import './scss/main.scss';

/**
 * main.ts
 * @author Aélion <jean-luc.aubert@aelion.fr>
 * @version 1.0.0
 * 
 * Entry point of our frontend application
 */
class Main {
    constructor() {
        let myName: string
        myName = 'Jean-Luc'

        /**
        * Récupère dans le DOM (Document Object Model) le premier Objet (élément HTML)
        * qui dispose d'un attribut "app"
        */
        const app: Element = document.querySelector('[app]')
        app.innerHTML = myName

        // New instance of ListHTML
        const listHTML = new ListHTML()
        listHTML.build()

        //Instance of HTMLTable

        this.studentList().then(
            (datas: any) => {
                const names: Array<string> = datas
                    .map((data: any) => data.lastName)
                    

                const tableEl: HTMLTable = new HTMLTable()
                tableEl.setTableContent(datas)
                app.appendChild(tableEl.build())
            })
    }

    private studentList(): Promise<any> {

        const endPoint: string = 'http://127.0.0.1:5000/api/v1/students'
        return fetch(
            endPoint
        ).then((response: Response) => {
            return response.json()
        })
    }
}

/**
 * Launch app
 */
const main = new Main();

/**
 * Event handling with JS
 */

const formFields: Map<string, any> = new Map<string, any>([
    ['lastName', {}],
    ['email', {}],
    ['login', {}],
    ['password', {}]
]);

(window as any).keyupHandler = (el: any) => {
    // Assume form is valid
    let formIsValid: boolean = true

    formFields.forEach((value: any, key: string) => {
        const field: HTMLInputElement = document.querySelector('input[name="' + key + '"]')
        if (field.value.trim().length === 0) {
            formIsValid = false
            return
        }
    })

    // Now change the disabled
    if (formIsValid) {
        document.querySelector('#student-form button').removeAttribute('disabled')
    } else {
        document.querySelector('#student-form button').setAttribute('disabled', 'disabled')
    }
}

(window as any).onSubmit = async (event: any) => {
    event.preventDefault()

    let form: any = {}
    formFields.forEach((value: string, key: string) => {
        const field: HTMLInputElement = document.querySelector('input[name="' + key + '"]')
        form[key] = field.value
    })
    const firstNameField: HTMLInputElement = document.querySelector('input[name="firstName"]')
    const phoneNumberField: HTMLInputElement = document.querySelector('input[name="phoneNumber"]')
    
    form.firstName = firstNameField.value
    form.phoneNumber = phoneNumberField.value

    console.log(`Form was : ${JSON.stringify(form)}`)

    const httpClient: HttpClient = new HttpClient()

    const student: any = await httpClient.post(
        'http://127.0.0.1:5000/api/v1/students',
        form
    )

    console.log(`Receive : ${JSON.stringify(student)}`)
}