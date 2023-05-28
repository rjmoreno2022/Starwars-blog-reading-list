import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types"
import propTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../store/appContext.js";
import { Link, useParams } from "react-router-dom";

export const Card = props => {
    const { store, actions } = useContext(Context);
    const [imageType, setimageType] = useState();
    const [isValidImage, setIsValidImage] = useState(true);

    useEffect(() => {
        checkImageValidity(imageToShow(props.cardType));
        checkItemFav();
    }, []);

    const checkItemFav = () => {
        let isFav;
        switch (props.cardType) {
            case 1:
                isFav = store.itemsFav.c.find(({ uid }) => uid === props.cardItem.uid);
                break;
            case 2:
                isFav = store.itemsFav.p.find(({ uid }) => uid === props.cardItem.uid);
                break;
            case 3:
                isFav = store.itemsFav.v.find(({ uid }) => uid === props.cardItem.uid);
                break;
            default:
                vLinkImg = "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";
                break;
        }
        if (isFav == null) {
            setIsChecked(false);
        } else {
            setIsChecked(true);
        }
    };

    const checkImageValidity = async (image) => {
        try {
            const response = await fetch(image);
            //console.log(response)
            setIsValidImage(response.status === 200);
        } catch (error) {
            setIsValidImage(false);
        }
    };

    const imageToShow = (cardType) => {
        let vLinkImg;
        switch (cardType) {
            case 1:
                vLinkImg = "https://starwars-visualguide.com/assets/img/characters/" + props.cardItem.uid + ".jpg";
                break;
            case 2:
                vLinkImg = "https://starwars-visualguide.com/assets/img/planets/" + props.cardItem.uid + ".jpg";
                break;
            case 3:
                vLinkImg = "https://starwars-visualguide.com/assets/img/vehicles/" + props.cardItem.uid + ".jpg";
                break;
            default:
                vLinkImg = "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";
                break;
        }
        //checkImageValidity(vLinkImg);
        return (vLinkImg);
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        actions.setFav(!isChecked, props.id);
    };

    return (
        <div className="card">
            {
                isValidImage ?
                    (
                        <img className="card-img-top" src={imageToShow(props.cardType)} alt="Card image cap"></img>
                    ) :
                    (
                        <img className="card-img-top" src={imageToShow(4)} alt="Card image cap"></img>
                    )

            }
            {/* <img class="card-img-top" src={imageToShow(props.cardType)} alt="Card image cap"></img> */}
            <div className="card-body">
                <h5 className="card-title">{props.cardItem.name}</h5>
                <div className='d-flex justify-content-between'>
                    <Link to={"/single/" + props.id} className="linkCard text-light">
                        <button className="btn btn-primary">
                            Learn more!
                        </button>
                    </Link>
                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id={"btncheck" + props.cardType + props.cardItem.uid} autoComplete="off" checked={isChecked} onChange={handleCheckboxChange} />
                        <label className="btn btn-outline-warning" htmlFor={"btncheck" + props.cardType + props.cardItem.uid}><FontAwesomeIcon icon={faHeart} /></label>
                    </div>
                </div>
            </div>
        </div >
    );
};

Card.prototype = {
    id: propTypes.string,
    cardType: propTypes.number,
    cardItem: propTypes.object
    // name: PropTypes.string,
    // url: PropTypes.string,
    // isFav: PropTypes.bool
}