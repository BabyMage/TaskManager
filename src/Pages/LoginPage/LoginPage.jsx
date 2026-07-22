function LoginPage ()
{
    return(
        <div id="login">
            <p>Email</p>
            <input type="email" name="email" placeholder="email"/>
            <p>senha</p>
            <input type="text" name="senha" placeholder="senha"/>
            <button>Login</button>
            <button>Criar conta</button>
        </div>
    )
}

export default LoginPage;