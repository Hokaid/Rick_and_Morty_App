import React, { useState } from 'react';

function SearchBar(props) {
    const [textInput, setTextInput] = useState("")
    const [searchType, setSearchType] = useState("1") 
    const search = () => {
        if (textInput != "") { props.makeSearch(textInput, searchType); } 
        else { alert("Indique que desea buscar"); }
    }
    const compare = () => {
        if (textInput != "") { props.makeSearch(textInput, "4"); } 
        else { alert("Indique que personaje desea comparar"); }
    }
    return (
        <div>
            <div className="mt-5">
                <label className="form-label">Seleccione como desea buscar:</label>
                <select className="form-select" value={searchType} onChange={(e)=>setSearchType(e.target.value)}>
                    <option value="1">Por Personaje</option>
                    <option value="2">Por Ubicación</option>
                    <option value="3">Por Episodios</option>
                </select>
            </div>
            <div className="mt-5">
                <label className="form-label">Ingrese el nombre de lo que desea buscar</label>
                <input value={textInput} onChange={(e)=>setTextInput(e.target.value)} type="text" className="form-control" placeholder="Rick"/>
            </div>
            <div className="mt-5">
                <button onClick={search} type="button" className="btn btn-primary">Buscar</button>
            </div>
            {searchType == "1" && <div className="mt-5">
                <button onClick={compare} type="button" className="btn btn-primary">Comparar personaje</button>
            </div>}
        </div>
    );
}

export default SearchBar;