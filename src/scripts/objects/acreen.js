const screen = { 
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrado 😥'}</p><br>
                                            <p>👥 Followers: ${user.followers}</p>
                                            <p>👤 Following: ${user.following}</p>
                                        </div>
                                      </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}"  target="_blank">${repo.name}
                                                                        <br>
                                                                        <div class="lngs">
                                                                            <p class="info_repo">
                                                                                🍴${repo.forks}
                                                                            </p>
                                                                            <p class="info_repo">
                                                                                ⭐${repo.stargazers_count}
                                                                            </p>
                                                                            <p class="info_repo">
                                                                                👀${repo.watchers}
                                                                            </p>
                                                                            <p class="info_repo">
                                                                                👨🏽‍💻${repo.language}
                                                                            </p>
                                                                        </div>
                                                                    </a></li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                              <h2>Repositórios</h2>
                                              <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsList = user.events.filter(event => event.type === "CreateEvent" || event.type === "PushEvent")

        let lastTenEvents = eventsList.slice(0, 10);
        let displayEvents = '';

        lastTenEvents.forEach(event => {
            let eventName = ''
            let eventMessage = ''
            if(event.type === "PushEvent"){
                eventName = event.repo.name;
                eventMessage = event.payload.commits[0].message
            } else if(event.type === "CreateEvent"){
                eventName = event.repo.name;
                eventMessage = "Sem mensagem de commit"
            } else {
                return
            }

            displayEvents += `<li><a href="https://github.com/${eventName}" target="_blank">${eventName}</a> - ${eventMessage}</li>`
        })
        

        this.userProfile.innerHTML += `<div class="events">
                                         <h2>Eventos</h2>
                                         <ul>${displayEvents}</ul>
                                       </div>`
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }