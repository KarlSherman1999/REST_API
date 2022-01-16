export const Login = ({setter,handler}) => {
    return(
        <form onSubmit={handler}>
        <input placeholder="username" onChange={ (e)=> setter(e.target.value)}/>
    </form>
    )
}