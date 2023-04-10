
import signupPage from '../support/pages/signup'


describe('cadastro', function () {

    context('quando o usuario é novato', function () {
        const user = {
            name: 'Fernando Papito',
            email: 'papito@samuraibs.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })
        it('deve cadastrar com sucesso', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('quando o email ja existe', function () {
        const user = {
            name: 'Leonardo Melo',
            email: 'leo@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })
        it('nao deve cadastrar o usuario', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveTest('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHeveText('Informe um email válido')
        })
    })

    context('quando a senha tem um caractere', function () {

        const passwords = ['1', '12', '123', '1234', '12345']


        beforeEach(function () {
            signupPage.go()

        })

        passwords.forEach(function (p) {
            it('não deve cadastar com a senha: ' + p, function () {

                const user = { name: 'Jason Friday', email: 'jason@gmail.com', password: p }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alertHeveText('Pelo menos 6 caracteres')
        })


    })

    context('quando nao preencho nenhum dos campos', function(){

        const alertMesseges = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMesseges.forEach(function(alert){

            it('deve exibir ' + alert.toLowerCase(), function(){
                signupPage.alertHeveText(alert)
            })
        })
    })
})


