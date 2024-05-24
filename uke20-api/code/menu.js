
// const mybtn = document.getElementById('myList');
// const tre = document.getElementById('btn');
// tre.addEventListener("click", openmenu );
// function openmenu() {
//     if(mybtn.style.display != 'block') {
//         mybtn.style.display = 'block';
//     } else {
//         mybtn.style.display = 'none';
//     }
//     console.log('clicked');
// }

// map settings
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//sett latitude og longitude på map til 0 slik at det viser midten av mappen og gir view 1
let map = L.map('map1').setView([0,0], 1);
    const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles =L.tileLayer(tileURL,{attribution})
    tiles.addTo(map)

    //lager costume icon
    const myIcon = L.icon({
        //henter url til coptright icon
        iconUrl:'https://www.iconpacks.net/icons/2/free-beer-icon-1858-thumb.png',
        //bestemmer størrelse på icon
        iconSize: [38,38],
    });

 //hoved funksjon

    //definerer en asyncfunksjon
 async function show_me(){

    //lager varaiabel place og gir den verdien av elementet med id searchbar og henter verdien til den også. NB: verdi er string.
    let place = document.getElementById("searchbar").value;
    //consol logger place variabelen slik at jeg kan se det i consolen på nettsiden
    console.log(place);

    // lager en nytt variabel med navnet api_url som er lik api til brygeriene + place(søket til brukeren)
    const api_url = 'https://api.openbrewerydb.org/v1/breweries/search?query=' + place; 
    
    //lager varaibel som heter response og bruker await for å vente å kjøre neste del av kode held til den har returnet en løfte. NB:bruker fetch for å hente data.
    let response = await fetch(api_url);

    //lager variabel som heter data og gir den verdien await response.json(), for å konvertere data den henter fra api til json format (tekstrenger)
    let data = await response.json();
    console.log(data)
    
    //oppretter forEach loop som itererer (går gjennom) alle elementene i array den fetch fra api.
    data.forEach(element => {

        //oppretter variabel som heter lat og har verdien av latitude til elementene i array
        let lat = element.latitude
        //oppretter variabel som heter long og har verdien av longitude til elementene i array
        let long = element.longitude
        //bruker if statement for å skjekke om det er lat og long for å kunne sette marker
        if (lat && long) {
            //legger på marker på lat og long, og legger til cosume icon.
            const marker = L.marker([lat,long],{icon:myIcon}).addTo(map)
            //bruker bindPopup slik at brukeren for informasjon om selve bryggrie, blant annet staten, byen, navnet, osv..
            marker.bindPopup(`<p>Country:${element.country}</p><p>State:${element.state}</p><p>City:${element.city}</p><p>Name:${element.name}</p>
            <p>Adress:${element.adress}<p>Phone:${element.phone}<p>Website:<a href=${element.website_url} target="_blank">${element.website_url}</a>`).openPopup();
        }
    });
}


 //Ekstra funksjon

//definerer en ny asyncfunksjon
async function city_info(){

    //lager varaiabel place og gir den verdien av elementet med id searchbar-andre og henter verdien til den også. NB: verdi er string.
    let place = document.getElementById("searchbar-andre").value;

    //consol logger place variabelen slik at jeg kan se det i consolen på nettsiden
    console.log(place);

    // lager en nytt variabel med navnet city_location som er lik api til brygeriene + place(søket til brukeren)
    const city_location = 'https://api.openbrewerydb.org/v1/breweries/search?query=' + place; 

    //lager varaibel som heter response og bruker await for å vente å kjøre neste del av kode hel til den har returnet en løfte. NB:bruker fetch for å hente data.
    let response = await fetch(city_location);

    //lager variabel som heter data og gir den verdien await response.json(), for å konvertere data den henter fra api til json format (tekstrenger)
    let data = await response.json();
    console.log(data)
 
    //oppretter forEach loop som itererer (går gjennom) alle elementene i array den fetch fra api.
    data.forEach(element =>{

      //oppretter variabel med navnet Name og gir den verdien element.name, som tilsvarer navnet til bryggeriet.
      let Name = element.name;

      //oppretter variabel med navnet Adress og gir den verdien element.adress, som tilsvarer adressen til bryggeriet.
      let Adress = element.adress;

      //oppretter variabel med navnet Phone og gir den verdien element.phone, som tilsvarer navnet til bryggeriet på grunn av forEach(element).
      let Phone = element.phone;
      
      //bruker getElementById() metoden for å hente elementet basert på deres id og bruket .textContent for å endre tekstinnholdet til å vise Name variabelen
      document.getElementById('Name').textContent = Name

      //bruker getElementById() metoden for å hente elementet basert på deres id og bruket .textContent for å endre tekstinnholdet til å vise Adress variabelen
      document.getElementById('Adress').textContent = Adress

      //bruker getElementById() metoden for å hente elementet basert på deres id og bruket .textContent for å endre tekstinnholdet til å vise Phone variabelen
      document.getElementById('Phone').textContent = Phone
      
       //bruker getElementById() metoden for å hente elementet basert på deres id og gjør det til en lenke som sender deg til bryggeriet sitt website
      document.getElementById('Website').innerHTML = `<a href=${element.website_url} target="_blank">${element.website_url}</a>`
    })
}


