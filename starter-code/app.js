const getData = () => {
  const url = "https://cors-anywhere.herokuapp.com/https://randomuser.me/api/?results=10";
  axios.get(url).then((res) => {
    const response = res.data.results;
    // console.log(response);
    const peopleDiv = document.querySelector('.people');
    response.forEach((person) => {
      console.log(person.name.first);
      const personDiv = document.createElement('div');
      peopleDiv.append(personDiv);
      const firstName = person.name.first;
    });
  }).catch((error) => {
    console.log(`Error: ${error}`);
  });
}

getData();