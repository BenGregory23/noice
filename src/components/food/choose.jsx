import { useEffect } from "react"
import CardStack from "../tinder/CardStack"

const Choose = () => {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/places")
            .then((response) => response.json())
            .then((data) => setPlaces(data))
    }, [])

    return (
        <div>
            <CardStack cards={places} />
        </div>
    )
}

export default Choose