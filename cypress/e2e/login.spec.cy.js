
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'
import login from '../support/pages/login'

describe('login', function () {

    context('quando o usuario é muito bom', function () {

        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('quando o usuario é bom mas a senha esta incorreta', function () {

        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function(){
                user.password = 'abc123'
            })
        })

        it('deve notificar erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldHaveText(message)
            
        })
    })

    context('quando o formato do email é invalido', function(){

        const emails = [
            'papito.com.br',
            'yahoo.com',
            '@gmaol.com',
            '@',
            'papitp@',
            '3333',
            '!@#$$%'
        ]

        beforeEach(function(){
            loginPage.go()
        })

        emails.forEach(function(email){
            it('não deve logar com o email: ' +email, function(){
                const user = {email: email, password: 'pwd123'}

                
                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })
    })

    context('quando nao preencho nenhum dos campos', function(){

        const alertMesseges = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function(){
            loginPage.go()
            loginPage.submit()
        })

        alertMesseges.forEach(function(alert){

            it('deve exibir ' + alert.toLowerCase(), function(){
                loginPage.alert.haveText(alert)
            })
        })
    })
})