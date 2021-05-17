const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
		const parsedData=JSON.parse(this.responseText)
		document.getElementById("country").innerHTML=parsedData[0].country;
		document.getElementById("confirmed").innerHTML=parsedData[0].confirmed;
        document.getElementById("critical").innerHTML=parsedData[0].critical + 5;
        document.getElementById("deaths").innerHTML= parsedData[0].deaths;
        document.getElementById("lastUpdate").innerHTML=parsedData[0].lastUpdate;

		
	
	}
});

xhr.open("GET", "https://covid-19-data.p.rapidapi.com/country/code?code=ba");
xhr.setRequestHeader("x-rapidapi-key", "0ecb43a233msh89b3fea68634ab0p1e188bjsn4235c3821566");
xhr.setRequestHeader("x-rapidapi-host", "covid-19-data.p.rapidapi.com");

xhr.send(data);

