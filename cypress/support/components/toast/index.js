
import {el} from './elements'


class Toast {

    shouldHaveText(expectText){
        cy.wait(2000)
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }

}

export default new Toast()