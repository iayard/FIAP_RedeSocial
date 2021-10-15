import { CardComent, CardPost } from "./styles";
import imgProfile from "../../assets/profile.png"
import { useState } from "react";
import { getUser } from "../../services/security";
import { format } from "date-fns";

function Post({ data }) {

    let signedUser = getUser();

    console.log(data)

    const [showComents, setShowComents] = useState(false);

    const [comentSet, setNewComent] = useState({
        coment: ""
    });

    const handleInput = (e) => {
        setNewComent({ ...comentSet, [e.target.id]: e.target.value });
    }

    const toggleComents = () => setShowComents(!showComents);

    //função tentativa de envio
    const comentSubmit = async (e) => {
        console.log(comentSet.coment);
        e.preventDefault();
    }

    return (
        <CardPost>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por {signedUser.studentId === data.Student.id ? "você" : data.Student.name}</p>
                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                {data.image && <img src={data.image} alt="imagem do post" />}
                <footer>
                    {data.Categories.map(c => <p>{c.description}</p>)}
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComents}>
                    {
                        data.Answers.length === 0 ?
                            "Seja o primeiro a comentar" :
                            `${data.Answers.length} Comentário${data.Answers.length > 1 && "s"}`
                    }
                </h3>
                {showComents && (
                    <>
                        {data.Answers.map(coment => <Coment coment={coment} />)}
                    </>
                )}
                <div>
                    <input
                        placeholder="Comente este post"
                        onChange={handleInput}
                        type="text"                        
                    />
                    {/* Linha abaixo alterada */}
                    <button onClick={() => comentSubmit()}>Enviar</button>
                
                </div>
            </footer>
        </CardPost>
    );
}

function Coment({coment}) {

    return (
        <CardComent>
            <header>
                <img src={coment.Student.image} />
                <div>
                    <p>por {coment.Student.name}</p>
                    <span>em {coment.created_at}</span>
                </div>
            </header>
            <p>{coment.description}</p>
        </CardComent>
    );
}

export default Post;