export default function Welcome(props){
    console.log(props);
    const {message} = props;

    return (
    <div>
        <h1>Hola, deja de procastinar</h1>
        <p>{message}</p>
    </div>    
    );
}