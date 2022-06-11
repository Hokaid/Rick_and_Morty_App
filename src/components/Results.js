function Results(props) {
    const compareEpisodes = (result1, result2) => {
        let counter = 0;
        for (let res1 in result1.episode) {
            for (let res2 in result2.episode) {
                if (res1 == res2) {
                    counter = counter + 1;
                }
            }
        }
        return counter;
    }
    return ( 
        <div>
        {props.results.type == "1" && props.results.results.map((result) =>
            <div className="card mb-3">
                <img src={result.image} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">Nombre: {result.name}</h5>
                    <h5 className="card-title">Género: {result.gender}</h5>
                    <h5 className="card-title">Ubicación: {result.location.name}</h5>
                    <h5 className="card-title">ID del episodio: {result.episode[Math.floor(Math.random() * result.episode.length)].replace('https://rickandmortyapi.com/api/episode/','')}</h5>
                </div>
            </div>
        )}
        {props.results.type == "2" && props.results.results.map((result) =>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Nombre: {result.name}</h5>
                    <h5 className="card-title">Tipo: {result.type}</h5>
                    <h5 className="card-title">Dimensión: {result.dimension}</h5>
                    <h5 className="card-title">Cantidad de residentes: {result.residents.length}</h5>
                    <h5 className="card-title">Fecha de creación: {result.created}</h5>
                </div>
            </div>
        )}
        {props.results.type == "3" && props.results.results.map((result, index) =>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Nombre: {result.name}</h5>
                    <h5 className="card-title">Fecha de emisión: {result.air_date}</h5>
                    <h5 className="card-title">Código de episodio: {result.episode}</h5>
                    <button onClick={() => {props.activateInfo(index)}} className="btn btn-primary">+ info</button>
                    {props.results.episodeDetail[index].info && <div>
                    <h5 className="card-title mt-3">Enlace: {result.url}</h5>
                    <h5 className="card-title">Fecha de creación: {result.created}</h5>
                    <h5 className="card-title">Personajes que aparecieron:</h5>
                    {props.results.episodeDetail[index].characters_info.map((character) => 
                        <div className="card mt-3">
                            <img src={character.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-text">{character.name}</p>
                            </div>
                        </div>
                    )}</div>}
                </div>
            </div>
        )}
        {props.results.type == "4" && 
            <table className="table">
              <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Género</th>
                    <th scope="col">Ubicación</th>
                    <th scope="col">Especie</th>
                    <th scope="col">Estado</th>
                    {props.results.results.map((result) =>
                        <th scope="col">Cantidad de episodios con {result.name}</th>
                    )}
                </tr>
              </thead>
              <tbody>
                {props.results.results.map((result) =>
                <tr>
                    <td>{result.name}</td>
                    <td>{result.gender}</td>
                    <td>{result.location.name}</td>
                    <td>{result.species}</td>
                    <td>{result.status}</td>
                    {props.results.results.map((data) => 
                        <td>{compareEpisodes(result, data)}</td>
                    )}
                </tr>)}
              </tbody>
            </table>
        }
        </div>
    );
}

export default Results;