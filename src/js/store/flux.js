const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      characters: [],
      planets: [],
      vehicles: [],
      countFav: 0,
      itemsFav: {
        c: [],
        p: [],
        v: []
      }
    },
    actions: {
      loadCharacters: async () => {
        try {
          let resp = await fetch("https://www.swapi.tech/api/people")
            .then(res => res.json())
            .then(data => {
              setStore({ characters: data.results });
            })
            .catch(err => console.error(err))
        } catch (err) {
          console.log(err);
        }
      },
      loadPlanets: async () => {
        try {
          let resp = await fetch("https://www.swapi.tech/api/planets/");
          let data = await resp.json();
          setStore({ planets: data.results });
        } catch (err) {
          console.log(err);
        }
      },
      loadVehicles: async () => {
        try {
          let resp = await fetch("https://www.swapi.tech/api/vehicles");
          let data = await resp.json();
          setStore({ vehicles: data.results });
        } catch (err) {
          console.log(err);
        }
      },
      setFav: (isChecked, idItem) => {
        const auxStore = getStore();
        let auxCount = auxStore.countFav;
        let auxcardType = Array.from(idItem)[0];
        let id = idItem.slice(1);
        let item;
        let auxItemsFavC = [...auxStore.itemsFav.c];
        let auxItemsFavP = [...auxStore.itemsFav.p];
        let auxItemsFavV = [...auxStore.itemsFav.v];
        let newAux = [];

        if (isChecked === true) {
          auxCount++;
          switch (auxcardType) {
            case 'c':
              item = auxStore.characters.find(({ uid }) => uid === id);
              auxItemsFavC = [...auxStore.itemsFav.c, item];
              break;
            case 'p':
              item = auxStore.planets.find(({ uid }) => uid === id);
              auxItemsFavP = [...auxStore.itemsFav.p, item];
              break;
            case 'v':
              item = auxStore.vehicles.find(({ uid }) => uid === id);
              auxItemsFavV = [...auxStore.itemsFav.v, item];
              break;
            default:
              break;
          }
        } else {
          auxCount--;
          switch (auxcardType) {
            case 'c':
              auxItemsFavC = auxItemsFavC.filter(({ uid }) => uid !== id);
              break;
            case 'p':
              auxItemsFavP = auxItemsFavP.filter(({ uid }) => uid !== id);
              break;
            case 'v':
              auxItemsFavV = auxItemsFavV.filter(({ uid }) => uid !== id);
              break;
            default:
              break;
          }
        }
        let auxItemsFav = { c: auxItemsFavC, p: auxItemsFavP, v: auxItemsFavV };
        setStore({ itemsFav: { ...auxItemsFav } })
        setStore({ countFav: auxCount });
      }
    },
  };
};

export default getState;
