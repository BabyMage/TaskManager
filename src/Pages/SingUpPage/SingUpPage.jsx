function SingUpPage ()
{
    return(
        <div id="signup">
            <p>UserName</p>
            <input type="text"name="username" placeholder="nome de usuario"/>
            <p>Email</p>
            <input type="email" name="email" placeholder="senha"/>
            <p>senha</p>
            <input type="text" name="senha" placeholder="email"/>
            <button>Criar Conta</button>
        </div>
    )
}

export default SignUpPage;