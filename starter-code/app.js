const getData = () => {
  const headers = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  removePerson();
  const url = "https://cors-anywhere.herokuapp.com/https://randomuser.me/api/?results=10";
  axios.get(url, headers).then((res) => {
    const response = res.data.results;
    // console.log(response);
    const peopleDiv = document.querySelector('.people');
    response.forEach((person) => {
      // console.log(person.picture.large);
      const personDiv = document.createElement('div');
      personDiv.classList = 'person-div';
      peopleDiv.append(personDiv);
      const name = document.createElement('p');
      const firstName = person.name.first;
      const lastName = person.name.last;
      name.textContent = `${firstName} ${lastName}`;
      personDiv.append(name);
      const img = document.createElement('img');
      img.src = person.picture.large;
      personDiv.append(img);
    });
  }).catch((error) => {
    console.log(`Error: ${error}`);
  }).finally(() => {
    console.log('Look at the beautiful people.');
  });
}

const button = document.querySelector('button');
button.addEventListener('click', getData);

function removePerson() {
  const removeDiv = document.querySelector('.people');
  while (removeDiv.lastChild) {
    removeDiv.removeChild(removeDiv.lastChild);
  }
}