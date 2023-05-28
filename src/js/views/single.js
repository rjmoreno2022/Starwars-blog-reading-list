import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
	let [itemDesc, setItemDesc] = useState([]);
	const [isValidImage, setIsValidImage] = useState(true);
	const [cardType, setcardType] = useState();
	const propNamesC = {
		"Name": "name",
		"Birth Year": "birth_year"
		, "Gender": "gender"
		, "Height": "height"
		, "Skin Color": "skin_color"
		, "Eye Color": "eye_color"
	};
	const propNamesP = {
		"Name": "name",
		"Climate": "climate",
		"Population": "population",
		"Orbital Period": "orbital_period",
		"Rotation Period": "rotation_period",
		"Diameter": "diameter"
	};
	const propNamesV = {
		"Name": "name",
		"Model": "model",
		"Vehicle Class": "vehicle_class",
		"Manufacturer": "manufacturer",
		"Lenght": "length",
		"Passengers": "passengers"
	};

	useEffect(() => {
		let auxcardType = Array.from(params.theid)[0];
		setcardType(auxcardType);
		let id = params.theid.slice(1);
		getItemDescription(id, auxcardType);
		checkImageValidity(imageToShow(auxcardType));
	}, [params]);

	const checkImageValidity = async (image) => {
		try {
			const response = await fetch(image);
			setIsValidImage(response.status === 200);
		} catch (error) {
			setIsValidImage(false);

		}
	};

	const imageToShow = (pCardType) => {
		// let cardType = Array.from(params.theid)[0];
		let id = params.theid.slice(1);
		let vLinkImg;
		switch (pCardType) {
			case 'c':
				vLinkImg = "https://starwars-visualguide.com/assets/img/characters/" + id + ".jpg";
				break;
			case 'p':
				vLinkImg = "https://starwars-visualguide.com/assets/img/planets/" + id + ".jpg";
				break;
			case 'v':
				vLinkImg = "https://starwars-visualguide.com/assets/img/vehicles/" + id + ".jpg";
				break;
			default:
				vLinkImg = "data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";
				console.log(vLinkImg);
				break;
		}
		//checkImageValidity(vLinkImg);
		return (vLinkImg);
	};

	const getItemDescription = async (id, type) => {
		try {
			let resp;
			switch (type) {
				case 'c':
					resp = await fetch("https://www.swapi.tech/api/people/" + id)
						.then(res => res.json())
						.then(data => {
							setItemDesc(data.result.properties);
							console.log(data.result.properties);
						})
						.catch(err => console.error(err))
					break;
				case 'p':
					resp = await fetch("https://www.swapi.tech/api/planets/" + id)
						.then(res => res.json())
						.then(data => {
							setItemDesc(data.result.properties);
						})
						.catch(err => console.error(err))
					break;
				case 'v':
					resp = await fetch("https://www.swapi.tech/api/vehicles/" + id)
						.then(res => res.json())
						.then(data => {
							setItemDesc(data.result.properties);
						})
						.catch(err => console.error(err))
					break;
				default:
					break;
			}


		} catch (err) {
			console.log(err);
		}
	}

	const propertieToShow = (numberProp) => {
		// let cardType = Array.from(params.theid)[0];
		let id = params.theid.slice(1);
		let vPropertieName;
		switch (cardType) {
			case 'c':
				vPropertieName = Object.keys(propNamesC)[numberProp];
				console.log(vPropertieName);
				break;
			case 'p':
				vPropertieName = Object.keys(propNamesP)[numberProp];
				break;
			case 'v':
				vPropertieName = Object.keys(propNamesV)[numberProp];
				break;
			default:
				vPropertieName = "";
				break;
		}
		//checkImageValidity(vLinkImg);
		return (vPropertieName);
	};

	const propertieInfoToShow = (propName) => {
		// let cardType = Array.from(params.theid)[0];
		let id = params.theid.slice(1);
		let vPropertieInfo;
		switch (cardType) {
			case 'c':
				vPropertieInfo = propNamesC[propName];
				console.log(vPropertieInfo);
				break;
			case 'p':
				vPropertieInfo = propNamesP[propName];
				break;
			case 'v':
				vPropertieInfo = propNamesV[propName];
				break;
			default:
				vPropertieInfo = "";
				break;
		}
		//checkImageValidity(vLinkImg);
		return (vPropertieInfo);
	};

	return (
		<div className="jumbotron py-4">
			<div className="container">
				<div className="d-flex align-items-center">
					<div className="jumbo-img me-3">
						{
							isValidImage ?
								(
									<img className="img-jumbo" src={imageToShow(cardType)} alt="Card image cap"></img>
								) :
								(
									<img className="img-jumbo" src={imageToShow('x')} alt="Card image cap"></img>
								)
						}
					</div>
					<div className="jumbo-desc text-center">
						<h2 className="">{itemDesc.name}</h2>
						<p>{description}</p>
					</div>
				</div>
				<hr className="my-4" />
				<div className="jumbotron-footer d-flex justify-content-between">
					{/* {Object.keys(itemDesc).map((key) => (
						<div key={key}>
							<h5>{key}</h5>
							<span className="">{itemDesc[key]}</span>
						</div>
					))} */}


					<div>
						<h5>{propertieToShow(0)}</h5>
						<span className="">{itemDesc[propertieInfoToShow(propertieToShow(0))]}</span>
					</div>
					<div>
						<h5>{propertieToShow(1)}</h5>
						<span className="">{itemDesc[propertieInfoToShow(propertieToShow(1))]}</span>
					</div>
					<div>
						<h5>{propertieToShow(2)}</h5>
						<span className="">{itemDesc[propertieInfoToShow(propertieToShow(2))]}</span>
					</div>
					<div>
						<h5>{propertieToShow(3)}</h5>
						<span className="">{itemDesc[propertieInfoToShow(propertieToShow(3))]}</span>
					</div>
					<div>
						<h5>{propertieToShow(4)}</h5>
						<span className="">{itemDesc[propertieInfoToShow(propertieToShow(4))]}</span>
					</div>
					<div>
						<h5>{propertieToShow(5)}</h5>
						<span className="">{itemDesc[propertieInfoToShow(propertieToShow(5))]}</span>
					</div>

				</div>
			</div>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
